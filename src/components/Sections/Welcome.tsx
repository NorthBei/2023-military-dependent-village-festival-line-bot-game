import clsx from 'clsx';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Slider from 'react-slick';

import { MonsterType } from '@/common/types';
import MahjongGreenBack from '@/web/assets/mahjong-blind-box-green.svg?url';
import MahjongSalty from '@/web/assets/mahjong-salty.svg';
import MahjongSour from '@/web/assets/mahjong-sour.svg';
import MahjongSpicy from '@/web/assets/mahjong-spicy.svg';
import MahjongSweet from '@/web/assets/mahjong-sweet.svg';
import WelcomeStep1 from '@/web/assets/welcome-step-1.svg';
import WelcomeStep2 from '@/web/assets/welcome-step-2.svg';
import WelcomeStep3 from '@/web/assets/welcome-step-3.svg';
import WelcomeStep4 from '@/web/assets/welcome-step-4.svg';
import Button from '@/web/components/Button';
import shuffle from '@/web/utils/shuffle';

import Announce from '../Announce';

const welcomeData = [
  {
    image: <WelcomeStep1 className="h-full" />,
    content: ['叮咚！', '就在剛才，你暫時脫離原本的世界，轉生成為大新北新手村民唷！'],
    buttonText: 'NEXT'
  },
  {
    image: <WelcomeStep2 className="h-full" />,
    content: ['異世界充滿各種挑戰，為了更好地適應，強烈建議你先在新手村多多磨練自己！'],
    buttonText: 'NEXT'
  },
  {
    image: <WelcomeStep3 className="h-full" />,
    content: ['但別擔心！每個來到新手村的勇者，都會有一隻轉轉獸，陪你一起冒險闖關！'],
    buttonText: 'NEXT'
  },
  {
    image: <WelcomeStep4 className="h-full" />,
    content: ['當你的轉轉獸進化到成熟體，你也同時具備足以在大新北生存的能力，就可以兌換闖關成功的限量小禮物！'],
    buttonText: '開始遊戲'
  }
];

type WelcomeProps = {
  onFinished: (monsterType: MonsterType, monsterName: string) => void;
};

function Welcome(props: WelcomeProps) {
  const { onFinished } = props;
  const welcomeSliderRef = useRef<Slider>(null);
  const [monsterName, setMonsterName] = useState<string>('');
  const [monsterType, setMonsterType] = useState<MonsterType | null>(null);

  const monsterOptions = shuffle([MonsterType.Salty, MonsterType.Sour, MonsterType.Spicy, MonsterType.Sweet]);

  return (
    <section id="welcome">
      <Slider ref={welcomeSliderRef} infinite={false} arrows={false} draggable={false} swipe={false}>
        {welcomeData.map((data) => {
          return (
            <Announce
              key={data.content.toString()}
              image={data.image}
              content={data.content}
              button={{
                text: data.buttonText,
                isShowArrow: data.buttonText === 'NEXT',
                onClick: () => welcomeSliderRef.current?.slickNext()
              }}
            />
          );
        })}
        <div>
          {/* repetitive style */}
          <div className="mx-auto flex max-w-[280px] flex-col items-center gap-[35px]">
            {/* repetitive style */}
            <p className="text-center text-[20px] leading-[24px] tracking-[1px]">
              請先摸一張麻將，
              <br />
              決定你的轉轉獸屬性。
            </p>
            <div className="grid grid-cols-2 gap-[35px]">
              {monsterOptions.map((monsterType) => (
                <Image
                  key={monsterType}
                  src={MahjongGreenBack.src}
                  alt="Mahjong Blind Box"
                  width={100}
                  height={120}
                  className="cursor-pointer"
                  onClick={() => {
                    setMonsterType(monsterType);
                    welcomeSliderRef.current?.slickNext();
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          {/* repetitive style */}
          <div className="mx-auto flex max-w-[280px] flex-col items-center gap-[35px] pb-[10px]">
            {/* repetitive style */}
            <p className="text-center text-[20px] leading-[24px] tracking-[1px]">你的屬性是：</p>
            <div>
              {monsterType === MonsterType.Salty && <MahjongSalty className="h-[200px] animate-spin-max" />}
              {monsterType === MonsterType.Sour && <MahjongSour className="h-[200px] animate-spin-max" />}
              {monsterType === MonsterType.Spicy && <MahjongSpicy className="h-[200px] animate-spin-max" />}
              {monsterType === MonsterType.Sweet && <MahjongSweet className="h-[200px] animate-spin-max" />}
            </div>
            <div className="flex w-full flex-col items-center gap-[10px]">
              {/* repetitive style */}
              <p className="text-center text-[20px] leading-[24px] tracking-[1px]">為你的轉轉獸取名字</p>
              <input
                type="text"
                value={monsterName}
                onChange={(event) => setMonsterName(event.target.value)}
                className="h-[50px] w-full rounded-[10px] border border-dark bg-white px-[20px] py-[13px] text-center text-[20px] leading-[24px] tracking-[1px] outline-none"
                maxLength={10}
              />
            </div>
            <Button
              onClick={() => {
                if (monsterName.length > 0 && monsterType) {
                  onFinished(monsterType, monsterName);
                } else {
                  alert('Monster Error');
                }
              }}
              className={clsx({
                'grayscale filter': monsterName.length === 0
              })}
            >
              進入新手村
            </Button>
          </div>
        </div>
      </Slider>
    </section>
  );
}

export default Welcome;
