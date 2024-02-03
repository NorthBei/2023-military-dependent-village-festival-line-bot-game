import clsx from 'clsx';
import { useMemo, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import Slider from 'react-slick';

import { MonsterType } from '@/common/types';
import shuffle from '@/common/utils/shuffle';
import MahjongSalty from '@/web/assets/mahjong-salty.svg';
import MahjongSour from '@/web/assets/mahjong-sour.svg';
import MahjongSpicy from '@/web/assets/mahjong-spicy.svg';
import MahjongSweet from '@/web/assets/mahjong-sweet.svg';
import WelcomeStep1 from '@/web/assets/welcome/step1.svg';
import WelcomeStep2 from '@/web/assets/welcome/step2.svg';
import WelcomeStep3 from '@/web/assets/welcome/step3.svg';
import WelcomeStep4 from '@/web/assets/welcome/step4.svg';
import Announce from '@/web/components/Announce';
import Button from '@/web/components/Button';
import MonsterSelectMahjong from '@/web/components/MonsterSelectMahjong';

const NEXT_BUTTON_TEXT = 'NEXT';

const welcomeData = [
  {
    image: <WelcomeStep1 className="h-full" />,
    content: ['叮咚！', '就在剛才，你暫時脫離原本的世界，轉生成為大新北新手村民唷！'],
    buttonText: NEXT_BUTTON_TEXT
  },
  {
    image: <WelcomeStep2 className="h-full" />,
    content: ['異世界充滿各種挑戰，為了更好地適應，強烈建議你先在新手村多多磨練自己！'],
    buttonText: NEXT_BUTTON_TEXT
  },
  {
    image: <WelcomeStep3 className="h-full" />,
    content: ['但別擔心！每個來到新手村的勇者，都會有一隻轉轉獸，陪你一起冒險闖關！'],
    buttonText: NEXT_BUTTON_TEXT
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
  const [isFinalCheckModalOpen, setFinalCheckModalOpen] = useState<boolean>(false);

  const monsterOptions = useMemo(() => {
    return shuffle([MonsterType.Salty, MonsterType.Sour, MonsterType.Spicy, MonsterType.Sweet]);
  }, []);

  return (
    <section id="welcome">
      <Slider
        ref={welcomeSliderRef}
        infinite={false}
        arrows={false}
        draggable={true}
        swipe={false}
        className="mt-[80px]"
      >
        {welcomeData.map((data) => {
          return (
            <div key={data.content.toString()}>
              <Announce
                image={data.image}
                content={data.content}
                button={{
                  text: data.buttonText,
                  isShowArrow: data.buttonText === NEXT_BUTTON_TEXT,
                  onClick: () => welcomeSliderRef.current?.slickNext()
                }}
              />
            </div>
          );
        })}
        <div>
          <div className="mx-auto flex max-w-[320px] flex-col items-center gap-[35px]">
            <p className="text-center text-[20px] leading-[24px] tracking-[1px]">
              請先摸一張麻將，
              <br />
              決定你的轉轉獸屬性。
            </p>
            <div className="grid grid-cols-2 gap-[35px]">
              {monsterOptions.map((monsterType) => (
                <MonsterSelectMahjong
                  key={monsterType}
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
          <div className="mx-auto flex max-w-[320px] flex-col items-center gap-[35px] pb-[10px]">
            <p className="text-center text-[20px] leading-[24px] tracking-[1px]">你的屬性是：</p>
            <div>
              {monsterType === MonsterType.Salty && (
                <MahjongSalty
                  className="h-[200px] animate-spin5times"
                  style={{
                    animationPlayState: monsterType ? 'running' : 'paused'
                  }}
                />
              )}
              {monsterType === MonsterType.Sour && (
                <MahjongSour
                  className="h-[200px] animate-spin5times"
                  style={{
                    animationPlayState: monsterType ? 'running' : 'paused'
                  }}
                />
              )}
              {monsterType === MonsterType.Spicy && (
                <MahjongSpicy
                  className="h-[200px] animate-spin5times"
                  style={{
                    animationPlayState: monsterType ? 'running' : 'paused'
                  }}
                />
              )}
              {monsterType === MonsterType.Sweet && (
                <MahjongSweet
                  className="h-[200px] animate-spin5times"
                  style={{
                    animationPlayState: monsterType ? 'running' : 'paused'
                  }}
                />
              )}
            </div>
            <div className="flex w-full flex-col items-center gap-[10px]">
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
                if (monsterName.length > 0) setFinalCheckModalOpen(true);
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
      <ReactModal
        appElement={document.body}
        isOpen={isFinalCheckModalOpen}
        className="maw-w-[450px] text-dark"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }}
      >
        <div className="inline-flex h-40 w-80 flex-col items-center justify-start gap-[20px] rounded-[5px] border-[1px] border-dark bg-white p-5">
          <p className="text-[20px] leading-[30px] tracking-[1px] text-dark">
            下好離手，再給你想3秒，名字取了就不能改唷～
          </p>
          <div className="flex w-full justify-center gap-[15px]">
            <button
              onClick={() => setFinalCheckModalOpen(false)}
              className="flex h-[40px] flex-1 items-center justify-center rounded-[5px] border-[1px] border-dark bg-white px-[10px] py-[8px]"
            >
              <span className="text-[20px] font-bold leading-[24px] tracking-[2px] text-dark">回去修改</span>
            </button>
            <button
              onClick={() => {
                if (monsterName.length > 0 && monsterType) {
                  onFinished(monsterType, monsterName);
                } else {
                  alert('Monster Error');
                }
              }}
              className="flex h-[40px] flex-1 items-center justify-center rounded-[5px] border-[1px] border-dark bg-blue px-[10px] py-[8px]"
            >
              <span className="text-[20px] font-bold leading-[24px] tracking-[2px] text-white">確認</span>
            </button>
          </div>
        </div>
      </ReactModal>
    </section>
  );
}

export default Welcome;
