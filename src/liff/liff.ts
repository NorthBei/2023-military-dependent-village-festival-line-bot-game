import liff from '@line/liff';

import { userInit } from '@/common/messages';
import { MonsterType } from '@/common/types';

// change when prod
export const initLiff = async () => {
  await liff.init({
    liffId: '2000738340-NdZ2dO41',
    withLoginOnExternalBrowser: true
  });
};

export const getLiffUserId = async () => {
  const profile = await liff.getProfile();
  return profile.userId;
};

export const getIDToken = async () => {
  return await liff.getIDToken();
};

export const sendUserInitMessages = async (monsterName: string, monsterType: MonsterType) => {
  liff.permission.query('chat_message.write').then((permissionStatus) => {
    if (permissionStatus.state === 'granted') {
      liff.sendMessages(userInit(monsterName, monsterType));
    } else {
      console.error('No send message permissions');
    }
  });
};
