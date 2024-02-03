'use client';

import { format } from 'fecha';
import { useAtom, useSetAtom } from 'jotai';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactGA from 'react-ga4';

import { OFFICIAL_WEBSITE_URL } from '@/common/constant';
import localGlobalData, { levelsCategoryObj } from '@/common/localGlobalData';
import { CardType, LevelCategory, MonsterType } from '@/common/types';
import getTaipeiDate from '@/common/utils/getTaipeiDate';
import AppNotAvailable from '@/web/assets/app-not-available.svg';
import AppTitle from '@/web/assets/app-title.svg';
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
import Announce from '@/web/components/Announce';
import AnnouncementMarquee from '@/web/components/AnnouncementMarquee';
import Button from '@/web/components/Button';
import DrawCardButton from '@/web/components/DrawCardButton';
import DrawCardModal from '@/web/components/DrawCardModal';
import MahjongListContainer from '@/web/components/MahjongListContainer';
import MonsterImage from '@/web/components/MonsterImage';
import ProcessBar from '@/web/components/ProcessBar';
import RedeemButton from '@/web/components/RedeemButton';
import RedeemModal from '@/web/components/RedeemModal';
import Welcome from '@/web/components/Sections/Welcome';
import TipButton from '@/web/components/TipButton';
import TipModal from '@/web/components/TipModal';
import { authWithLine, createUser, getDbGlobalData, getUserData } from '@/web/libs/firebase';
import * as liff from '@/web/libs/liff';
import { dbGlobalDataAtom, userDataAtom, userDataSyncAtom } from '@/web/store';

if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
}

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

enum TabType {
  Monster = 'Monster',
  Levels = 'Levels'
}

export default function Home() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [isSysInit, setIsSysInit] = useState(false);
  const [tabType, setTabType] = useState(TabType.Monster);

  const [dbGlobalData, setDbGlobalData] = useAtom(dbGlobalDataAtom);
  const [userData, setUserData] = useAtom(userDataAtom);
  const setUserDataSyncFirebase = useSetAtom(userDataSyncAtom);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/', title: document.title });

    async function initSystem() {
      await liff.init();
      const [idToken, profile] = await Promise.all([liff.getIDToken(), liff.getProfile()]);
      if (!idToken) throw new Error('ID token not found');
      await authWithLine(idToken);

      const [userData, dbGlobalData] = await Promise.all([getUserData(profile.userId), getDbGlobalData()]);
      if (!userData) {
        // 如果使用者資料不存在，初始化使用者資料，並且存到firebase
        const newUserData = await createUser(profile.userId, profile.displayName);
        setUserData(newUserData);
      } else {
        setUserData(userData);
      }
      if (dbGlobalData) setDbGlobalData(dbGlobalData);
      setIsSysInit(true);
    }

    try {
      initSystem();
    } catch (error) {
      alert(error);
    }
    // only run once after init
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCloseCardModal = useCallback(() => {
    if (userData?.isFirstDrawnCard) {
      setIsCardModalOpen(false);
    }
  }, [userData]);

  const onDrawCard = useCallback(
    (type: CardType) => {
      if (dbGlobalData?.currentEra && userData) {
        const { isCanGetAward } = localGlobalData.cards[dbGlobalData.currentEra][type];

        setUserDataSyncFirebase((userData) => {
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
      } else {
        alert('Drawn Card User or Global Data Error');
      }
    },
    [userData, dbGlobalData?.currentEra, setUserDataSyncFirebase]
  );

  const onUserInit = useCallback(
    (monsterType: MonsterType, monsterName: string) => {
      if (userData) {
        setUserDataSyncFirebase((userData) => {
          if (userData) {
            return {
              ...userData,
              monsterType,
              monsterName,
              isInit: true,
              initAt: format(getTaipeiDate(), 'YYYY-MM-DD HH:mm:ss')
            };
          }
          return null;
        });
        setIsCardModalOpen(true);
      } else {
        alert('User Data Error');
      }
    },
    [userData, setUserDataSyncFirebase]
  );

  const othersLevelMahjongCount = useMemo(() => {
    if (!userData) return 0;
    return Object.values(userData.cards).filter((card) => card.isGetAward).length + userData.npcPoints;
  }, [userData]);

  if (!isSysInit || !userData) {
    return <></>;
  }

  return (
    <>
      <main className="mx-auto flex min-h-screen w-full max-w-[450px] flex-col bg-gray2">
        <div className="sticky top-0 z-50 w-full">
          <AppTitle className="w-full" />
          {/* 網站服務開啟且使用者已經選擇了轉轉獸，就出現公告條 */}
          {dbGlobalData?.isWebAvailable && userData.isInit && <AnnouncementMarquee data={dbGlobalData.announcement} />}
        </div>

        {/* 網站服務關閉時 */}
        {!dbGlobalData?.isWebAvailable && (
          <Announce
            image={<AppNotAvailable className="h-full" />}
            content={['轉生新手村全員蓄電中', '請於 9/29.30 15:00-21:00 到訪']}
            button={{
              text: '先去逛逛網站',
              isShowArrow: true,
              onClick: () => window.open(OFFICIAL_WEBSITE_URL, '_blank', 'noopener, noreferrer')
            }}
            className="mt-[80px] text-center"
          />
        )}

        {/* 網站服務開啟但是使用者還沒選擇轉轉獸 */}
        {dbGlobalData?.isWebAvailable && !userData.isInit && <Welcome onFinished={onUserInit} />}

        {/* 網站服務開啟且使用者已經選擇了轉轉獸 */}
        {dbGlobalData?.isWebAvailable && userData.isInit && (
          <>
            <nav className="fixed bottom-[10px] left-[10px]">
              <DrawCardButton onClick={() => setIsCardModalOpen(true)} />
            </nav>
            <nav className="fixed bottom-[10px] right-[10px] flex flex-col gap-[8px]">
              <RedeemButton isRedeemed={userData.isRedeemGift} onClick={() => setIsRedeemModalOpen(true)} />
              <TipButton onClick={() => setIsTipModalOpen(true)} />
            </nav>

            <section id="user-info" className="flex w-full flex-col gap-[20px] px-[15px] pb-[90px] pt-[16px]">
              <div className="flex w-full items-center justify-center">
                <ProcessBar status={userData.monsterStage} />
              </div>
              <div className="inline-flex w-full items-center justify-center gap-[25px]">
                <Button className="bg-blue" onClick={() => setTabType(TabType.Monster)}>
                  我的轉轉獸
                </Button>
                <Button className="bg-orange" onClick={() => setTabType(TabType.Levels)}>
                  我的關卡紀錄
                </Button>
              </div>
              <div className={tabType === TabType.Monster ? 'block' : 'hidden'}>
                <MonsterImage name={userData.monsterName} type={userData.monsterType} stage={userData.monsterStage} />
              </div>
              <div className={tabType === TabType.Levels ? 'block' : 'hidden'}>
                <div className="flex flex-col gap-[50px] rounded-[10px] border border-dark bg-white px-[16px] py-[26px]">
                  <MahjongListContainer title={<LevelTitle1 className="h-[25px]" />}>
                    {levelsCategoryObj[LevelCategory.Healing].map((item, index) => {
                      const url = userData.levels[item.id].isPassed ? mahjongImageMap[item.id] : MahjongBlueBack.src;
                      return <Image key={index} src={url} alt={`level${item.id} mahjong`} width={54} height={65} />;
                    })}
                  </MahjongListContainer>

                  <MahjongListContainer title={<LevelTitle2 className="h-[25px]" />}>
                    {levelsCategoryObj[LevelCategory.Adventure].map((item, index) => {
                      const url = userData.levels[item.id].isPassed ? mahjongImageMap[item.id] : MahjongRedBack.src;
                      return <Image key={index} src={url} alt={`level${item.id} mahjong`} width={54} height={65} />;
                    })}
                  </MahjongListContainer>

                  <MahjongListContainer
                    title={<LevelTitle3 className="h-[25px]" />}
                    subtitle="除了透過抽機會命運有機會破關，也記得注意走在村子裡的特殊角色，他們也有機會協助你獲得遇眷你的麻將！"
                  >
                    {[1, 2, 3, 4, 5].map((number) => {
                      const url = othersLevelMahjongCount >= number ? mahjongImageMap['others'] : MahjongBrownBack.src;
                      return <Image key={number} src={url} alt="others level mahjong" width={54} height={65} />;
                    })}
                  </MahjongListContainer>
                </div>
              </div>
            </section>
            <DrawCardModal
              isOpen={isCardModalOpen}
              onClose={onCloseCardModal}
              cardStatus={userData.cards[dbGlobalData.currentEra]}
              onDrawCard={onDrawCard}
            />
            <TipModal isOpen={isTipModalOpen} onClose={() => setIsTipModalOpen(false)} />
            <RedeemModal isOpen={isRedeemModalOpen} onClose={() => setIsRedeemModalOpen(false)} />
          </>
        )}
      </main>
    </>
  );
}
