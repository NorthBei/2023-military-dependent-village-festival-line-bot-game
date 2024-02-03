import { Era, WelcomeMsgType } from './types';

export const dbGlobalData = {
  welcomeMsgType: WelcomeMsgType.BeforeEvent,
  isWebAvailable: true,
  isGameAvailable: true,
  currentEra: Era.THE1950,
  announcement: '聽蔡媽媽說村子裡又誕生一隻新的轉轉獸👾',
  allLevelFinishedCount: 0,
  era: {
    1950: {
      startTime: '2021-02-11',
      endTime: '2021-02-11'
    },
    1960: {
      startTime: '2021-02-11',
      endTime: '2021-02-11'
    },
    1970: {
      startTime: '2021-02-11',
      endTime: '2021-02-11'
    },
    1980: {
      startTime: '2021-02-11',
      endTime: '2021-02-11'
    },
    1990: {
      startTime: '2021-02-11',
      endTime: '2021-02-11'
    },
    2000: {
      startTime: '2021-02-11',
      endTime: '2021-02-11'
    }
  }
};
