import * as line from '@line/bot-sdk';

import { textMessage } from '@/common/createMessage';
import { genNewUserData } from '@/common/generateNewUserData';
import { activationCodeToLevelMap, isPasswordCorrect, levelIdToLevelMap } from '@/common/localGlobalData';
import {
  curatorialStatement,
  curatorialTeam,
  gameNotAvailable,
  richMenuIntro,
  richMenuMap,
  userNotInit,
  welcome
} from '@/common/messages';
import { LevelType } from '@/common/types';

import { createUser, getDbGlobalData, getUserData, updateUserData } from './firebaseAdmin';

const channelAccessToken = process.env.LINE_MESSAGING_API_ACCESS_TOKEN;
const channelSecret = process.env.LINE_MESSAGING_API_CHANNEL_SECRET;

if (!channelAccessToken || !channelSecret) {
  throw new Error('Error: LINE messaging api token environment variable not found');
}

const config = {
  channelAccessToken,
  channelSecret
};

const client = new line.Client(config);

async function createUserInBot(userId: string) {
  const user = await client.getProfile(userId);
  await createUser(userId, genNewUserData(userId, user.displayName));
}

export const middleware = line.middleware(config);

export async function botHandler(event: line.WebhookEvent) {
  console.log(event);

  try {
    if (event.type === 'follow') {
      // 使用者加入官方帳號時
      const userId = event.source.userId;
      console.log(userId, '加入OA');
      if (!userId) throw new Error('UserId not found');

      const [userData, dbGlobalData] = await Promise.all([getUserData(userId), getDbGlobalData()]);

      if (!dbGlobalData) {
        await client.replyMessage(event.replyToken, textMessage('Error: 系統出問題啦，快回報管理員！'));
        return;
      }

      if (!userData) {
        // 如果使用者資料不存在，則初始化使用者資料
        await createUserInBot(userId);
      }

      // 根據活動狀態傳送對應的邀請訊息
      const user = await client.getProfile(userId);
      await client.replyMessage(event.replyToken, welcome(dbGlobalData.welcomeMsgType, user.displayName));
    } else if (event.type === 'message') {
      // 使用者傳送訊息
      if (event.message.type === 'text') {
        // 使用者傳文字訊息
        const userId = event.source.userId;
        const message = event.message.text;
        console.log(userId, message);

        if (message === '策展理念' || message === '幕後團隊') return;

        if (message === '闖關說明') {
          await client.replyMessage(event.replyToken, richMenuIntro);
          return;
        } else if (message === 'MAP') {
          await client.replyMessage(event.replyToken, richMenuMap);
          return;
        }

        if (!userId) throw new Error('UserId not found');

        const [userData, dbGlobalData] = await Promise.all([getUserData(userId), getDbGlobalData()]);

        if (!dbGlobalData) {
          await client.replyMessage(event.replyToken, textMessage('Error: 系統出問題啦，快回報管理員！'));
          return;
        }

        if (!dbGlobalData.isGameAvailable) {
          await client.replyMessage(event.replyToken, gameNotAvailable);
          return;
        } else {
          if (!userData) {
            await createUserInBot(userId);
            return;
          }

          if (!userData.isInit) {
            await client.replyMessage(event.replyToken, userNotInit(userData.userName));
            return;
          }

          const level = activationCodeToLevelMap.get(message);

          console.log('activationCodeToLevelMap', level);

          if (level) {
            if (level.type === LevelType.Normal) {
              await client.replyMessage(event.replyToken, level.content({ monsterName: userData.monsterName }));
            } else if (level.type === LevelType.Random) {
              const key = userData.levels[level.id].randomLevelKey;
              if (key) {
                await client.replyMessage(event.replyToken, level.content[key]);
              } else {
                throw new Error('Random Level, but randomLevelKey not found');
              }
            }

            userData.currentLevel = level.id;
            await updateUserData(userId, userData);
            return;
          }

          console.log('userData.currentLevel', userData.currentLevel);

          if (userData.currentLevel) {
            const currentLevel = levelIdToLevelMap.get(userData.currentLevel);
            if (!currentLevel) {
              await client.replyMessage(event.replyToken, textMessage('Error: 關卡狀態出了點問題'));
              return;
            }

            const isCorrect =
              currentLevel.type === LevelType.Random
                ? isPasswordCorrect(userData.currentLevel, message, userData.levels[currentLevel.id].randomLevelKey)
                : isPasswordCorrect(userData.currentLevel, message);
            console.log('isPasswordCorrect', isCorrect);

            if (isCorrect) {
              userData.currentLevel = null;
              userData.levels[currentLevel.id].isPassed = true;
              await client.replyMessage(
                event.replyToken,
                currentLevel.successMessage({
                  monsterName: userData.monsterName
                })
              );
              await updateUserData(userId, userData);
              return;
            } else {
              await client.replyMessage(event.replyToken, currentLevel.errorMessage);
              return;
            }
          }
        }
      }
    } else if (event.type === 'postback') {
      if (event.postback.data === 'curatorialStatement') {
        await client.replyMessage(event.replyToken, curatorialStatement());
        return;
      } else if (event.postback.data === 'curatorialTeam') {
        await client.replyMessage(event.replyToken, curatorialTeam());
        return;
      }
    }
  } catch (error) {
    if (error instanceof line.HTTPError) {
      console.error(error.statusCode, error.statusMessage, error.message);
      console.error(JSON.stringify(error));
      return;
    }

    if (error instanceof line.SignatureValidationFailed) {
      console.error(error.signature, error.message);
      console.error(JSON.stringify(error));
      return;
    }

    if (error instanceof line.JSONParseError) {
      console.error(error.raw, error.message);
      console.error(JSON.stringify(error));
      return;
    }

    if (error instanceof line.RequestError) {
      console.error(error.code, error.message);
      console.error(JSON.stringify(error));
      return;
    }

    console.error(error);
  }
}

export default client;
