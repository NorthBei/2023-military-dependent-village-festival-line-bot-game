import { format } from 'fecha';
import { initializeApp } from 'firebase/app';
import { getAuth, OAuthProvider, signInWithCredential } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';

import { dbGlobalData } from '@/common/dbGlobalData';
import { genNewUserData } from '@/common/generateNewUserData';
import { UserData } from '@/common/types';
import getTaipeiDate from '@/common/utils/getTaipeiDate';

if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  throw new Error('Error: Firebase environment variable not fond');
}

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
});

const db = getFirestore(app);
const auth = getAuth();

const globalDataRef = doc(db, 'records', 'global');
const usersRef = collection(db, 'users');
const userRef = (userId: string) => doc(db, 'users', userId);

/* user manipulation relative */

export async function createUser(userId: string, userName: string) {
  const userData = genNewUserData(userId, userName);
  await setDoc(userRef(userId), userData);
  return userData;
}

export const getUserData = async (userId: string) => {
  const doc = await getDoc(userRef(userId));
  return doc.exists() ? (doc.data() as UserData) : null;
};

export const updateUserData = async (userId: string, userData: UserData) => {
  await setDoc(userRef(userId), userData, { merge: true });
};

export const getTodayInitializedUser = async () => {
  const todayMidnight = format(getTaipeiDate(), 'YYYY-MM-DD 00:00:00');

  const q = query(
    usersRef,
    where('isInit', '==', true),
    where('initAt', '>', todayMidnight),
    orderBy('initAt', 'desc')
  );
  const docs = await getDocs(q);
  const users: UserData[] = [];

  docs.forEach((doc) => {
    if (doc.exists()) {
      users.push(doc.data() as UserData);
    }
  });

  return users;
};

/* dbGlobal data manipulation relative */

export const getDbGlobalData = async () => {
  const doc = await getDoc(globalDataRef);
  return doc.exists() ? (doc.data() as typeof dbGlobalData) : null;
};

export async function resetUserAndGlobalData(userId: string, userName: string) {
  await setDoc(userRef(userId), genNewUserData(userId, userName));
  await setDoc(globalDataRef, dbGlobalData);
}

/* others */

export const updateAnnouncement = async (announcement: string) => {
  await updateDoc(globalDataRef, { announcement });
};

export const authWithLine = async (idToken: string) => {
  const provider = new OAuthProvider('oidc.line');
  const credential = provider.credential({ idToken });
  await signInWithCredential(auth, credential);
};
