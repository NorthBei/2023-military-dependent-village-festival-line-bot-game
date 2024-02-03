import { Message } from '@line/bot-sdk';

import localGlobalData from './localGlobalData';

export enum WelcomeMsgType {
  BeforeEvent = 'BeforeEvent',
  DuringEvent = 'DuringEvent',
  AfterEvent = 'AfterEvent'
}

export enum CardType {
  Chance = 'Chance',
  Destiny = 'Destiny'
}

export enum MonsterType {
  Salty = 'Salty',
  Sour = 'Sour',
  Spicy = 'Spicy',
  Sweet = 'Sweet'
}

export enum MonsterStage {
  Init = 'Init',
  Growth = 'Growth',
  GiftRedeem = 'GiftRedeem',
  Maternity = 'Maternity'
}

export enum Era {
  THE1950 = '1950',
  THE1960 = '1960',
  THE1970 = '1970',
  THE1980 = '1980',
  THE1990 = '1990',
  THE2000 = '2000'
}

export type UserLevelsRecord = Record<
  (typeof localGlobalData.levels)[number]['id'],
  { isPassed: boolean; randomLevelKey?: RandomLevelClassified }
>;
export type UserCardsRecord = Record<
  Era,
  | {
      isDrawn: true;
      type: CardType;
      isGetAward: boolean;
    }
  | {
      isDrawn: false;
      type: null;
      isGetAward: false;
    }
>;

export type UserData = {
  readonly userId: string;
  readonly userName: string;
  isInit: boolean;
  monsterName: string;
  monsterType: MonsterType;
  monsterStage: MonsterStage;
  currentLevel: keyof UserLevelsRecord | null;
  isFirstDrawnCard: boolean;
  isRedeemGift: boolean;
  levels: UserLevelsRecord;
  cards: UserCardsRecord;
  npcPoints: number;
  initAt: string; // dateTime string, e.g. 2024-02-03 09:12:57
};

export enum RandomLevelClassified {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E'
}

export enum LevelCategory {
  Healing = 'Healing',
  Adventure = 'Adventure'
}

export enum LevelType {
  Normal = 'Normal',
  Random = 'Random'
}

export type BasicLevel = {
  id: string;
  category: LevelCategory;
  activationCode: string;
  errorMessage: Message[];
  successMessage: (data?: Record<string, string>) => Message[];
};

export type NormalLevel = {
  type: LevelType.Normal;
  content: (data?: Record<string, string>) => Message[];
  password: string;
} & BasicLevel;

export type RandomLevel = {
  type: LevelType.Random;
  content: Record<RandomLevelClassified[number], Message[]>;
  password: Record<RandomLevelClassified[number], string>;
} & BasicLevel;

export type Level = NormalLevel | RandomLevel;
