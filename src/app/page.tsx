'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

import localGlobalData, { levelsCategoryObj } from '@/common/localGlobalData';
import { CardType, Era, LevelCategory, MonsterType, UserCardsRecord } from '@/common/types';
import AppNotAvailable from '@/web/assets/app-not-available.svg';
import AppTitle from '@/web/assets/app-title.svg';
import ChanceDestinyCircle from '@/web/assets/chance-destiny-circle.svg';
import Era1950 from '@/web/assets/era-1950.svg?url';
import Era1960 from '@/web/assets/era-1960.svg?url';
import Era1970 from '@/web/assets/era-1970.svg?url';
import Era1980 from '@/web/assets/era-1980.svg?url';
import Era1990 from '@/web/assets/era-1990.svg?url';
import Era2000 from '@/web/assets/era-2000.svg?url';
import GiftIcon from '@/web/assets/icon-gift.svg';
import LevelTitle1 from '@/web/assets/level-title-1.svg';
import LevelTitle2 from '@/web/assets/level-title-2.svg';
import LevelTitle3 from '@/web/assets/level-title-3.svg';
import MahjongBlueBack from '@/web/assets/mahjong-blind-box-blue.svg?url';
import MahjongBrownBack from '@/web/assets/mahjong-blind-box-brown.svg?url';
import MahjongRedBack from '@/web/assets/mahjong-blind-box-red.svg?url';
import OthersLevelMahjong from '@/web/assets/mahjongs/level-others.svg?url';
import Level1Mahjong from '@/web/assets/mahjongs/level1.svg?url';
import Level2Mahjong from '@/web/assets/mahjongs/level2.svg?url';
import Level3Mahjong from '@/web/assets/mahjongs/level3.svg?url';
import Level4Mahjong from '@/web/assets/mahjongs/level4.svg?url';
import Level5Mahjong from '@/web/assets/mahjongs/level5.svg?url';
import Level6Mahjong from '@/web/assets/mahjongs/level6.svg?url';
import Level7Mahjong from '@/web/assets/mahjongs/level7.svg?url';
import Level8Mahjong from '@/web/assets/mahjongs/level8.svg?url';
import Level9Mahjong from '@/web/assets/mahjongs/level9.svg?url';
import Level10Mahjong from '@/web/assets/mahjongs/level10.svg?url';
import Level11Mahjong from '@/web/assets/mahjongs/level11.svg?url';
import Level12Mahjong from '@/web/assets/mahjongs/level12.svg?url';
import Level13Mahjong from '@/web/assets/mahjongs/level13.svg?url';
import Level14Mahjong from '@/web/assets/mahjongs/level14.svg?url';
import Level15Mahjong from '@/web/assets/mahjongs/level15.svg?url';
import Level16Mahjong from '@/web/assets/mahjongs/level16.svg?url';
import Level17Mahjong from '@/web/assets/mahjongs/level17.svg?url';
import Level18Mahjong from '@/web/assets/mahjongs/level18.svg?url';
import Level19Mahjong from '@/web/assets/mahjongs/level19.svg?url';
import Level20Mahjong from '@/web/assets/mahjongs/level20.svg?url';
import Level21Mahjong from '@/web/assets/mahjongs/level21.svg?url';
import Level22Mahjong from '@/web/assets/mahjongs/level22.svg?url';
import Level23Mahjong from '@/web/assets/mahjongs/level23.svg?url';
import Level24Mahjong from '@/web/assets/mahjongs/level24.svg?url';
import Level25Mahjong from '@/web/assets/mahjongs/level25.svg?url';
import Level26Mahjong from '@/web/assets/mahjongs/level26.svg?url';
import Level27Mahjong from '@/web/assets/mahjongs/level27.svg?url';
import Level28Mahjong from '@/web/assets/mahjongs/level28.svg?url';
import Level29Mahjong from '@/web/assets/mahjongs/level29.svg?url';
import Level30Mahjong from '@/web/assets/mahjongs/level30.svg?url';
import Button from '@/web/components/Button';
import ProcessBar from '@/web/components/ProcessBar';
import Welcome from '@/web/components/Sections/Welcome';

import Announce from '../components/Announce';
import CardModal from '../components/CardModal';
import MonsterImage from '../components/MonsterImage';
import RedeemModal from '../components/RedeemModal';
import WindowModal from '../components/WindowModal';
import { authWithLine, getDbGlobalData, getUserData, updateUserData } from '../firebase';
import { getIDToken, getLiffUserId, initLiff, sendUserInitMessages } from '../liff';
import { dbGlobalDataAtom, userDataAtom } from '../store';

const mahjongImageMap: Record<string, string> = {
  '1': Level1Mahjong.src,
  '2': Level2Mahjong.src,
  '3': Level3Mahjong.src,
  '4': Level4Mahjong.src,
  '5': Level5Mahjong.src,
  '6': Level6Mahjong.src,
  '7': Level7Mahjong.src,
  '8': Level8Mahjong.src,
  '9': Level9Mahjong.src,
  '10': Level10Mahjong.src,
  '11': Level11Mahjong.src,
  '12': Level12Mahjong.src,
  '13': Level13Mahjong.src,
  '14': Level14Mahjong.src,
  '15': Level15Mahjong.src,
  '16': Level16Mahjong.src,
  '17': Level17Mahjong.src,
  '18': Level18Mahjong.src,
  '19': Level19Mahjong.src,
  '20': Level20Mahjong.src,
  '21': Level21Mahjong.src,
  '22': Level22Mahjong.src,
  '23': Level23Mahjong.src,
  '24': Level24Mahjong.src,
  '25': Level25Mahjong.src,
  '26': Level26Mahjong.src,
  '27': Level27Mahjong.src,
  '28': Level28Mahjong.src,
  '29': Level29Mahjong.src,
  '30': Level30Mahjong.src,
  others: OthersLevelMahjong.src
};

export default function Home() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [isSysInit, setIsSysInit] = useState(false);
  const [isShowMyMonster, setIsShowMyMonster] = useState(true);

  const [dbGlobalData, setDbGlobalData] = useAtom(dbGlobalDataAtom);
  const [userData, setUserData] = useAtom(userDataAtom);

  useEffect(() => {
    async function initSystem() {
      await initLiff();
      const idToken = await getIDToken();
      if (!idToken) throw new Error('ID token not found');
      await authWithLine(idToken);
      const userId = await getLiffUserId();
      // await initTestData(userId);
      const [userData, dbGlobalData] = await Promise.all([getUserData(userId), getDbGlobalData()]);
      setUserData(userData);
      if (dbGlobalData) setDbGlobalData(dbGlobalData);
      setIsSysInit(true);
    }

    try {
      initSystem();
    } catch (error) {
      console.error(error);
    }
    // only run only from init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCloseCardModal = useCallback(() => {
    if (userData?.isFirstDrawnCard) {
      setIsCardModalOpen(false);
    }
  }, [userData]);

  const cardRecord: UserCardsRecord[Era] = useMemo(() => {
    if (userData && dbGlobalData?.currentEra) {
      return userData.cards[dbGlobalData.currentEra];
    }

    return { isDrawn: false, type: null, isGetAward: false };
  }, [userData, dbGlobalData?.currentEra]);

  const eraImageUrl = useMemo(() => {
    switch (dbGlobalData?.currentEra) {
      case Era.THE1950:
        return Era1950.src;
      case Era.THE1960:
        return Era1960.src;
      case Era.THE1970:
        return Era1970.src;
      case Era.THE1980:
        return Era1980.src;
      case Era.THE1990:
        return Era1990.src;
      case Era.THE2000:
        return Era2000.src;
      default:
        null;
    }
  }, [dbGlobalData?.currentEra]);

  const onDrawCard = useCallback(
    (type: CardType) => {
      // get number 1 ~ 10

      if (dbGlobalData?.currentEra && userData) {
        const { isCanGetAward } = localGlobalData.cards[dbGlobalData.currentEra][type];

        setUserData((userData) => {
          if (userData) {
            return {
              ...userData,
              isFirstDrawnCard: true,
              cards: {
                ...userData.cards,
                [dbGlobalData.currentEra]: {
                  isDrawn: true,
                  type,
                  isGetAward: isCanGetAward
                }
              }
            };
          }
          return null;
        });

        updateUserData(userData.userId, {
          ...userData,
          isFirstDrawnCard: true,
          cards: {
            ...userData.cards,
            [dbGlobalData.currentEra]: {
              isDrawn: true,
              type,
              isGetAward: isCanGetAward
            }
          }
        });
      } else {
        alert('Drawn Card User or Global Data Error');
      }
    },
    [userData, dbGlobalData?.currentEra, setUserData]
  );

  const onUserInit = useCallback(
    (monsterType: MonsterType, monsterName: string) => {
      console.log(monsterType, monsterName, userData);
      if (userData) {
        setUserData((userData) => {
          if (userData) {
            return {
              ...userData,
              monsterType,
              monsterName,
              isInit: true
            };
          }
          return null;
        });
        sendUserInitMessages(userData.userName, userData.monsterType);
        setIsCardModalOpen(true);
        updateUserData(userData.userId, { ...userData, monsterType, monsterName, isInit: true });
      } else {
        alert('User Data Error');
      }
    },
    [userData, setUserData]
  );

  const othersLevelMahjongCount = useMemo(() => {
    if (!userData) return 0;
    return Object.values(userData.cards).filter((card) => card.isGetAward).length + userData.npcPoints;
  }, [userData]);

  if (!isSysInit || !userData) {
    return null;
  }

  return (
    <>
      <main className="mx-auto flex min-h-screen w-full max-w-[450px] flex-col bg-gray2">
        <AppTitle className="sticky top-0 z-50 w-full" />
        <section className="h-[25px]"></section>

        {!dbGlobalData?.isWebAvailable && (
          <Announce
            image={<AppNotAvailable className="h-full" />}
            content={['轉生新手村全員蓄電中', '請於 9/29.30 15:00-21:00 到訪']}
            button={{
              text: '先去逛逛網站',
              isShowArrow: true,
              onClick: () => window.open('https://seeyouinvillage-ntpc.xyz/', '_blank', 'noopener, noreferrer')
            }}
            className="text-center"
          />
        )}

        {dbGlobalData?.isWebAvailable && !userData.isInit && <Welcome onFinished={onUserInit} />}

        {dbGlobalData?.isWebAvailable && userData.isInit && (
          <>
            <nav className="fixed bottom-[10px] left-[10px]">
              <button
                className="shadow-button relative flex h-[92px] w-[92px] items-center justify-center rounded-full"
                onClick={() => setIsCardModalOpen(true)}
              >
                <ChanceDestinyCircle className="absolute z-[-1] h-full" />
                <ChanceDestinyCircle className="absolute z-[-1] h-full animate-ping" />
                <div className="inline-flex h-[48px] w-[48px] flex-col items-center rounded-full border border-dark bg-yellow">
                  <div className="text-[16px] font-bold">抽</div>
                  <div className="text-[12px] tracking-[0.6px] text-dark">59:40</div>
                </div>
                {eraImageUrl && (
                  <Image
                    src={eraImageUrl}
                    alt="era"
                    height={22}
                    width={55}
                    className="absolute top-0 translate-y-[-90%]"
                  />
                )}
              </button>
            </nav>
            <nav className="fixed bottom-[10px] right-[10px] flex flex-col gap-[8px]">
              <button
                onClick={() => setIsRedeemModalOpen(true)}
                className={clsx(
                  'shadow-button flex h-[40px] w-[40px] items-center justify-center rounded-full bg-yellow',
                  {
                    'bg-yellow': !userData.isRedeemGift,
                    'bg-gray2': userData.isRedeemGift
                  }
                )}
              >
                <GiftIcon
                  className={clsx('h-[20px]', {
                    'text-dark': !userData.isRedeemGift,
                    'text-gray': userData.isRedeemGift
                  })}
                />
              </button>
              <button
                onClick={() => setIsTipModalOpen(true)}
                className="shadow-button flex h-[40px] w-[40px] items-center justify-center rounded-full bg-orange"
              >
                <span className="text-[32px] font-bold">?</span>
              </button>
            </nav>

            <section id="user-info" className="flex w-full flex-col gap-[20px] px-[15px] pb-[90px] pt-[16px]">
              <div className="flex w-full items-center justify-center">
                <ProcessBar status={userData.monsterStage} />
              </div>
              <div className="inline-flex w-full items-center justify-center gap-[25px]">
                <Button onClick={() => setIsShowMyMonster(true)}>我的轉轉獸</Button>
                <Button className="bg-orange" onClick={() => setIsShowMyMonster(false)}>
                  我的關卡紀錄
                </Button>
              </div>
              <div className={isShowMyMonster ? 'block' : 'hidden'}>
                <MonsterImage type={userData.monsterType} stage={userData.monsterStage} />
              </div>
              <div className={!isShowMyMonster ? 'block' : 'hidden'}>
                <div className="flex flex-col gap-[50px] rounded-[10px] border border-dark bg-white px-[16px] py-[26px]">
                  {/* repetitive style */}
                  <section className="flex flex-col gap-[20px]">
                    <h1 className="mx-auto">
                      <LevelTitle1 className="h-[25px]" />
                    </h1>
                    <div className="mx-auto inline-grid w-fit grid-cols-5 gap-[8px]">
                      {levelsCategoryObj[LevelCategory.Healing].map((item, index) => {
                        const url = userData.levels[item.id].isPassed ? mahjongImageMap[item.id] : MahjongBlueBack.src;
                        return <Image key={index} src={url} alt={`level${item.id} mahjong`} width={54} height={65} />;
                      })}
                    </div>
                  </section>
                  {/* repetitive style */}
                  <section className="flex flex-col gap-[20px]">
                    <h1 className="mx-auto">
                      <LevelTitle2 className="h-[25px]" />
                    </h1>
                    <div className="mx-auto inline-grid w-fit grid-cols-5 gap-[8px]">
                      {levelsCategoryObj[LevelCategory.Adventure].map((item, index) => {
                        const url = userData.levels[item.id].isPassed ? mahjongImageMap[item.id] : MahjongRedBack.src;
                        return <Image key={index} src={url} alt={`level${item.id} mahjong`} width={54} height={65} />;
                      })}
                    </div>
                  </section>
                  {/* repetitive style */}
                  <section className="flex flex-col gap-[20px]">
                    <h1 className="mx-auto">
                      <LevelTitle3 className="h-[25px]" />
                    </h1>
                    <p className="text-[12px] tracking-[0.6px]">
                      除了透過抽機會命運有機會破關，也記得注意走在村子裡的特殊角色，他們也有機會協助你獲得遇眷你的麻將！
                    </p>
                    <div className="mx-auto inline-grid w-fit grid-cols-5 gap-[8px]">
                      {[1, 2, 3, 4, 5].map((number) => {
                        const url =
                          othersLevelMahjongCount >= number ? mahjongImageMap['others'] : MahjongBrownBack.src;
                        return <Image key={number} src={url} alt="others level mahjong" width={54} height={65} />;
                      })}
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <CardModal isOpen={isCardModalOpen} onClose={onCloseCardModal} cardStatus={cardRecord} onDrawCard={onDrawCard} />
      <WindowModal
        isOpen={isTipModalOpen}
        onClose={() => setIsTipModalOpen(false)}
        title={{
          text: '新手村小提示',
          className: 'bg-orange'
        }}
      >
        <div className="text-[16px] leading-[24px] tracking-[0.8px]">
          關卡藏在整個新手村裡，四處找找注意「遊戲手把」！
          <br />
          <br />
          隨時也可能出現神秘角色或是驚動全村的大事件！
          <br />
          <br />
          如果真的找不到某個關卡，或許身旁的村民可以給你一些線索…
        </div>
        <button
          onClick={() => setIsTipModalOpen(false)}
          className="w-full rounded-[5px] border-[1px] border-dark bg-orange2 px-[10px] py-[8px]"
        >
          <div className="text-[20px] font-bold leading-[24px] tracking-[2px]">我知道了</div>
        </button>
      </WindowModal>
      <RedeemModal isOpen={isRedeemModalOpen} onClose={() => setIsRedeemModalOpen(false)} />
    </>
  );
}
