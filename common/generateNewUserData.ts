import localGlobalData from '@/common/localGlobalData';
import { Era, LevelType, MonsterStage, MonsterType, UserCardsRecord, UserData, UserLevelsRecord } from '@/common/types';
import shuffle from '@/common/utils/shuffle';

const userLevelsObj: UserLevelsRecord = localGlobalData.levels.reduce((obj, level) => {
  const content = { isPassed: false };
  if (level.type === LevelType.Random) {
    const shuffleArray = shuffle(Object.keys(level.content));
    const randomLevelKey = shuffleArray[0];
    Object.assign(content, { randomLevelKey });
  }

  Object.assign(obj, {
    [level.id]: content
  });
  return obj;
}, {});

const userCardsObj: UserCardsRecord = Object.values(Era).reduce((obj, era) => {
  Object.assign(obj, {
    [era]: {
      isDrawn: false,
      type: null,
      isGetAward: false
    }
  });
  return obj;
}, {} as UserCardsRecord);

export const genNewUserData = (userId: string, userName: string): UserData => {
  return {
    userId,
    userName,
    isInit: false,
    monsterName: '',
    monsterType: MonsterType.Salty,
    monsterStage: MonsterStage.Init,
    isFirstDrawnCard: false,
    currentLevel: null,
    levels: userLevelsObj,
    cards: userCardsObj,
    isRedeemGift: false,
    npcPoints: 0,
    initAt: ''
  };
};
