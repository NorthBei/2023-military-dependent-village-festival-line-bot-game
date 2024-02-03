import { atom, SetStateAction } from 'jotai';

import { dbGlobalData } from '@/common/dbGlobalData';
import { UserData } from '@/common/types';
import { updateUserData } from '@/web/libs/firebase';

export const userDataAtom = atom<UserData | null>(null);

export const userDataSyncAtom = atom<UserData | null, [SetStateAction<UserData | null>], void>(
  (get) => get(userDataAtom),
  async (get, set, userDataOrFunction) => {
    const tempUserData = get(userDataAtom);
    // This syntax could be `set(priceAtom, (price) => price - 10)` or `set(priceAtom, newPrice)`
    set(userDataAtom, userDataOrFunction);

    const userData = typeof userDataOrFunction === 'function' ? userDataOrFunction(tempUserData) : userDataOrFunction;
    if (!userData) return;

    await updateUserData(userData.userId, userData);
  }
);

export const dbGlobalDataAtom = atom<typeof dbGlobalData | null>(null);
