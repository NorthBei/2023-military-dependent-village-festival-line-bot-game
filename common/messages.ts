import { imageMessage, noBgImageMessage, textMessage } from './createMessage';
import { ASSETS_PREFIX } from './localGlobalData';
import { MonsterType } from './types';

const SYS_FLOW_ASSETS_PREFIX = `${ASSETS_PREFIX}流程/`;
const ACCOUNT_NAME = '轉生遇眷你 See You There';

// ✅
export const welcome = (username: string) => {
  return [
    textMessage(
      `${username}勇者你好～\n歡迎來到${ACCOUNT_NAME} 🎮\n\n轉生新手村在 9/29.30 15:00-21:00 於新北空軍三重一村開啟，限時12小時。\n\n邀請你一起來完成新手村挑戰，跟著你的專屬轉轉獸夥伴，一起轉生成功！`
    ),
    textMessage(
      '遊戲開啟方式：\n1. 點擊下方「轉生GO！」開啟選單，點擊新手村闖關卡才可開啟遊戲\n2. 闖關地點：新北市空軍三重一村\n3. 闖關時間：9/29.30 15:00-21:00，12小時限定'
    ),
    imageMessage(`${SYS_FLOW_ASSETS_PREFIX}歡迎黑膠.png`)
  ];
};

export const eventAnnounce = (username: string) => {
  return [
    textMessage(
      `${username}勇者你好，\n這裡是轉生遇眷你服務中心💁\n\n您在我們這一次的轉生VIP名單上。\n為了確保您順利抵達新手村，並順利通過挑戰轉生成功。\n\n以下幾點提醒您：\n1. 點擊下方「轉生GO！」開啟選單，點擊【新手村闖關卡】才可開啟遊戲\n2. 闖關地點：新北市空軍三重一村\n3. 闖關時間：9/29.30 15:00-21:00，12小時限定\n\n那期待您的到來，我們不眷不散囉！`
    ),
    imageMessage(`${SYS_FLOW_ASSETS_PREFIX}缺你一咖.png`)
  ];
};

export const richMenuIntro = [
  textMessage(
    '開啟遊戲：點擊下面選單的「新手村闖關卡」\n\n新手村破關四步驟：\n\n㊀ 於村子內找到關卡位置\n㊁ 掃描QR code或輸入通關密碼開啟關卡\n㊂ 回答關卡問題\n㊃ 過關！找尋下一個關卡\n\n進化到「成熟期」，就可以回到轉生服務中心兌換小禮物\n按下面選單「新手村闖關卡」就可以查詢闖關進度'
  )
];

export const richMenuMap = [
  textMessage('為了讓你的新手村冒險更精彩，地圖只能提供到這裡了，剩下的就交給你去找出來了～'),
  imageMessage(`${SYS_FLOW_ASSETS_PREFIX}地圖.jpg`)
];

// ✅
export const addFriendAfterEventClosed = [textMessage('新手村要暫時關閉啦，歡迎你下次再轉生過來一起玩喔～')];

// ✅
export const gameNotAvailable = [
  textMessage('🎮新手村閉園充電中，歡迎在 9/29.30 15:00-21:00 回來新北空軍三重一村，一起玩耍喔！')
];

// ✅
export const userNotInit = (username: string) => {
  return [
    textMessage(
      `${username}勇者你好～\n歡迎來到${ACCOUNT_NAME} 🎮\n\n看來你還沒找到你的專屬轉轉獸夥伴，\n趕快點擊下方選單【新手村闖關卡】，一起轉生到新手村吧！`
    )
  ];
};

const userInitMsgMap = {
  [MonsterType.Salty]: [noBgImageMessage(`${SYS_FLOW_ASSETS_PREFIX}抽到鹹轉轉.png`)],
  [MonsterType.Sour]: [noBgImageMessage(`${SYS_FLOW_ASSETS_PREFIX}抽到酸轉轉.png`)],
  [MonsterType.Spicy]: [noBgImageMessage(`${SYS_FLOW_ASSETS_PREFIX}抽到辣轉轉.png`)],
  [MonsterType.Sweet]: [noBgImageMessage(`${SYS_FLOW_ASSETS_PREFIX}抽到甜轉轉.png`)]
};

// ✅
export const userInit = (monsterName: string, monsterType: MonsterType) => {
  return [
    ...userInitMsgMap[monsterType],
    textMessage(
      `有${monsterName}我跟著，可以放心展開冒險啦！\n\n新手村破關四步驟：\n\n㊀ 於村子內找到關卡位置\n㊁ 掃描QR code或輸入通關密碼開啟關卡\n㊂ 回答關卡問題\n㊃ 過關！找尋下一個關卡\n\n等我進化到「成熟期」，就可以回到轉生服務中心兌換小禮物！\n按下面選單【新手村闖關卡】就可以查詢闖關進度喔`
    ),
    imageMessage(`${SYS_FLOW_ASSETS_PREFIX}尋找關卡.png`)
  ];
};

// ✅
export const archived10Levels = {
  [MonsterType.Salty]: [
    textMessage('❤️ 進化成為愛吃獸  ❤️\n\n恭喜你～從史萊姆長大成「愛吃獸」！\n吃好睡好頭好壯壯，看看有什麼新技能👀'),
    noBgImageMessage(`${SYS_FLOW_ASSETS_PREFIX}鹹愛吃獸.png`)
  ],
  [MonsterType.Sour]: [
    textMessage('💚 進化成為愛吃獸  💚\n\n恭喜你～從史萊姆長大成「愛吃獸」！\n吃好睡好頭好壯壯，看看有什麼新技能👀'),
    noBgImageMessage(`${SYS_FLOW_ASSETS_PREFIX}酸愛吃獸.png`)
  ],
  [MonsterType.Spicy]: [
    textMessage('💖 進化成為愛吃獸  💖\n\n恭喜你～從史萊姆長大成「愛吃獸」！\n吃好睡好頭好壯壯，看看有什麼新技能👀'),
    noBgImageMessage(`${SYS_FLOW_ASSETS_PREFIX}辣愛吃獸.png`)
  ],
  [MonsterType.Sweet]: [
    textMessage('💛 進化成為愛吃獸  💛\n\n恭喜你～從史萊姆長大成「愛吃獸」！\n吃好睡好頭好壯壯，看看有什麼新技能👀'),
    noBgImageMessage(`${SYS_FLOW_ASSETS_PREFIX}甜愛吃獸.png`)
  ]
};

// ✅
export const archived25Levels = {
  [MonsterType.Salty]: [
    textMessage(
      '❤️ 進化成為待轉獸  ❤️\n\n太強了！！！你已經進化成可以獨當一面的「待轉獸」！之後可以去更遠的地方冒險，但也記得禮讓路上的轉轉獸 🛵'
    ),
    noBgImageMessage(`${SYS_FLOW_ASSETS_PREFIX}鹹待轉獸.png`),
    textMessage('🎁 別忘了到轉生服務中心兌換轉生小禮\n\n還有剩下10個關卡，若要成為更強的勇者，歡迎繼續挑戰鍛鍊！')
  ],
  [MonsterType.Sour]: [
    textMessage(
      '💚 進化成為待轉獸  💚\n\n太強了！！！你已經進化成可以獨當一面的「待轉獸」！之後可以去更遠的地方冒險，但也記得禮讓路上的轉轉獸 🛵'
    ),
    noBgImageMessage(`${SYS_FLOW_ASSETS_PREFIX}酸待轉獸.png`),
    textMessage('🎁 別忘了到轉生服務中心兌換轉生小禮\n\n還有剩下10個關卡，若要成為更強的勇者，歡迎繼續挑戰鍛鍊！')
  ],
  [MonsterType.Spicy]: [
    textMessage(
      '💖 進化成為待轉獸 💖\n\n太強了！！！你已經進化成可以獨當一面的「待轉獸」！之後可以去更遠的地方冒險，但也記得禮讓路上的轉轉獸 🛵'
    ),
    noBgImageMessage(`${SYS_FLOW_ASSETS_PREFIX}辣待轉獸.png`),
    textMessage('🎁 別忘了到轉生服務中心兌換轉生小禮\n\n還有剩下10個關卡，若要成為更強的勇者，歡迎繼續挑戰鍛鍊！')
  ],
  [MonsterType.Sweet]: [
    textMessage(
      '💛 進化成為待轉獸  💛\n\n太強了！！！你已經進化成可以獨當一面的「待轉獸」！之後可以去更遠的地方冒險，但也記得禮讓路上的轉轉獸 🛵'
    ),
    noBgImageMessage(`${SYS_FLOW_ASSETS_PREFIX}甜待轉獸.png`),
    textMessage('🎁 別忘了到轉生服務中心兌換轉生小禮\n\n還有剩下10個關卡，若要成為更強的勇者，歡迎繼續挑戰鍛鍊！')
  ]
};

// ✅
export const archived35Levels = (monsterName: string) => {
  return [
    textMessage(
      `＼＼全村狂賀／／\n♡(*´∀｀*)人(*´∀｀*)♡\n\n恭喜完成35個關卡\n是開村以來第＿人\n\n經過了這段鍛鍊，\n相信你更能抱持著不同的好奇心和視野繼續到異世界展開人生冒險！\n\n${monsterName}就陪你到這裡了，有空再回來村子找我玩～～`
    ),
    noBgImageMessage(`${SYS_FLOW_ASSETS_PREFIX}全村狂賀.png`)
  ];
};
