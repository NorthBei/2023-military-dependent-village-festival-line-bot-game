import { initializeApp } from 'firebase/app';
import { getAuth, OAuthProvider, signInWithCredential } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { genUserInitData } from '@/server/record';

import { dbGlobalData } from '../../common/dbGlobalData';
import { UserData } from '../../common/types';

const firebaseConfig = {
  apiKey: 'AIzaSyBQQzWCbzQnALDOSvWCdaOMdeYfkB96vjE',
  authDomain: 'military-village-festival.firebaseapp.com',
  projectId: 'military-village-festival',
  storageBucket: 'military-village-festival.appspot.com',
  messagingSenderId: '289718247394',
  appId: '1:289718247394:web:52c53132074a0aee97a3bb'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export const getDbGlobalData = async () => {
  // return dbGlobalData;
  const docRef = doc(db, 'records', 'global');
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? (docSnap.data() as typeof dbGlobalData) : null;
};

export async function initTestData(userId: string) {
  await setDoc(doc(db, 'users', userId), genUserInitData(userId, '罡北'));
  await setDoc(doc(db, 'records', 'global'), dbGlobalData);
}

export const getUserData = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? (docSnap.data() as UserData) : null;
};

export const updateUserData = async (userId: string, userData: UserData) => {
  await setDoc(doc(db, 'users', userId), userData, { merge: true });
};

export const authWithLine = async (idToken: string) => {
  const provider = new OAuthProvider('oidc.line');
  const credential = provider.credential({
    idToken
  });
  await signInWithCredential(auth, credential);
};
