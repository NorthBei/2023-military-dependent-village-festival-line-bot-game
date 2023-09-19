'use client';
import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useMemo } from 'react';
import Modal from 'react-modal';

import localGlobalData from '@/common/localGlobalData';
import { CardType, Era, UserCardsRecord } from '@/common/types';
import ChanceCardContentText from '@/web/assets/card-chance-content-text.svg';
import ChanceCardCoverText from '@/web/assets/card-chance-cover-text.svg';
import DestinyCardContentText from '@/web/assets/card-destiny-content-text.svg';
import DestinyCardCoverText from '@/web/assets/card-destiny-cover-text.svg';
import Destiny1950 from '@/web/assets/cards/命運1950.jpg';
import Destiny1960 from '@/web/assets/cards/命運1960.jpg';
import Destiny1970 from '@/web/assets/cards/命運1970.jpg';
import Destiny1980 from '@/web/assets/cards/命運1980.jpg';
import Destiny1990 from '@/web/assets/cards/命運1990.jpg';
import Destiny2000 from '@/web/assets/cards/命運2000.jpg';
import Chance1950 from '@/web/assets/cards/機會1950.jpg';
import Chance1960 from '@/web/assets/cards/機會1960.jpg';
import Chance1970 from '@/web/assets/cards/機會1970.jpg';
import Chance1980 from '@/web/assets/cards/機會1980.jpg';
import Chance1990 from '@/web/assets/cards/機會1990.jpg';
import Chance2000 from '@/web/assets/cards/機會2000.jpg';
import DestinyFace from '@/web/assets/crying-face-green.svg';
import ChangeFace from '@/web/assets/crying-face-purple.svg';
import ChanceMahjong from '@/web/assets/mahjong-chance.svg';
import DestinyMahjong from '@/web/assets/mahjong-destiny.svg';
import Pacman from '@/web/assets/pacman.svg?url';
import SpotLight from '@/web/assets/spot-light.svg';
import Button from '@/web/components/Button';

import { dbGlobalDataAtom } from '../store';

type CardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cardStatus: UserCardsRecord[Era];
  onDrawCard: (type: CardType) => void;
};

const ImageMap = {
  [Era.THE1950]: {
    [CardType.Chance]: Chance1950,
    [CardType.Destiny]: Destiny1950
  },
  [Era.THE1960]: {
    [CardType.Chance]: Chance1960,
    [CardType.Destiny]: Destiny1960
  },
  [Era.THE1970]: {
    [CardType.Chance]: Chance1970,
    [CardType.Destiny]: Destiny1970
  },
  [Era.THE1980]: {
    [CardType.Chance]: Chance1980,
    [CardType.Destiny]: Destiny1980
  },
  [Era.THE1990]: {
    [CardType.Chance]: Chance1990,
    [CardType.Destiny]: Destiny1990
  },
  [Era.THE2000]: {
    [CardType.Chance]: Chance2000,
    [CardType.Destiny]: Destiny2000
  }
};

function CardModal(props: CardModalProps) {
  const { isOpen, onClose, cardStatus, onDrawCard } = props;
  const dbGlobalData = useAtomValue(dbGlobalDataAtom);

  const { title, subtitle, description, image } = useMemo(() => {
    if (!dbGlobalData?.currentEra || !cardStatus.type) {
      return {
        title: '',
        subtitle: '',
        description: '',
        image: null
      };
    }
    return {
      ...localGlobalData.cards[dbGlobalData.currentEra][cardStatus.type],
      image: ImageMap[dbGlobalData.currentEra][cardStatus.type]
    };
  }, [dbGlobalData?.currentEra, cardStatus.type]);

  return (
    <Modal
      id="card-modal"
      appElement={document.body}
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={300}
      className="h-screen w-screen overflow-auto bg-orange2 p-[16px]"
    >
      <div className="flex flex-col items-center">
        <Button className="self-start bg-white" onClick={onClose}>
          <span
            style={{
              width: '0',
              height: '0',
              borderStyle: 'solid',
              borderWidth: '8px 14px 8px 0',
              borderColor: 'transparent black transparent transparent'
            }}
            className="mr-[5px]"
          ></span>
          <span className="text-dark">回到遊戲</span>
        </Button>
        <div className="mt-[40px] flex gap-[15px]">
          {new Array(10).fill(1).map((_item, index) => {
            return (
              <Image key={index} src={Pacman.src} alt="pacman" className="h-[20px] w-[20px]" width={20} height={20} />
            );
          })}
        </div>
        {!cardStatus.isDrawn && (
          <>
            <div className="mb-[10px] mt-[15px]">
              <h2 className="text-center text-[24px] font-black tracking-[2.4px]">
                歡迎來到{dbGlobalData?.currentEra}年代
              </h2>
            </div>
            <div className="mb-[40px]">
              <p className="text-center text-[16px] tracking-[2.4px]">
                在新手村裡，每一個小時代表一個10年，每個10年你可以決定一次自己的機會命運，決定好了嗎？請選擇！
              </p>
            </div>
            <div className="flex gap-[50px]">
              <div
                onClick={() => onDrawCard(CardType.Chance)}
                className="shadow-button inline-flex h-[240px] w-[140px] rounded-[10px] border-[1px] border-dark bg-white p-[10px]"
              >
                <div className="inline-flex h-full w-full flex-col items-center justify-center rounded-[10px] border-[1px] border-dark bg-purple">
                  <ChanceCardCoverText className="w-[55px]" />
                </div>
              </div>
              <div
                onClick={() => onDrawCard(CardType.Destiny)}
                className="shadow-button inline-flex h-[240px] w-[140px] rounded-[10px] border-[1px] border-dark bg-white p-[10px]"
              >
                <div className="inline-flex h-full w-full flex-col items-center justify-center rounded-[10px] border-[1px] border-dark bg-green2">
                  <DestinyCardCoverText className="w-[55px]" />
                </div>
              </div>
            </div>
          </>
        )}
        {cardStatus.isDrawn && (
          <>
            <div className="mb-[10px] mt-[15px]">
              <h2 className="text-center text-[24px] font-black tracking-[2.4px]">{dbGlobalData?.currentEra}年代</h2>
            </div>
            <div className="mt-[5px] w-full">
              <div
                className={clsx('w-full rounded-[10px] border-[1px]  border-dark p-[10px]', {
                  'bg-purple': cardStatus.type === CardType.Chance,
                  'bg-green2': cardStatus.type === CardType.Destiny
                })}
              >
                <div className="relative flex flex-col items-center gap-[25px] rounded-[10px] border-[1px] border-dark bg-white px-[21px] py-[32px]">
                  <div className="h-[53px]">
                    {cardStatus.type === CardType.Chance && <ChanceCardContentText className="h-full" />}
                    {cardStatus.type === CardType.Destiny && <DestinyCardContentText className="h-full" />}
                  </div>
                  {cardStatus.isGetAward && (
                    <div className="absolute bottom-[30px] w-full">
                      <SpotLight className="z-[-1] w-full" id="xxx" />
                    </div>
                  )}
                  <p className="relative z-10 text-center text-[16px] font-medium tracking-[1.6px]">
                    {title}
                    <br />
                    {subtitle}
                  </p>
                  {cardStatus.isGetAward ? (
                    <div className="h-[150px]">
                      {cardStatus.type === CardType.Chance && <ChanceMahjong className="relative z-10 h-full" />}
                      {cardStatus.type === CardType.Destiny && <DestinyMahjong className="relative z-10 h-full" />}
                    </div>
                  ) : (
                    <div className="h-[120px]">
                      {cardStatus.type === CardType.Chance && <ChangeFace className="h-full" />}
                      {cardStatus.type === CardType.Destiny && <DestinyFace className="h-full" />}
                    </div>
                  )}

                  <p className="relative z-10 text-[12px] tracking-[1.2px]">
                    {cardStatus.isGetAward ? '獲得一顆愛心麻將!' : '獲得零顆愛心麻將'}
                  </p>
                </div>
              </div>
            </div>
            <p className="my-[15px] text-center text-[16px] tracking-[1.6px]">
              {description.split('\n').map((text) => (
                <span key={text}>
                  {text}
                  <br />
                </span>
              ))}
            </p>
            {image && (
              <Image src={image} alt="photo" className="h-auto w-full rounded-[10px]" width={334} height={237} />
            )}
          </>
        )}
      </div>
    </Modal>
  );
}

export default CardModal;
