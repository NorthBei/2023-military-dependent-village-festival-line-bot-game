import * as line from '@line/bot-sdk';
import express, { Request, Response } from 'express';
import next from 'next';

import { textMessage } from '../common/createMessage';
import { activationCodeToLevelMap, isPasswordCorrect, levelIdToLevelMap } from '../common/localGlobalData';
import {
  addFriendAfterEventClosed,
  archived10Levels,
  archived25Levels,
  archived35Levels,
  gameNotAvailable,
  userNotInit,
  welcome
} from '../common/messages';
import { LevelType, MonsterStage } from '../common/types';
import { getDbGlobalData, getUserData, initUser, updateUserData } from './firebaseAdmin';
import { genUserInitData } from './record';

const dev = process.env.NODE_ENV !== 'production';
const PORT = 3200;
const app = next({ dev, port: PORT });
const handle = app.getRequestHandler();

// change when prod
// LINE聊天機器人設定
const config = {
  channelAccessToken:
    'yBJLqwOo/x7z+G11TxJr0UpzEodLJ68Kac0HzkNzaE3Gn6TJRpkw6/66+yR5/1YbGrR7F5RZ/Cj1dsc2uRmcLbpReah9h1m0wwcLots9tvAfdji9q+v0cHvLdAgYnIfcQU+XDYZNxgq2g1Vo3sOBtwdB04t89/1O/w1cDnyilFU=',
  channelSecret: '9d64d90ca55993baf609b8aab276fcb0'
};

const client = new line.Client(config);

app.prepare().then(() => {
  const server = express();

  server.post('/bot/webhook', line.middleware(config), async (req: Request, res: Response) => {
    try {
      await Promise.all(req.body.events.map(handleEvent));
      res.status(200).send('OK');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Should put under
  // ref1: https://line.github.io/line-bot-sdk-nodejs/guide/webhook.html#build-a-webhook-server-with-express
  // ref2: https://github.com/line/line-bot-sdk-nodejs/issues/230
  server.use(express.json());

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  const port = process.env.PORT || PORT;

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});

async function handleEvent(event: line.WebhookEvent) {
  console.log(event);

  try {
    if (event.type === 'follow') {
      // 使用者加入官方帳號的好友時的處理邏輯
      const userId = event.source.userId;
      console.log(userId, '加入OA');
      if (!userId) throw new Error('UserId not found');
      const [userData, dbGlobalData] = await Promise.all([getUserData(userId), getDbGlobalData()]);

      const user = await client.getProfile(userId);

      if (!userData) {
        console.log(userId, '初始化');
        // 如果使用者資料不存在，則初始化使用者資料
        await initUser(userId, genUserInitData(userId, user.displayName));
      }

      // 根據活動狀態傳送對應的訊息
      if (dbGlobalData.isEventEnd) {
        client.replyMessage(event.replyToken, addFriendAfterEventClosed);
        return;
      } else {
        client.replyMessage(event.replyToken, welcome(user.displayName));
        return;
      }
    } else if (event.type === 'message') {
      // 文字訊息
      if (event.message.type === 'text') {
        const userId = event.source.userId;
        const message = event.message.text;
        console.log(userId);
        if (!userId) throw new Error('UserId not found');
        console.log(message);
        const [userData, dbGlobalData] = await Promise.all([getUserData(userId), getDbGlobalData()]);

        console.log(userData, dbGlobalData);

        if (!dbGlobalData.isGameAvailable) {
          client.replyMessage(event.replyToken, gameNotAvailable);
          return;
        } else {
          if (!userData) {
            client.replyMessage(event.replyToken, textMessage('Error: 讀取使用者資料出問題'));
            return;
          }

          if (!userData.isInit) {
            client.replyMessage(event.replyToken, userNotInit(userData.userName));
            return;
          }

          const level = activationCodeToLevelMap.get(message);

          if (level) {
            if (level.type === LevelType.Normal) {
              client.replyMessage(event.replyToken, level.content);
            } else if (level.type === LevelType.Random) {
              client.replyMessage(event.replyToken, level.content['A']);
            }
            userData.currentLevel = level.id;
            await updateUserData(userId, userData);
            return;
          }

          if (userData.currentLevel) {
            const currentLevel = levelIdToLevelMap.get(userData.currentLevel);
            if (!currentLevel) {
              client.replyMessage(event.replyToken, textMessage('Error: 關卡狀態出了點問題'));
              return;
            }

            const isCorrect = isPasswordCorrect(userData.currentLevel, message);

            if (isCorrect) {
              const messageList: line.Message[] = currentLevel.successMessage({
                monsterName: userData.monsterName
              });

              userData.currentLevel = null;
              userData.levels[currentLevel.id].isPassed = true;
              const passedLevelCount = Object.values(userData.levels).filter((level) => level.isPassed).length;

              if (passedLevelCount === 10) {
                userData.monsterStage = MonsterStage.Growth;
                messageList.push(...archived10Levels[userData.monsterType]);
              } else if (passedLevelCount === 25) {
                userData.monsterStage = MonsterStage.Maternity;
                messageList.push(...archived25Levels[userData.monsterType]);
              } else if (passedLevelCount === 35) {
                userData.monsterStage = MonsterStage.Complete;
                messageList.push(...archived35Levels(userData.monsterName));
              }
              client.replyMessage(event.replyToken, messageList);
              await updateUserData(userId, userData);
              return;
            } else {
              client.replyMessage(event.replyToken, currentLevel.errorMessage);
              return;
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    // 處理錯誤，例如傳送錯誤訊息給使用者
    // await sendErrorMessage(event.replyToken);
  }
}
