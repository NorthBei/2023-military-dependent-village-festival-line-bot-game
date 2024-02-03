import { ServiceAccount } from 'firebase-admin';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import { dbGlobalData } from '@/common/dbGlobalData';
import { UserData } from '@/common/types';

if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  throw new Error('Error: FIREBASE_SERVICE_ACCOUNT_JSON environment variable not found');
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON) as ServiceAccount;

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const globalDataRef = db.collection('records').doc('global');
const userRef = (userId: string) => db.collection('users').doc(userId);

// 建立新的使用者
export async function createUser(userId: string, userData: UserData) {
  await userRef(userId).set(userData, { merge: true });
}

// 讀取使用者資料
export async function getUserData(userId: string) {
  const userDoc = await userRef(userId).get();
  return userDoc.exists ? (userDoc.data() as UserData) : null;
}

// 更新使用者資料
export async function updateUserData(userId: string, userData: UserData) {
  await userRef(userId).set(userData, { merge: true });
}

export async function getDbGlobalData() {
  const doc = await globalDataRef.get();
  return doc.exists ? (doc.data() as typeof dbGlobalData) : null;
}
