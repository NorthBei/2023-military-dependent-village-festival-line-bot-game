import localGlobalData from '../common/localGlobalData';
import { Era, MonsterStage, MonsterType, UserCardsRecord, UserData, UserLevelsRecord } from '../common/types';

const userLevelsObj: UserLevelsRecord = localGlobalData.levels.reduce((obj, level) => {
  Object.assign(obj, {
    [level.id]: { isPassed: false }
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

export const genUserInitData = (userId: string, userName: string): UserData => {
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
    npcPoints: 0
  };
};
