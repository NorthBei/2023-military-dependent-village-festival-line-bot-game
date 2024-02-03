import { TemplateMessage } from '@line/bot-sdk';

import { BOT_ASSETS_PREFIX, DOMAIN, OFFICIAL_ACCOUNT_NAME } from './constant';
import { confirmMessage, imagemapMessage, imageMessage, textMessage } from './createMessage';
import { Era, MonsterType, WelcomeMsgType } from './types';

const IMAGEMAP_ASSETS_PREFIX = `${DOMAIN}/imagemap`;
const SYS_FLOW_ASSETS_PREFIX = `${BOT_ASSETS_PREFIX}/流程`;

export const welcome = (welcomeMsgType: WelcomeMsgType, username: string) => {
  if (welcomeMsgType === WelcomeMsgType.BeforeEvent) {
    return [
      textMessage(
        `${username}勇者你好～\n歡迎來到${OFFICIAL_ACCOUNT_NAME} 🎮\n\n轉生新手村在 9/29.30 15:00-21:00 於新北空軍三重一村開啟，限時12小時。\n\n邀請你一起來完成新手村挑戰，跟著你的專屬轉轉獸夥伴，一起轉生成功！`
      ),
      imageMessage(`${SYS_FLOW_ASSETS_PREFIX}/歡迎黑膠.png`)
    ];
  }
  if (welcomeMsgType === WelcomeMsgType.DuringEvent) {
    return [
      textMessage(
        `${username}勇者你好～\n歡迎來到${OFFICIAL_ACCOUNT_NAME} 🎮\n\n轉生新手村在 9/29.30 15:00-21:00 於新北空軍三重一村開啟，限時12小時。\n\n邀請你一起來完成新手村挑戰，跟著你的專屬轉轉獸夥伴，一起轉生成功！`
      ),
      textMessage('遊戲開啟方式：\n\n抵達空軍三重一村後，找到下方「轉生GO！」開啟選單，點擊新手村闖關卡才可開啟遊戲\n'),
      imageMessage(`${SYS_FLOW_ASSETS_PREFIX}/歡迎黑膠.png`)
    ];
  }
  if (welcomeMsgType === WelcomeMsgType.AfterEvent) {
    return [textMessage('新手村要暫時關閉啦，歡迎你下次再轉生過來一起玩喔～')];
  }
  return [];
};

export const eventStartSoon = () => {
  return [
    textMessage(
      `勇者你好，\n這裡是轉生遇眷你服務中心💁\n\n您在我們這一次的轉生VIP名單上。\n為了確保您順利抵達新手村，並順利通過挑戰轉生成功。\n\n以下幾點提醒您：\n1. 點擊下方「轉生GO！」開啟選單，點擊【新手村闖關卡】才可開啟遊戲\n2. 闖關地點：新北市空軍三重一村\n3. 闖關時間：9/29.30 15:00-21:00，12小時限定\n\n那期待您的到來，我們不眷不散囉！`
    ),
    imageMessage(`${SYS_FLOW_ASSETS_PREFIX}/缺你一咖.png`)
  ];
};

export const richMenuIntro = [
  textMessage(
    '開啟遊戲：點擊下面選單的\n【新手村闖關卡】\n\n新手村破關四步驟：\n\n㊀ 於村子內找到關卡位置\n㊁ 輸入通關密語開啟關卡\n㊂ 回答關卡問題\n㊃ 過關！找尋下一個關卡\n\n完成25關，進化到「成熟期」，就可以回到轉生服務中心兌換小禮物\n\n按下面選單【新手村闖關卡】就可以查詢闖關進度'
  )
];

export const richMenuMap = [
  textMessage(
    '為了讓你的新手村冒險更精彩，地圖只能提供到這裡了，剩下的就交給你去找出來了～\n\n有些關卡也許不在地圖上唷^^'
  ),
  imageMessage(`${SYS_FLOW_ASSETS_PREFIX}/地圖.jpg`)
];

export const gameNotAvailable = [
  textMessage('感謝您的參與！新手村已經關閉，期待有一天，再與您相眷～\n\n歡迎與我們分享您的轉生心得☺️')
  // textMessage('🎮新手村閉園充電中，歡迎在 9/29.30 15:00-21:00 回來新北空軍三重一村，一起玩耍喔！')
];

export const userNotInit = (username: string) => {
  return [
    textMessage(
      `${username}勇者你好～\n歡迎來到${OFFICIAL_ACCOUNT_NAME} 🎮\n\n看來你還沒找到你的專屬轉轉獸夥伴，\n趕快點擊下方選單【新手村闖關卡】，一起轉生到新手村吧！`
    )
  ];
};

const userInitMsgMap = {
  [MonsterType.Salty]: [imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/抽到鹹轉轉/`, '抽到鹹轉轉', 1)],
  [MonsterType.Sour]: [imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/抽到酸轉轉/`, '抽到酸轉轉', 1)],
  [MonsterType.Spicy]: [imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/抽到辣轉轉/`, '抽到辣轉轉', 1)],
  [MonsterType.Sweet]: [imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/抽到甜轉轉/`, '抽到甜轉轉', 1)]
};

export const userInit = (monsterName: string, monsterType: MonsterType) => {
  return [
    ...userInitMsgMap[monsterType],
    textMessage(
      `有${monsterName}我跟著，可以放心展開冒險啦！\n\n新手村破關四步驟：\n\n㊀ 於村子內找到關卡位置\n㊁ 輸入通關密語開啟關卡\n㊂ 回答關卡問題\n㊃ 過關！找尋下一個關卡\n\n完成25關，進化到「成熟期」，就可以回到轉生服務中心兌換小禮物\n\n按下面選單【新手村闖關卡】就可以查詢闖關進度`
    ),
    imageMessage(`${SYS_FLOW_ASSETS_PREFIX}/尋找關卡.png`)
  ];
};

const eraImageMsgMap = {
  [Era.THE1950]: [imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/1950/`, '1950年代開始囉～', 0.5)],
  [Era.THE1960]: [imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/1960/`, '1960年代開始囉～', 0.5)],
  [Era.THE1970]: [imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/1970/`, '1970年代開始囉～', 0.5)],
  [Era.THE1980]: [imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/1980/`, '1980年代開始囉～', 0.5)],
  [Era.THE1990]: [imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/1990/`, '1990年代開始囉～', 0.5)],
  [Era.THE2000]: [imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/2000/`, '2000年代開始囉～', 0.5)]
};

export const eraStart = (era: Era) => {
  return eraImageMsgMap[era];
};

export const archived10Levels = (monsterName: string, monsterType: MonsterType) => {
  const messageMap = {
    [MonsterType.Salty]: [
      textMessage(
        `❤️ 進化成為愛吃獸  ❤️\n\n恭喜你～\n${monsterName}從史萊姆長大成「愛吃獸」！\n吃好睡好頭好壯壯，看看有什麼新技能👀`
      ),
      imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/鹹愛吃獸/`, '鹹愛吃獸', 1)
    ],
    [MonsterType.Sour]: [
      textMessage(
        `💚 進化成為愛吃獸  💚\n\n恭喜你～\n${monsterName}從史萊姆長大成「愛吃獸」！\n吃好睡好頭好壯壯，看看有什麼新技能👀`
      ),
      imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/酸愛吃獸/`, '酸愛吃獸', 1)
    ],
    [MonsterType.Spicy]: [
      textMessage(
        `💖 進化成為愛吃獸  💖\n\n恭喜你～\n${monsterName}從史萊姆長大成「愛吃獸」！\n吃好睡好頭好壯壯，看看有什麼新技能👀`
      ),
      imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/辣愛吃獸/`, '辣愛吃獸', 1)
    ],
    [MonsterType.Sweet]: [
      textMessage(
        `💛 進化成為愛吃獸  💛\n\n恭喜你～\n${monsterName}從史萊姆長大成「愛吃獸」！\n吃好睡好頭好壯壯，看看有什麼新技能👀`
      ),
      imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/甜愛吃獸/`, '甜愛吃獸', 1)
    ]
  };

  return messageMap[monsterType];
};

export const archived25Levels = (monsterName: string, monsterType: MonsterType) => {
  const messageMap = {
    [MonsterType.Salty]: [
      textMessage(
        `❤️ 進化成為待轉獸  ❤️\n\n太強了！！！${monsterName}進化成可以獨當一面的「待轉獸」\n\n之後可以一起去更遠的地方冒險，但也記得禮讓路上其他的轉轉獸唷 🛵"`
      ),
      imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/鹹待轉獸/`, '鹹待轉獸', 1),
      textMessage('🎁 別忘了到轉生服務中心兌換轉生小禮\n\n還有剩下10個關卡，若要成為更強的勇者，歡迎繼續挑戰鍛鍊！')
    ],
    [MonsterType.Sour]: [
      textMessage(
        `💚 進化成為待轉獸  💚\n\n太強了！！！${monsterName}進化成可以獨當一面的「待轉獸」\n\n之後可以一起去更遠的地方冒險，但也記得禮讓路上其他的轉轉獸唷 🛵`
      ),
      imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/酸待轉獸/`, '酸待轉獸', 1),
      textMessage('🎁 別忘了到轉生服務中心兌換轉生小禮\n\n還有剩下10個關卡，若要成為更強的勇者，歡迎繼續挑戰鍛鍊！')
    ],
    [MonsterType.Spicy]: [
      textMessage(
        `💖 進化成為待轉獸 💖\n\n太強了！！！${monsterName}進化成可以獨當一面的「待轉獸」\n\n之後可以一起去更遠的地方冒險，但也記得禮讓路上其他的轉轉獸唷 🛵`
      ),
      imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/辣待轉獸/`, '辣待轉獸', 1),
      textMessage('🎁 別忘了到轉生服務中心兌換轉生小禮\n\n還有剩下10個關卡，若要成為更強的勇者，歡迎繼續挑戰鍛鍊！')
    ],
    [MonsterType.Sweet]: [
      textMessage(
        `💛 進化成為待轉獸  💛\n\n太強了！！！${monsterName}進化成可以獨當一面的「待轉獸」\n\n之後可以一起去更遠的地方冒險，但也記得禮讓路上其他的轉轉獸唷 🛵`
      ),
      imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/甜待轉獸/`, '甜待轉獸', 1),
      textMessage('🎁 別忘了到轉生服務中心兌換轉生小禮\n\n還有剩下10個關卡，若要成為更強的勇者，歡迎繼續挑戰鍛鍊！')
    ]
  };

  return messageMap[monsterType];
};

export const archived35Levels = (monsterName: string) => {
  return [
    textMessage(
      `＼＼全村狂賀／／\n♡(*´∀｀*)人(*´∀｀*)♡\n\n恭喜完成35個關卡\n\n經過了這段鍛鍊，\n相信你更能抱持著不同的好奇心和視野繼續到異世界展開人生冒險！\n\n嗚嗚嗚～${monsterName}就陪你到這裡了，接下來的人冒險需要你自己去體驗了。\n\n但當你想念${monsterName}，${monsterName}也會感應得到唷！記得回來村子找我玩～～`
    ),
    imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/全村狂賀/`, '全村狂賀', 1.542)
  ];
};

export const byeByeMsg = () => {
  return [
    textMessage(
      '珍～重～再～眷～\n\n這6小時的魔幻時刻，\n劃下句點。\n感謝遇眷了你，\n一起度過的美好時光～\n期待下次再眷！'
    ),
    imagemapMessage(`${IMAGEMAP_ASSETS_PREFIX}/珍重再眷/`, '珍重再眷', 1),
    {
      type: 'template',
      altText: '嗚嗚嗚捨不得離開 (๑•́ ₃ •̀๑)',
      template: confirmMessage('嗚嗚嗚捨不得離開 (๑•́ ₃ •̀๑)', [
        {
          text: '策展理念',
          data: 'curatorialStatement'
        },
        {
          text: '幕後團隊',
          data: 'curatorialTeam'
        }
      ])
    } satisfies TemplateMessage
  ];
};

export const curatorialStatement = () => {
  return [
    imageMessage(`${SYS_FLOW_ASSETS_PREFIX}/策展概念.png`),
    textMessage(
      '如果沒意外，\n接下來應該會用各種花絮和幕後開箱轟炸大家XD\n記得到滾出趣的FB/IG收看！\n\nhttps://www.facebook.com/rollinginlife'
    )
  ];
};

export const curatorialTeam = () => {
  return [
    imageMessage(`${SYS_FLOW_ASSETS_PREFIX}/工作團隊.png`),
    imageMessage(`${SYS_FLOW_ASSETS_PREFIX}/主活動現場人員.png`)
  ];
};
