import groupBy from 'lodash/groupBy';

import { BOT_ASSETS_PREFIX } from './constant';
import { audioMessage, imageMessage, textMessage } from './createMessage';
import { CardType, Era, Level, LevelCategory, LevelType, RandomLevelClassified } from './types';

const LEVEL_ASSETS_PREFIX = `${BOT_ASSETS_PREFIX}/關卡`;
const LEVEL_MAHJONG_ASSETS_PREFIX = `${LEVEL_ASSETS_PREFIX}/麻將`;
const LEVEL_SOUND_ASSETS_PREFIX = `${LEVEL_ASSETS_PREFIX}/音檔`;

type LocalGlobalDataType = {
  levels: Level[];
  cards: Record<
    Era,
    Record<CardType, { title: string; subtitle: string; description: string; image: string; isCanGetAward: boolean }>
  >;
};

const localGlobalData: LocalGlobalDataType = {
  levels: [
    {
      id: '1',
      category: LevelCategory.Healing,
      type: LevelType.Normal,
      activationCode: '今晚放電影',
      content: () => [
        textMessage(
          '🕹️抵達「老同學電影館」\n\n歡迎來到李國明老師的電影畫室。當年三重可是到處都是電影院，一整條街都是畫電影海報的工作室。\n\n📜外省出身的導演侯孝賢，有眷村題材的《童年往事》，也有關於二二八事件的《悲情城市》。電影館中還有他的哪一部電影？（提示：關於九份的故事）'
        )
      ],
      password: '戀戀風塵',
      errorMessage: [textMessage('再找找看是哪一部！')],
      successMessage: () => [
        textMessage('太厲害啦！\n沒想到勇者也有這麼文藝的一面呢～\n\n🀄 恭喜獲得「老同學電影館」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-電影院.png`)
      ]
    },
    {
      id: '2',
      category: LevelCategory.Healing,
      type: LevelType.Normal,
      activationCode: '客廳即工廠',
      content: () => [
        textMessage(
          '🕹️ 抵達「我家裁縫店」\n\n「喀喀喀...」媽媽為了貼補家用，接了好幾份家庭代工，有編織、做聖誕飾品、串珠子，還要挑豬毛。\n\n📜 以下是媽媽做不同工作的狀況：\n串珠子，一小時串20條，\n每條可得2毛；\n挑豬毛，挑一袋20分鐘，\n可得工錢1塊；\n做飾品，做10個30分鐘，\n每個可得1毛。\n\n請問做哪一樣賺最多錢？'
        )
      ],
      password: '串珠子',
      errorMessage: [textMessage('試試看先計算每個物件一小時賺多少？')],
      successMessage: (data) => [
        textMessage('答對啦！\n🀄 恭喜獲得「我家裁縫店」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-裁縫店.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n聽說以前三重附近有幾間肉品加工廠，工廠把豬毛脫下來之後裝袋，請家庭代工把顏色不同的豬毛挑出來，後續做成鬃毛刷！',
          data
        )
      ]
    },
    {
      id: '3',
      category: LevelCategory.Healing,
      type: LevelType.Normal,
      activationCode: '來去看漫畫',
      content: () => [
        textMessage(
          '🕹️ 抵達「白鹿亂撞租書店」\n\n放學後去租書店肯定是最療癒的娛樂之一！村子對面曾有一間漫畫店，總是擠滿了小孩子，如果家長找不到人，都會來這裡看看。\n\n📜猜猜看，1960年代最受歡迎、號稱租書店「三本柱」的是哪些類型的書？從書架上選出三種並按照順序輸入代號吧！'
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/書架.jpg`)
      ],
      password: '136',
      errorMessage: [textMessage('好像不是餒～～')],
      successMessage: (data) => [
        textMessage('答對了！\n趕快進書店看看有沒有感興趣的作品吧。\n\n🀄 恭喜獲得「白鹿亂撞租書店」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-漫畫店.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n這個時期也有許多知名台灣漫畫家，例如葉宏甲的《諸葛四郎》、劉興欽的《阿三哥與大嬸婆》等，也很有趣喔！',
          data
        )
      ]
    },
    {
      id: '4',
      category: LevelCategory.Healing,
      type: LevelType.Normal,
      activationCode: '我要上車',
      content: () => [
        textMessage(
          '🕹️ 抵達「計程車」\n\n1980年代，隨著戰情趨於穩定，部分軍人考量健康或家庭狀況，選擇退伍，另尋頭路。像是村裡的賀大哥，退伍後便開著計程車，載著一個個旅人前往下一個目的地。\n\n📜下圖哪些是1990年代前的計程車樣式？請按照順序輸入代號。'
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/計程車.jpg`)
      ],
      password: '169',
      errorMessage: [textMessage('注意看顏色和車款，答案也不只一個喔～')],
      successMessage: (data) => [
        textMessage('答對啦！別被香港的是士和泰國嘟嘟車騙去啦！\n🀄 恭喜獲得「計程車」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-計程車.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n以前還沒有規定顏色時，大街上可以看到五顏六色的計程車，其中紅色因為喜氣，所以數量特別多。1991年之後，計程車才一律改為更醒目的「小黃」。',
          data
        )
      ]
    },
    {
      id: '5',
      category: LevelCategory.Healing,
      type: LevelType.Normal,
      activationCode: '我要自摸',
      content: () => [
        textMessage(
          '🕹️ 抵達「麻將桌」\n\n牌桌上，四位太太說著不同口音、有不同習慣的打法，但大家同住一個村，總是成就了這一牌局。即使如此，該胡的還是得胡的。\n\n📜此時，一張「三筒🀛」被翻開，三雙眼睛看著贏家攤牌...看看大家的牌面，請問胡牌的是誰呢？'
        )
      ],
      password: '李太太',
      errorMessage: [textMessage('再檢查一次牌！')],
      successMessage: () => [
        textMessage('答對啦，李太太有一筒和二筒，就差這一張三筒。\n🀄 恭喜獲得「麻將桌」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-發.png`)
      ]
    },
    {
      id: '6',
      category: LevelCategory.Healing,
      type: LevelType.Normal,
      activationCode: '好想結婚',
      content: () => [
        textMessage(
          '🕹️ 抵達「徵婚啟事」\n\n軍人的收入穩定，條件不錯，卻因為1952年頒布的「禁婚令」，讓許多年輕士兵結婚夢碎。\n\n📜 看看公布欄上的徵婚啟事，哪一位軍人較有可能和樂小姐共結連理呢？'
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/徵婚啟事.jpg`)
      ],
      password: '倪荖恭',
      errorMessage: [textMessage('不知道「禁婚令」有沒有什麼限制？')],
      successMessage: (data) => [
        textMessage('沒錯，要有一定年紀和軍階，\n才有機會結婚喔！\n\n🀄 恭喜獲得「徵婚啟事」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-鑽戒.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n禁婚令的原意是節省開支、防範間諜，也讓士兵保有反攻回大陸的士氣。不過眼看反攻困難，終於在民國48年放寬標準，下修軍階和年齡限制，才使得軍人有機會成家。',
          data
        )
      ]
    },
    {
      id: '7',
      category: LevelCategory.Healing,
      type: LevelType.Normal,
      activationCode: '來開會囉',
      content: () => [
        textMessage(
          '🕹️ 抵達「打油詩前」\n\n眼前這塊生鏽斑駁的金屬牌子描述了老眷村人在此處的聚會光景。\n\n📜 你可以幫忙解讀這句是什麼嗎：\n大榕樹下葉飄香，\n左鄰右舍休憩場，\n你坐我坐大家坐，\nＯＯＯＯＯＯＯ。'
        )
      ],
      password: '山南海北趣話長',
      errorMessage: [textMessage('想想對聯通常怎麼對～')],
      successMessage: (data) => [
        textMessage('真是火眼金睛！\n🀄 恭喜獲得「打油詩」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-大聲公.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n自治會是村子重要的核心，每年舉辦新年團拜、村民大會，在2000年代面臨拆遷之際，更舉辦蚊子電影院、攝影展等，凝聚村民，一起思考一村的下一步該怎麼走。',
          data
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/關卡7_補充知識.jpg`)
      ]
    },
    {
      id: '8',
      category: LevelCategory.Healing,
      type: LevelType.Normal,
      activationCode: '三二一發射',
      content: () => [
        textMessage(
          '🕹️ 抵達「砲陣地」\n\n在你腳下坑坑巴巴的一圈圓形磚頭，人們來來往往，就是村子裡再普通不過的一塊地。但其實在日治時期，它可是座砲台，用來保護河對岸的總督府呢！\n\n📜 日治時期的一村，一共有幾座砲台呢？（輸入阿拉伯數字）'
        )
      ],
      password: '6',
      errorMessage: [textMessage('再看清楚一點唷～')],
      successMessage: (data) => [
        textMessage('答對了！\n🀄 恭喜獲得「砲陣地」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-砲彈.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n空軍三重一村的眷民背景多為「空軍高砲部隊」，是隸屬於空軍的砲兵！之前的活動上借了國防部的砲台來模擬，彷彿真的看見過去砲台保家衛國的樣子呢。\n\n園區裡共有三座砲座，你有找到嗎？',
          data
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/關卡8_補充知識.jpg`)
      ]
    },
    {
      id: '9',
      category: LevelCategory.Healing,
      type: LevelType.Random,
      activationCode: '麥克風拿來',
      content: {
        [RandomLevelClassified.A]: [
          textMessage(
            '🕹️ 抵達「小涼亭」\n\n眷村裡的老歌，小孩一聽前奏就知道是哪一首。其中深受男女老少喜愛的鄧麗君，也是在隔壁蘆洲的眷村裡長大的呢。\n\n📜 下面會播放一首經典老歌的前奏，你能猜得出來是桌上哪一首歌嗎？'
          ),
          audioMessage(`${LEVEL_SOUND_ASSETS_PREFIX}/關卡9-題目音檔-1.m4a`, 9000)
        ],
        [RandomLevelClassified.B]: [
          textMessage(
            '🕹️ 抵達「小涼亭」\n\n眷村裡的老歌，小孩一聽前奏就知道是哪一首。其中深受男女老少喜愛的鄧麗君，也是在隔壁蘆洲的眷村裡長大的呢。\n\n📜 下面會播放一首經典老歌的前奏，你能猜得出來是桌上哪一首歌嗎？'
          ),
          audioMessage(`${LEVEL_SOUND_ASSETS_PREFIX}/關卡9-題目音檔-2.m4a`, 12000)
        ],
        [RandomLevelClassified.C]: [
          textMessage(
            '🕹️ 抵達「小涼亭」\n\n眷村裡的老歌，小孩一聽前奏就知道是哪一首。其中深受男女老少喜愛的鄧麗君，也是在隔壁蘆洲的眷村裡長大的呢。\n\n📜 下面會播放一首經典老歌的前奏，你能猜得出來是桌上哪一首歌嗎？'
          ),
          audioMessage(`${LEVEL_SOUND_ASSETS_PREFIX}/關卡9-題目音檔-3.m4a`, 12000)
        ],
        [RandomLevelClassified.D]: [
          textMessage(
            '🕹️ 抵達「小涼亭」\n\n眷村裡的老歌，小孩一聽前奏就知道是哪一首。其中深受男女老少喜愛的鄧麗君，也是在隔壁蘆洲的眷村裡長大的呢。\n\n📜 下面會播放一首經典老歌的前奏，你能猜得出來是桌上哪一首歌嗎？'
          ),
          audioMessage(`${LEVEL_SOUND_ASSETS_PREFIX}/關卡9-題目音檔-4.m4a`, 14000)
        ],
        [RandomLevelClassified.E]: [
          textMessage(
            '🕹️ 抵達「小涼亭」\n\n眷村裡的老歌，小孩一聽前奏就知道是哪一首。其中深受男女老少喜愛的鄧麗君，也是在隔壁蘆洲的眷村裡長大的呢。\n\n📜 下面會播放一首經典老歌的前奏，你能猜得出來是桌上哪一首歌嗎？'
          ),
          audioMessage(`${LEVEL_SOUND_ASSETS_PREFIX}/關卡9-題目音檔-5.m4a`, 8000)
        ]
      },
      password: {
        [RandomLevelClassified.A]: '何日君再來',
        [RandomLevelClassified.B]: '月亮代表我的心',
        [RandomLevelClassified.C]: '梅花',
        [RandomLevelClassified.D]: '我只在乎你',
        [RandomLevelClassified.E]: '甜蜜蜜'
      },
      errorMessage: [textMessage('趕快call out你家長輩！')],
      successMessage: (data) => [
        textMessage('答對了！一村K歌之王是你～\n🀄 恭喜獲得「小涼亭」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-炒菜鍋.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n你現在在的地方曾經搭了個鐵皮屋，電視、冰箱、瓦斯爐、伴唱機一應俱全，大家沒事就泡在這裡唱歌、聊天，還把這裡當「共享廚房」，一起下麵吃，熱熱鬧鬧享受相聚的時光。',
          data
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/關卡9_補充知識.jpg`)
      ]
    },
    {
      id: '10',
      category: LevelCategory.Healing,
      type: LevelType.Normal,
      activationCode: '來場三對三',
      content: () => [
        textMessage(
          '🕹️ 抵達「山坡大廣場」\n\n旁邊聽見一位父親正在跟女兒炫耀。\n\n「你爸我啊，可是籃球校隊呢！放學後，還是穿著校隊隊服在這裡找人單挑。\n\n歲月可真是把殺豬刀呀，籃球場不在了，爸爸的肌肉也不在了...」\n\n📜  女兒好奇去翻相簿時，不小心弄掉三張照片，你能幫她按照時間先後順序排列這些照片嗎？（以大寫字母輸入）'
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/老照片.jpg`)
      ],
      password: 'BAC',
      errorMessage: [textMessage('在附近找找說明立牌，應該能找到一些線索。')],
      successMessage: (data) => [
        textMessage('就是這樣～你已經能看破時間的魔法了呢！\n🀄 恭喜獲得「山坡大廣場」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-籃球.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n1968年，台東紅葉少棒隊擊敗世界冠軍日本隊，造成一時轟動，村子裡的孩子也開始打起棒球。籃球在當時也流行，所以這裡也一度是籃球場，後來又因為大人們的需求改成停車場。同一個空間在不同時間是完全不同的樣貌啊～',
          data
        )
      ]
    },
    {
      id: '11',
      category: LevelCategory.Healing,
      type: LevelType.Normal,
      activationCode: '給你的信',
      content: () => [
        textMessage(
          '🕹️ 抵達「大樹將軍」\n\n聽聞眷村要改建，大家都一戶戶搬走了。朱將軍臨走前，一一向鄰居、自治會道別，也寫了一封信給守護家裡四十年的好夥伴。這位好夥伴可是要陪伴一村到最後的呢。\n\n📜 請問將軍的「好夥伴」是誰呢？（四個字）'
        )
      ],
      password: '茄冬老樹',
      errorMessage: [textMessage('看仔細上面的字！')],
      successMessage: (data) => [
        textMessage('沒錯！朱將軍和大樹將軍之間的情誼真讓人動容～\n🀄 恭喜獲得「大樹將軍」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-大樹.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n除了大樹以外，以前的三重還種了許多香花，像是梔子花和秀英花，可以拿來做香水和花茶，賣到對岸的大稻埕；打開鼻子聞一聞，一村裡搞不好還聞得到喔！',
          data
        )
      ]
    },
    {
      id: '12',
      category: LevelCategory.Healing,
      type: LevelType.Normal,
      activationCode: '好想玩水',
      content: () => [
        textMessage(
          '🕹️ 抵達「河邊」\n\n村子和水的連結一直都很深刻。以前還未有堤防時，大家會偷偷去玩水，嚷嚷著要游到對岸的大稻埕去。玩完再到天后宮看歌仔戲、吃香腸，好療癒～\n\n📜 請問一村和大稻埕之間的河是哪一條河呢？'
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/史萊姆過河.jpg`)
      ],
      password: '淡水河',
      errorMessage: [textMessage('這可是雙北之間很重要的河呀～')],
      successMessage: (data) => [
        textMessage('沒錯，這裡就是淡水河岸第一排～\n🀄 恭喜獲得「河邊」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-游泳.png`),
        textMessage(
          '⭐{monsterName}有點惆悵～\n\n為了防止淹大水，現在河邊都是堤防。雖然不會再淹水了，但再也無法從村子後門直接眺望淡水河和對岸的大稻埕。不過大稻埕放煙火時，一村可是私房觀賞區喔！',
          data
        )
      ]
    },
    {
      id: '13',
      category: LevelCategory.Healing,
      type: LevelType.Normal,
      activationCode: '肚子餓了',
      content: () => [
        textMessage(
          '🕹️ 抵達「麵粉變變變」\n\n早期軍人的薪水不多，軍方實施配給來貼補家用。眷補可兌換的物資包含米、麵粉、油、煤炭等，別看東西很簡單，在眷媽們的巧手下，總能化為一道道特色料理。\n\n📜 光是麵粉，就能做出七七四十九種不同變化呢。想想看，哪一道美食「沒有」用到麵粉呢？'
        )
      ],
      password: '酒釀湯圓',
      errorMessage: [textMessage('你確定這個沒有用麵粉嗎？')],
      successMessage: (data) => [
        textMessage('你是料理大師！\n🀄 恭喜獲得「麵粉變變變」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-水餃.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n當時眷補所發的米經常是軍中淘汰的過期米，因此品質不太穩定；據說有眷民在村外吃了好的米飯，才知道原來米這麼香呢。',
          data
        )
      ]
    },
    {
      id: '14',
      category: LevelCategory.Healing,
      type: LevelType.Normal,
      activationCode: '颱風來啦',
      content: () => [
        textMessage(
          '🕹️ 抵達「防洪樓」\n\n颱風來襲，村子淹了一層樓高，不只人要往高處跑，老鼠、蛇也都出來了。幸好有吉普車來救援，還有用來運送物資的小船。河對岸的舅舅還特地涉水送肉乾過來，真是特別美味。\n\n📜 是哪一次颱風造成村子受損嚴重，才蓋起了防洪樓？（三個字）'
        )
      ],
      password: '葛樂禮',
      errorMessage: [textMessage('在附近找找說明立牌，應該能找到一些線索。')],
      successMessage: (data) => [
        textMessage('沒錯，希望再也沒有這麼嚴重的災情><\n🀄 恭喜獲得「防洪樓」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-颱風.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n比起葛樂禮或許已經改善很多，但2001年的納莉颱風還是讓眷民想起了曾經被洪水來過的恐懼。',
          data
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/關卡14_補充知識.jpg`)
      ]
    },
    {
      id: '15',
      category: LevelCategory.Healing,
      type: LevelType.Normal,
      activationCode: '我需要錢',
      content: () => [
        textMessage(
          '🕹️ 抵達「旋轉樓梯」\n\n眷村通常一家人口眾多，除了兼差賺外快之外，標會也是很常見的籌措錢的方式。透過這種小額借貸的機制，會員每期繳費，看誰要用錢就先把大家的會錢拿去。\n\n📜 大家需要用錢的原因百百種，何種比較不可能出現在1970年代的眷村？\n\n① 王媽媽家的小女兒要上學了\n② 李叔叔家要整修擴建\n③ 林阿姨跟風要去買大家樂'
        )
      ],
      password: '3',
      errorMessage: [textMessage('注意事件年代～')],
      successMessage: (data) => [
        textMessage('答對了！大家樂大約是在1980年代才開始流行。\n🀄 恭喜獲得「旋轉樓梯」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-眷村平房.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n說到拿會錢整修房子，整修的年代不同，就可能出現不同樣貌。像是眼前的神秘旋轉樓梯？村子的某處還有防洪小閣樓以及神祕的半層樓呢！去找找看吧。',
          data
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/關卡15_補充知識.jpg`)
      ]
    },
    {
      id: '16',
      category: LevelCategory.Adventure,
      type: LevelType.Normal,
      activationCode: '潛入古物倉庫',
      content: () => [
        textMessage(
          '🕹️抵達「選品室」\n\n選品室，三重一村的進駐團隊，專門蒐集來自世界各地的古物、老件，店裡藏著各種稀奇古怪的東西！\n\n📜在這間老物寶庫也藏著各式各樣的動物朋友，例如鼎鼎大名的歪著脖子的「勝利狗」，找找店裡總共有幾隻？'
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/勝利狗.jpg`)
      ],
      password: '10',
      errorMessage: [textMessage('歪著頭看找不找得到！')],
      successMessage: (data) => [
        textMessage('耶！你把牠們都找到了～\n🀄 恭喜獲得「三重1」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-三重1.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n這隻狗本名Nipper，他的主人在牠離世後因為思念畫下了Nipper生前對留聲機好奇歪著頭聽的樣子，後來被勝利唱機公司買下作為商標。',
          data
        )
      ]
    },
    {
      id: '17',
      category: LevelCategory.Adventure,
      type: LevelType.Normal,
      activationCode: '傳送我到三重',
      content: () => [
        textMessage(
          '🕹️抵達「三重」\n\n三重市位於淡水河西岸、台北盆地中央。民國60-70年代台灣經濟起飛的時期，三重漸漸從農業鄉鎮轉型為工業城市，許多中南部的移民同時湧入。\n\n📜三重的地名，是因為以哪一個地方為中心往外算的第三個平原？'
        )
      ],
      password: '新莊',
      errorMessage: [textMessage('鄰近的行政區')],
      successMessage: (data) => [
        textMessage('沒錯啦，沒想到吧～\n三重地名由來竟然是因為新莊\n🀄 恭喜獲得「三重2」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-三重2.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n現在新莊的頭前庄是第一個平原、二重是第二個平原，所以三重就是第三個平原！',
          data
        )
      ]
    },
    {
      id: '18',
      category: LevelCategory.Adventure,
      type: LevelType.Normal,
      activationCode: '前進三重市場',
      content: () => [
        textMessage(
          '🕹️抵達「三重大市場」\n\n眼看三重大市場未來將遷移，為了留下些什麼，妍伶開始相揪一群大人小孩，從走訪各地的市場出發，看看其他市場存在著什麼故事。\n\n📜小朋友們紛紛畫出做魚丸的步驟，請看圖找線索，四個步驟的正確排序是什麼？\n\nA 拌勻肉末與調味 B 烹煮魚丸 \nC 絞碎魚肉 D 冷藏定型魚丸'
        )
      ],
      password: 'CADB',
      errorMessage: [textMessage('仔細看小朋友給你的提示')],
      successMessage: () => [
        textMessage('不錯唷，你已經跟上這群逛市場小朋友的步伐了\n🀄 恭喜獲得「三重3」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-三重3.png`)
      ]
    },
    {
      id: '19',
      category: LevelCategory.Adventure,
      type: LevelType.Normal,
      activationCode: '遊歷歐洲古物',
      content: () => [
        textMessage(
          '🕹️抵達「週四待在家」\n\n週四待在家是分享二手歐洲傢俱的工作室，也鑽研老傢俱的修復。\n\n📜台灣老屋咖啡廳很常見到老裁縫機改造成擺設茶几。這裡也有一個專屬於法國老奶奶、很受現代人歡迎的擺設家具，找找看是什麼？'
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/bonjour.jpg`)
      ],
      password: '針線盒',
      errorMessage: [textMessage('3個字')],
      successMessage: () => [
        textMessage('很識貨喔！就是這款美麗的針線盒\n🀄 恭喜獲得「三重4」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-三重4.png`)
      ]
    },
    {
      id: '20',
      category: LevelCategory.Adventure,
      type: LevelType.Normal,
      activationCode: '穿越舊時新莊',
      content: () => [
        textMessage(
          '🕹️抵達「新莊」\n\n新莊老街，平常最為人知的是廟街夜市，然而細細探索隱身於熱鬧的衣飾店家背後的，是曾經牽動著北台灣的發展與故事。\n\n📜新莊老街長大的小孩，長輩會給他吃什麼保佑平安？'
        )
      ],
      password: '鹹光餅',
      errorMessage: [textMessage('就那個圓圓的東西！')],
      successMessage: () => [
        textMessage('沒錯！鹹光餅可是有新莊貝果之稱耶\n🀄 恭喜獲得「新莊」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-新莊1.png`)
      ]
    },
    {
      id: '21',
      category: LevelCategory.Adventure,
      type: LevelType.Normal,
      activationCode: '傳送我到新店',
      content: () => [
        textMessage(
          '🕹️抵達「新店」\n\n由暗坑文化工作室串連，以軒社、泰雅族狩獵的意象結合新店與烏來的開墾故事，一起認識早期原漢衝突的歷史。\n\n📜漢人尋求神明庇佑，組成的軒社，是何種音樂類型？'
        )
      ],
      password: '北管',
      errorMessage: [textMessage('2個字')],
      successMessage: (data) => [
        textMessage('行家喔，大家很常會搞不清楚耶！\n🀄 恭喜獲得「新店」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-新店1.png`),
        textMessage(
          '⭐{monsterName}音樂小教室！\n\n你是不是常常南北管傻傻分不清？其實我們常聽到的婚喪喜慶、廟會活動都是以「打擊樂器」為主的北管唷！南管則是以琵琶等弦樂器為主，樂風更婉轉悠揚。',
          data
        )
      ]
    },
    {
      id: '22',
      category: LevelCategory.Adventure,
      type: LevelType.Normal,
      activationCode: '樹林站到了',
      content: () => [
        textMessage(
          '🕹️抵達「樹林」\n\n青農邱昌宏以維護生態平衡、保護大自然為理念，在樹林區北大柑園樂活農園從事友善耕作近5年，也和小朋友一起認識食農及環境教育。\n\n📜 請填空：昌宏近幾年推廣種植＿＿，除了耐乾耐旱可對抗氣候變遷，也長得像珍珠，歷史上還因此有＿＿明珠的成語。'
        )
      ],
      password: '薏苡',
      errorMessage: [textMessage('提示：兩個唸起來別人會聽不懂的字XD')],
      successMessage: () => [
        textMessage('答對了！\n🀄 恭喜獲得「樹林」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-樹林1.png`)
      ]
    },
    {
      id: '23',
      category: LevelCategory.Adventure,
      type: LevelType.Normal,
      activationCode: '下一站汐止',
      content: () => [
        textMessage(
          '🕹️抵達「汐止」\n\n走訪基隆河、北峰溪流域，發現記憶中的茶、植物染、稻米跟煤礦，串起汐止、內湖、東湖、南港互相交織的故事。\n\n📜結合環境與創意的DIY種子項鍊，請問是由什麼製成的？'
        )
      ],
      password: '沙盒樹單片外殼',
      errorMessage: [textMessage('7個字')],
      successMessage: () => [
        textMessage('答對了！\n🀄 恭喜獲得「汐止」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-汐止1.png`)
      ]
    },
    {
      id: '24',
      category: LevelCategory.Adventure,
      type: LevelType.Normal,
      activationCode: '傳送我到土城',
      content: () => [
        textMessage(
          '🕹️抵達「土城」\n\n在土城清化里住著一群銀髮導演，他們用影像記錄社區，用料理訴說山林。\n\n📜請觀賞銀髮導演第一組的影片，找出裡面總共提及到＿種花？'
        )
      ],
      password: '3',
      errorMessage: [textMessage('你確定你看到的花都是花嗎～')],
      successMessage: (data) => [
        textMessage('答對了！是櫻花、油桐花、野薑花，共3種～\n🀄 恭喜獲得「土城」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-土城1.png`),
        textMessage(
          '⭐{monsterName}覺得療癒～\n\n看到長輩們拍下的土城山裡採集、料理，也豪想吃啊～\n\n綠啄花是鳥不是花喔，有沒有差點被騙',
          data
        )
      ]
    },
    {
      id: '25',
      category: LevelCategory.Adventure,
      type: LevelType.Normal,
      activationCode: '潛入泰山竹林',
      content: () => [
        textMessage(
          '🕹️抵達「泰山竹林」\n\n泰山早年盛產竹子，竹編是當地傳統技藝，有竹編專長的阿員姊將傳統竹編文化融入長輩的手作休閒中。\n\n📜阿員姊在編織竹子的時候，都會一邊噴水在竹子上，你猜得出是為什麼嗎？\n\nA 加水竹子可以保持翠綠色\nB 保持溼度比較柔軟好凹折\nC 可以讓竹子上的小蟲子死掉'
        )
      ],
      password: 'B',
      errorMessage: [textMessage('你確定？你凹凹看竹子')],
      successMessage: () => [
        textMessage('答對了！竹編的不容易就因為竹子本身很硬啦～\n🀄 恭喜獲得「泰山1」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-泰山1.png`)
      ]
    },
    {
      id: '26',
      category: LevelCategory.Adventure,
      type: LevelType.Normal,
      activationCode: '到舊時代泰山',
      content: () => [
        textMessage(
          '🕹️抵達「泰山」\n\n1967年跨國玩具公司Mattel與台商合資在泰山設立「美寧工廠」，是公司在亞洲的第一間代工廠，吸引大批泰山人返鄉就業，廠裡的女性員工們並有著「美寧姑娘」的稱號。\n\n📜 最近《戲說新北》劇組想來徵選美寧娃娃演出下一集，故事是關於新北的客家人故事，請問哪位娃娃會雀屏中選？'
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/戲說新北.jpg`)
      ],
      password: '蘭妹',
      errorMessage: [textMessage('找找看穿客家服飾的！')],
      successMessage: () => [
        textMessage('獨具慧眼！選到的娃娃都是最上鏡的\n🀄 恭喜獲得「泰山2」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-泰山2.png`)
      ]
    },
    {
      id: '27',
      category: LevelCategory.Adventure,
      type: LevelType.Random,
      activationCode: '出發平溪山裡',
      content: {
        [RandomLevelClassified.A]: [
          textMessage(
            '🕹️抵達「平溪」\n\n同為礦工後代的阿賢和青農莉恩，即將帶你探訪平溪秘境，以及品嚐最新鮮的在地冠軍農產！\n\n📜今天半夜跟著莉恩去採收，黑漆媽烏的，你認得出你們採收到什麼嗎？'
          ),
          imageMessage(`${LEVEL_ASSETS_PREFIX}/綠竹筍.jpg`)
        ],
        [RandomLevelClassified.B]: [
          textMessage(
            '🕹️抵達「平溪」\n\n同為礦工後代的阿賢和青農莉恩，即將帶你探訪平溪秘境，以及品嚐最新鮮的在地冠軍農產！\n\n📜今天半夜跟著莉恩去採收，黑漆媽烏的，你認得出你們採收到什麼嗎？'
          ),
          imageMessage(`${LEVEL_ASSETS_PREFIX}/山藥.jpg`)
        ]
      },
      password: {
        [RandomLevelClassified.A]: '綠竹筍',
        [RandomLevelClassified.B]: '山藥'
      },
      errorMessage: [textMessage('也許在攤位上會有作物本人！')],
      successMessage: (data) => [
        textMessage('答對了！你是農產專家吧\n🀄 恭喜獲得「平溪1」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-平溪1.png`),
        textMessage('⭐{monsterName}農產教室\n\n新北有健康三寶：山藥、甘藷、綠竹筍！莉恩和阿公就包辦了兩種作物！', data)
      ]
    },
    {
      id: '28',
      category: LevelCategory.Adventure,
      type: LevelType.Normal,
      activationCode: '我要去菁桐',
      content: () => [
        textMessage(
          '🕹️抵達「平溪菁桐」\n\n早年以盛產煤礦聞名的平溪，擁有濃厚的礦業文化。\n\n📜 當地常聽到的俗語：「水流東，某飼尪」是指什麼意思呢？\n\nA. 女生嫁到夫家，像潑出去的水\nB. 母系社會，太太才是一家之主\nC. 老婆一個人需要撐起一個家'
        )
      ],
      password: 'C',
      errorMessage: [textMessage('是不是有地方有寫？')],
      successMessage: (data) => [
        textMessage('答對了！\n🀄 恭喜獲得「平溪2」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-平溪2.png`),
        textMessage(
          '⭐{monsterName}要補充！\n\n在礦工家庭裡，男性入礦坑難免遭遇礦災，就算得以倖存，晚年也難逃矽肺症纏身，此時女性除了相夫教子，還必須扛起一整個家的經濟重擔。',
          data
        )
      ]
    },
    {
      id: '29',
      category: LevelCategory.Adventure,
      type: LevelType.Normal,
      activationCode: '我要去板橋',
      content: (data) => [
        textMessage(
          '🕹️抵達「板橋」\n\n2022年板橋區是全台人口密度第五高、人口最多的行政區。生活的外在壓力與內在焦慮常讓現代人忘記呼吸，覺察自己的情緒。\n\n📜 {monsterName}要在短時間內幫助你破關，壓力很大，剛剛測了心情溫度計，根據分數你應該怎麼做？\n\nA. 提醒朋友都不要打擾他沈澱心情\nB. 多花些時間聽他聊聊近況\nC. 直接為他安排醫院診間',
          data
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/心情溫度計.jpg`)
      ],
      password: 'B',
      errorMessage: [textMessage('再仔細算算總分！')],
      successMessage: (data) => [
        textMessage('沒錯，先不要管破關了～ 停下來跟{monsterName}聊聊吧\n🀄 恭喜獲得「板橋」麻將', data),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-板橋1.png`),
        textMessage('🥺{monsterName}覺得很港動', data)
      ]
    },
    {
      id: '30',
      category: LevelCategory.Adventure,
      type: LevelType.Normal,
      activationCode: '永和站到了',
      content: () => [
        textMessage(
          '🕹️抵達「永和」\n\n動物福利行動藝術家林宗北，走遍熱鬧的永和、低調的樹林，用咖啡跟美食認識了許多同樣對動物有愛的店家，也結交了一群動物朋友。\n\n📜 在路上遇到一隻走失的轉轉獸，急著幫牠找到失散的主人，哪些店家可以幫到你（複選題）？\n\nA 貓隱村 Cat Cafe\nB 森氏咖啡所\nC 明義堂香舖\nD 菲瑪咖啡'
        ),
        imageMessage(`${LEVEL_ASSETS_PREFIX}/走失的轉轉獸.jpg`)
      ],
      password: 'AC',
      errorMessage: [textMessage('不對啦，那間上次去沒有中途的服務啊～')],
      successMessage: () => [
        textMessage('哇～你動物達人欸！\n🀄 恭喜獲得「永和」麻將'),
        imageMessage(`${LEVEL_MAHJONG_ASSETS_PREFIX}/LINE關卡圖片_麻將-永和1.png`)
      ]
    }
  ],
  cards: {
    [Era.THE1950]: {
      [CardType.Chance]: {
        isCanGetAward: true,
        title: '1954年 三重一村建成',
        subtitle: '轉生到空軍防砲司令部少將家中，入住特級眷舍',
        description:
          '一村的眷舍分為特、甲、乙、丙四個等級，特級是上校以上才能入住，其餘則按照眷屬人數進行分配。\n\n在擴建之前，一般眷舍12坪要擠四個人以上，特級則是擁有自己的獨棟和庭園；好奇的話，就到16號眷舍看看吧。',
        image: '機會1950.jpg'
      },
      [CardType.Destiny]: {
        isCanGetAward: true,
        title: '1954年 三重一村建成',
        subtitle: '轉生到眷村裡，入住乙級眷舍，跟其他小孩打打鬧鬧很開心',
        description:
          '一村的眷舍分為特、甲、乙、丙四個等級，特級是上校以上才能入住，其餘則按照眷屬人數進行分配。\n\n在擴建之前，一般眷舍12坪要擠四個人以上，還要跟別戶共用廁所和水井。不過也是這樣大家才會關係這麼緊密吧！',
        image: '命運1950.jpg'
      }
    },
    [Era.THE1960]: {
      [CardType.Chance]: {
        isCanGetAward: false,
        title: '1963年 葛樂禮颱風來襲',
        subtitle: '沙發泡水，都長出香菇了',
        description:
          '颱風來淹水怎麼辦？臺北盆地體質易淹水，日治時期就有多次淹水紀錄。經歷葛樂禮強颱等造成的嚴重災情（三重蘆洲成為澤國，最嚴重還淹沒一層樓）。\n\n民國50年代開始執行「台北防洪計畫」，蓋起二重疏洪道，以及幾乎包圍了淡水河的堤防等水利設施，但現代人因此被堤防隔開了與河水的距離。',
        image: '機會1960.jpg'
      },
      [CardType.Destiny]: {
        isCanGetAward: true,
        title: '1963年 葛樂禮颱風來襲',
        subtitle: '不及格考卷被沖走，不幸中的大幸',
        description:
          '颱風來淹水怎麼辦？臺北盆地體質易淹水，日治時期就有多次淹水紀錄。經歷葛樂禮強颱等造成的嚴重災情（三重蘆洲成為澤國，最嚴重還淹沒一層樓）。\n\n民國50年代開始執行「台北防洪計畫」，蓋起二重疏洪道，以及幾乎包圍了淡水河的堤防等水利設施，但現代人因此被堤防隔開了與河水的距離。',
        image: '命運1960.jpg'
      }
    },
    [Era.THE1970]: {
      [CardType.Chance]: {
        isCanGetAward: false,
        title: '1970年 退出聯合國 ',
        subtitle: '初戀移民去美國，好難過',
        description:
          '1970年代歷經退出聯合國、中美斷交大事件，台海局勢動盪不安。因為美援對台灣影響重大，人們又大多崇拜美國，此時掀起一波移民潮。\n\n部分外省家族因為有了「移民」到台灣的經歷，對於再次移民不排斥，為追求更安穩的生活，也選擇到美國落地生根。',
        image: '機會1970.jpg'
      },
      [CardType.Destiny]: {
        isCanGetAward: true,
        title: '1979年 八二三砲戰結束',
        subtitle: '家人終於回家，好開心',
        description:
          '八二三砲戰對許多人也許只是課本上的一個章節，但對一村的村民卻是一場關乎前線家人生死的戰役。村子裡的人常常聽收音機，只希望收到前線平安的消息。\n\n1979年美國和中華民國斷交，與中國建交，砲擊聲才終於消停。這也是國共之間最後一次大型軍事衝突。',
        image: '命運1970.jpg'
      }
    },
    [Era.THE1980]: {
      [CardType.Chance]: {
        isCanGetAward: true,
        title: '1987年 開放兩岸探親',
        subtitle: '爸爸和原本的家人團圓，流下感動的淚水',
        description: '1987年解嚴之後，也開放回中國探親，許多隨國民政府來台的老兵，在近四十年後，才終於有了返鄉的機會。',
        image: '機會1980.jpg'
      },
      [CardType.Destiny]: {
        isCanGetAward: false,
        title: '1987年 開放兩岸探親',
        subtitle: '爸爸的老家已經不在了，不過回台之後還有我們在等他',
        description: '1987年解嚴之後，也開放回中國探親，許多隨國民政府來台的老兵，在近四十年後，才終於有了返鄉的機會。',
        image: '命運1980.jpg'
      }
    },
    [Era.THE1990]: {
      [CardType.Chance]: {
        isCanGetAward: false,
        title: '1995年 鄧麗君過世',
        subtitle: '身為歌迷，心痛欲絕',
        description:
          '1990年代是個充滿改變的時期。解嚴之後，解除動員戡亂時期、解除黨禁報禁、開放首長民選，連台股史上最大漲點也在這個時期。不過對許多軍中弟兄而言，「軍中女神」鄧麗君在泰國病逝的消息，或許才是最痛徹心扉的吧。',
        image: '機會1990.jpg'
      },
      [CardType.Destiny]: {
        isCanGetAward: false,
        title: '1990年 台股暴跌',
        subtitle: '從12682點一路狂跌至2485點，泡泡破滅',
        description:
          '1990年代是個充滿改變的時期。解嚴之後，解除動員戡亂時期、解除黨禁報禁、開放首長民選，連台股史上最大漲點也在這個時期。不過對許多軍中弟兄而言，「軍中女神」鄧麗君在泰國病逝的消息，或許才是最痛徹心扉的吧。',
        image: '命運1990.jpg'
      }
    },
    [Era.THE2000]: {
      [CardType.Chance]: {
        isCanGetAward: true,
        title: '2005年 一村保存行動',
        subtitle: '趁機整理出好多老照片，真懷念',
        description:
          '保存運動對眷戶們而言，也是個重新整理、紀錄過往眷村生活機會。眾人齊力找出老照片、累積口述歷史，編纂回憶錄與影像展；舉辦全台首創的「工作假期」，進行文物整理建檔和房舍修復。\n\n一切的累積讓一村作為文史建築，終於得以被保留，成為今天大家能來自由探索的異世界空間。',
        image: '機會2000.jpg'
      },
      [CardType.Destiny]: {
        isCanGetAward: true,
        title: '2004年 一村保存行動',
        subtitle: '拿到眷民合力編纂的「回憶錄」，和無緣的初戀重新連繫上',
        description:
          '保存運動對眷戶們而言，也是個重新整理、紀錄過往眷村生活機會。眾人齊力找出老照片、累積口述歷史，編纂回憶錄與影像展；舉辦全台首創的「工作假期」，進行文物整理建檔和房舍修復。\n\n一切的累積讓一村作為文史建築，終於得以被保留，成為今天大家能來自由探索的異世界空間。',
        image: '命運2000.jpg'
      }
    }
  }
};

export const levelsCategoryObj = groupBy(localGlobalData.levels, 'category');

export const levelIdToLevelMap = localGlobalData.levels.reduce((map, level) => {
  map.set(level.id, level);
  return map;
}, new Map<(typeof localGlobalData.levels)[number]['id'], (typeof localGlobalData.levels)[number]>());

export const activationCodeToLevelMap = localGlobalData.levels.reduce((map, level) => {
  map.set(level.activationCode, level);
  return map;
}, new Map<(typeof localGlobalData.levels)[number]['activationCode'], (typeof localGlobalData.levels)[number]>());

export const isPasswordCorrect = (currentLevelId: string, password: string, classified?: RandomLevelClassified) => {
  const level = levelIdToLevelMap.get(currentLevelId);
  if (!level) return false;

  if (level.type === LevelType.Normal) {
    return level.password === password ? true : false;
  }

  if (level.type === LevelType.Random && classified) {
    return level.password[classified] === password ? true : false;
  }

  return false;
};

export default localGlobalData;
