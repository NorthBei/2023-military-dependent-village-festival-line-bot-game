const domain = process.env.NEXT_PUBLIC_DOMAIN;

if (!domain) {
  throw new Error('Error: NEXT_PUBLIC_DOMAIN environment variable not found');
}

export const DOMAIN = domain;

export const BOT_ASSETS_PREFIX = `${DOMAIN}/bot/assets`;

export const OFFICIAL_ACCOUNT_NAME = '轉生遇眷你 See You There';

export const OFFICIAL_WEBSITE_URL = 'https://seeyouinvillage-ntpc.xyz';
