import liff from '@line/liff';

const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

if (!liffId) {
  throw new Error('Error: LIFF_ID environment variable not found');
}

export const init = async () => {
  await liff.init({
    liffId,
    withLoginOnExternalBrowser: true
  });
};

export const getProfile = liff.getProfile;

export const getIDToken = liff.getIDToken;
