import { format } from 'fecha';
import { initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

import { Era, UserData, WelcomeMsgType } from '../../common/types';
import getTaipeiDate from '../../common/utils/getTaipeiDate';

initializeApp();

const db = getFirestore();

const globalDataRef = db.collection('records').doc('global');
const usersRef = db.collection('users');
const userRef = (userId: string) => usersRef.doc(userId);

export async function updateUserData(userId: string, userData: UserData) {
  await userRef(userId).set(userData, { merge: true });
}

export async function resetUserCurrentLevel() {
  try {
    const querySnapshot = await usersRef.where('currentLevel', '!=', null).get();
    const users: UserData[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserData);
    });

    const batch = db.batch();

    users.forEach((user) => {
      batch.update(userRef(user.userId), { currentLevel: null });
    });

    await batch.commit();
  } catch (error) {
    console.error(error);
  }
}

export async function getTodayInitializedUser() {
  try {
    const todayMidnight = format(new Date(), 'YYYY-MM-DD 00:00:00');
    console.log(todayMidnight);
    const querySnapshot = await usersRef.where('isInit', '==', true).where('initAt', '>', todayMidnight).get();
    const users: UserData[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserData);
    });

    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function updateCurrentEra(currentEra: Era) {
  const date = getTaipeiDate();

  try {
    await globalDataRef.update({
      currentEra,
      [`era.${currentEra}`]: {
        startTime: format(date, `YYYY-MM-DD ${date.getHours()}:00`),
        endTime: format(date, `YYYY-MM-DD ${date.getHours() + 1}:00`)
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateWelcomeMsgType(welcomeMsgType: WelcomeMsgType) {
  try {
    await globalDataRef.update({
      welcomeMsgType,
      isGameAvailable: welcomeMsgType === WelcomeMsgType.DuringEvent
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateWebAvailable(isWebAvailable: boolean) {
  try {
    await globalDataRef.update({ isWebAvailable });
  } catch (error) {
    console.error(error);
  }
}

export async function add1LevelFinishedCount() {
  await globalDataRef.update({
    allLevelFinishedCount: FieldValue.increment(1)
  });
}
