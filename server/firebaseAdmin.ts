import { ServiceAccount } from 'firebase-admin';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import { dbGlobalData } from '../common/dbGlobalData';
import { UserData } from '../common/types';
import serviceAccount from './military-village-festival-firebase-adminsdk-99rop-9c792a662a.json';

initializeApp({
  credential: cert(serviceAccount as ServiceAccount)
});

const db = getFirestore();

// 初始化使用者資料
export async function initUser(userId: string, userInitData: UserData) {
  // users.set(userId, userInitData);
  await db.collection('users').doc(userId).set(userInitData, { merge: true });
}

// 讀取使用者資料
export async function getUserData(userId: string) {
  // return users.get(userId);
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    return userDoc.exists ? (userDoc.data() as UserData) : null;
  } catch (error) {
    return null;
  }
}

// 更新使用者資料
export async function updateUserData(userId: string, userData: UserData) {
  const userRef = db.collection('users').doc(userId);
  await userRef.set(userData, { merge: true });
}

// 讀取使用者資料
export async function getDbGlobalData() {
  // const userRef = db.collection('records').doc('');
  // const userDoc = await userRef.get();
  // return userDoc.exists ? (userDoc.data() as UserData) : null;
  return dbGlobalData;
}
