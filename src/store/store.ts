import { atom } from 'jotai';

import { dbGlobalData } from '@/common/dbGlobalData';
import { UserData } from '@/common/types';

export const userDataAtom = atom<UserData | null>(null);

export const dbGlobalDataAtom = atom<typeof dbGlobalData | null>(null);
