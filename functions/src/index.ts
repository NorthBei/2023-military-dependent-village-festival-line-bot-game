import 'dotenv-flow/config';

import { Message } from '@line/bot-sdk';
import * as logger from 'firebase-functions/logger';
import { setGlobalOptions } from 'firebase-functions/v2';
import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { onCall } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import fs from 'fs';
import { omit, reduce } from 'lodash';

import {
  archived10Levels,
  archived25Levels,
  archived35Levels,
  byeByeMsg,
  eraStart,
  eventStartSoon,
  userInit
} from '../../common/messages';
import { Era, MonsterStage, UserData, WelcomeMsgType } from '../../common/types';
import client from '../../server/lineBot';
import {
  add1LevelFinishedCount,
  getTodayInitializedUser,
  resetUserCurrentLevel,
  updateCurrentEra,
  updateUserData,
  updateWebAvailable,
  updateWelcomeMsgType
} from './firebaseAdmin';

// Set the maximum instances to 10 for all functions
setGlobalOptions({ maxInstances: 10 });

export const downloadData = onCall(async () => {
  logger.log('downloadData Start');
  const users = await getTodayInitializedUser();
  const formattedUsers = users.map((user) => {
    return omit(
      {
        ...user,
        ...reduce(
          user.levels,
          (obj, value, key) => {
            obj[`level${key}.isPassed`] = value.isPassed;
            return obj;
          },
          {} as Record<string, boolean>
        ),
        ...reduce(
          user.cards,
          (obj, value, key) => {
            obj[`cards${key}.type`] = (value.type || '').toString();
            obj[`cards${key}.isGetAward`] = value.isGetAward.toString();
            obj[`cards${key}.isDrawn`] = value.isDrawn.toString();
            `${value.type}/${value.isGetAward}`;
            return obj;
          },
          {} as Record<string, string>
        )
      },
      ['levels', 'cards']
    );
  });
  fs.writeFileSync('./data/users.json', JSON.stringify(formattedUsers));
  logger.log('downloadData End');
});

export const notifyUserInitialized = onDocumentUpdated('users/{userId}', async (event) => {
  logger.info('notifyUserInitialized Start', { structuredData: true });
  const userId = event.params.userId;

  const beforeUserData = event.data?.before.data() as UserData | undefined;
  const afterUserData = event.data?.after.data() as UserData | undefined;

  if (!beforeUserData || !afterUserData) {
    logger.info('notifyUserInitialized End', { structuredData: true });
    return;
  }

  if (beforeUserData.isInit === false && afterUserData.isInit === true) {
    try {
      await client.pushMessage(userId, userInit(afterUserData.monsterName, afterUserData.monsterType));
    } catch (error) {
      logger.error('notifyUserInitialized error', error);
    }
  }

  logger.log('notifyUserInitialized End');
});

export const notifyUserGetAchievement = onDocumentUpdated('users/{userId}', async (event) => {
  logger.info('notifyUserGetAchievement Start', { structuredData: true });
  const userId = event.params.userId;
  const userData = event.data?.after.data() as UserData | undefined;

  if (userData) {
    console.log('userName', userData?.userName);
    console.log('userData', JSON.stringify(userData));
    let isUserDataChanged = false;
    const messageList: Message[] = [];

    const otherLevelsCount =
      Object.values(userData.cards).filter((card) => card.isGetAward).length + userData.npcPoints;

    const passedLevelCount =
      Object.values(userData.levels).filter((level) => level.isPassed).length +
      (otherLevelsCount > 5 ? 5 : otherLevelsCount);

    console.log('passedLevelCount', passedLevelCount);
    if (passedLevelCount === 10 && userData.monsterStage === MonsterStage.Init) {
      userData.monsterStage = MonsterStage.Growth;
      isUserDataChanged = true;
      messageList.push(...archived10Levels(userData.monsterName, userData.monsterType));
    } else if (passedLevelCount === 25 && userData.monsterStage === MonsterStage.Growth) {
      userData.monsterStage = MonsterStage.GiftRedeem;
      isUserDataChanged = true;
      messageList.push(...archived25Levels(userData.monsterName, userData.monsterType));
    } else if (passedLevelCount === 35 && userData.monsterStage === MonsterStage.GiftRedeem) {
      userData.monsterStage = MonsterStage.Maternity;
      isUserDataChanged = true;
      messageList.push(...archived35Levels(userData.monsterName));
      await add1LevelFinishedCount();
    }

    if (isUserDataChanged) await updateUserData(userData.userId, userData);

    console.log('messageList', messageList);
    if (messageList.length > 0) await client.pushMessage(userId, messageList);
  }

  logger.log('notifyUserGetAchievement End');
});

export const notifyEventStartSoon = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: '23,25,27,29 of sep 10:00'
  },
  async () => {
    logger.log('notifyEventStartSoon Start');
    try {
      await client.broadcast(eventStartSoon());
    } catch (error) {
      logger.error('notifyEventStartSoon error', error);
    }
    logger.log('notifyEventStartSoon End');
  }
);

export const changeBotWelcomeMsgToBeforeEvent = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: '23,25,27,29 of sep 00:01'
  },
  async () => {
    logger.log('changeBotWelcomeMsgToBeforeEvent Start');
    try {
      await updateWelcomeMsgType(WelcomeMsgType.BeforeEvent);
    } catch (error) {
      logger.error('changeBotWelcomeMsgToBeforeEvent error', error);
    }
    logger.log('changeBotWelcomeMsgToBeforeEvent End');
  }
);

export const changeBotWelcomeMsgToDuringEvent = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: '23,25,27,29 of sep 10:00'
  },
  async () => {
    logger.log('changeBotWelcomeMsgToDuringEvent Start');
    try {
      await updateWelcomeMsgType(WelcomeMsgType.DuringEvent);
    } catch (error) {
      logger.error('changeBotWelcomeMsgToDuringEvent error', error);
    }
    logger.log('changeBotWelcomeMsgToDuringEvent End');
  }
);

export const changeBotWelcomeMsgToAfterEvent = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: '24,26,28,30 of sep 21:01'
  },
  async () => {
    logger.log('changeBotWelcomeMsgToAfterEvent Start');
    try {
      await updateWelcomeMsgType(WelcomeMsgType.AfterEvent);
    } catch (error) {
      logger.error('changeBotWelcomeMsgToAfterEvent error', error);
    }
    logger.log('changeBotWelcomeMsgToAfterEvent End');
  }
);

export const changeWebToAvailable = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: 'every day of sep 15:00'
  },
  async () => {
    logger.log('changeWebToAvailable Start');
    try {
      await updateCurrentEra(Era.THE1950);
      await updateWebAvailable(true);
    } catch (error) {
      logger.error('changeWebToAvailable error', error);
    }
    logger.log('changeWebToAvailable End');
  }
);

export const changeWebToNotAvailable1 = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: '23,25,27,29 of sep 21:00'
  },
  async () => {
    logger.log('changeWebToNotAvailable1 Start');
    try {
      await updateWebAvailable(false);
    } catch (error) {
      logger.error('changeWebToNotAvailable1 error', error);
    }
    logger.log('changeWebToNotAvailable1 End');
  }
);

export const changeWebToNotAvailable2 = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    // schedule: "24,26,28,30 of sep 23:59",
    schedule: '7 of oct 00:01'
  },
  async () => {
    logger.log('changeWebToNotAvailable1 Start');
    try {
      await updateWebAvailable(false);
    } catch (error) {
      logger.error('changeWebToNotAvailable1 error', error);
    }
    logger.log('changeWebToNotAvailable1 End');
  }
);

export const resetCurrentLevel = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: '23,25,27,29 of sep 22:00'
  },
  async () => {
    logger.log('resetCurrentLevel Start');
    try {
      await resetUserCurrentLevel();
    } catch (error) {
      logger.error('resetCurrentLevel error', error);
    }
    logger.log('resetCurrentLevel End');
  }
);

export const updateEra1950 = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: 'every day of sep 15:00'
  },
  async () => {
    logger.log('updateEra1950 Start');
    try {
      await updateCurrentEra(Era.THE1950);
    } catch (error) {
      logger.error('updateEra1950 error', error);
    }
    logger.log('updateEra1950 Start');
  }
);

export const notifyDraw1950Card = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: 'every day of sep 15:30'
  },
  async () => {
    logger.log('notifyDraw1950Card Start');
    try {
      await client.broadcast(eraStart(Era.THE1950));
    } catch (error) {
      logger.error('notifyDraw1950Card error', error);
    }
    logger.log('notifyDraw1950Card End');
  }
);

export const updateEra1960 = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: 'every day of sep 16:00'
  },
  async () => {
    logger.log('updateEra1960 Start');
    try {
      await updateCurrentEra(Era.THE1960);
    } catch (error) {
      logger.error('updateEra1960 error', error);
    }
    logger.log('updateEra1960 Start');
  }
);

export const notifyDraw1960Card = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: 'every day of sep 16:30'
  },
  async () => {
    logger.log('notifyDraw1960Card Start');
    try {
      await client.broadcast(eraStart(Era.THE1960));
    } catch (error) {
      logger.error('notifyDraw1960Card error', error);
    }
    logger.log('notifyDraw1960Card End');
  }
);

export const updateEra1970 = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: 'every day of sep 17:00'
  },
  async () => {
    logger.log('updateEra1970 Start');
    try {
      await updateCurrentEra(Era.THE1970);
    } catch (error) {
      logger.error('updateEra1970 error', error);
    }
    logger.log('updateEra1970 Start');
  }
);

export const notifyDraw1970Card = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: 'every day of sep 17:30'
  },
  async () => {
    logger.log('notifyDraw1970Card Start');
    try {
      await client.broadcast(eraStart(Era.THE1970));
    } catch (error) {
      logger.error('notifyDraw1970Card error', error);
    }
    logger.log('notifyDraw1970Card End');
  }
);

export const updateEra1980 = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: 'every day of sep 18:00'
  },
  async () => {
    logger.log('updateEra1980 Start');
    try {
      await updateCurrentEra(Era.THE1980);
    } catch (error) {
      logger.error('updateEra1980 error', error);
    }
    logger.log('updateEra1980 Start');
  }
);

export const notifyDraw1980Card = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: 'every day of sep 18:30'
  },
  async () => {
    logger.log('notifyDraw1980Card Start');
    try {
      await client.broadcast(eraStart(Era.THE1980));
    } catch (error) {
      logger.error('notifyDraw1980Card error', error);
    }
    logger.log('notifyDraw1980Card End');
  }
);

export const updateEra1990 = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: 'every day of sep 19:00'
  },
  async () => {
    logger.log('updateEra1990 Start');
    try {
      await updateCurrentEra(Era.THE1990);
    } catch (error) {
      logger.error('updateEra1990 error', error);
    }
    logger.log('updateEra1990 Start');
  }
);

export const notifyDraw1990Card = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: 'every day of sep 19:30'
  },
  async () => {
    logger.log('notifyDraw1990Card Start');
    try {
      await client.broadcast(eraStart(Era.THE1990));
    } catch (error) {
      logger.error('notifyDraw1990Card error', error);
    }
    logger.log('notifyDraw1990Card End');
  }
);

export const updateEra2000 = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: 'every day of sep 20:00'
  },
  async () => {
    logger.log('updateEra2000 Start');
    try {
      await updateCurrentEra(Era.THE2000);
    } catch (error) {
      logger.error('updateEra2000 error', error);
    }
    logger.log('updateEra2000 Start');
  }
);

export const notifyDraw2000Card = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: 'every day of sep 20:30'
  },
  async () => {
    logger.log('notifyDraw2000Card Start');
    try {
      await client.broadcast(eraStart(Era.THE2000));
    } catch (error) {
      logger.error('notifyDraw2000Card error', error);
    }
    logger.log('notifyDraw2000Card End');
  }
);

export const seeYou = onSchedule(
  {
    timeZone: 'Asia/Taipei',
    schedule: 'every day of sep 21:30'
  },
  async () => {
    logger.log('seeYou Start');
    try {
      await client.broadcast(byeByeMsg());
    } catch (error) {
      logger.error('seeYou error', error);
    }
    logger.log('seeYou End');
  }
);
