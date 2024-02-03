import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useMemo } from 'react';
import Countdown from 'react-countdown';

import { Era } from '@/common/types';
import ChanceDestinyWheel from '@/web/assets/chance-destiny-wheel.svg';
import Era1950 from '@/web/assets/era/1950.svg?url';
import Era1960 from '@/web/assets/era/1960.svg?url';
import Era1970 from '@/web/assets/era/1970.svg?url';
import Era1980 from '@/web/assets/era/1980.svg?url';
import Era1990 from '@/web/assets/era/1990.svg?url';
import Era2000 from '@/web/assets/era/2000.svg?url';
import { dbGlobalDataAtom } from '@/web/store';

type DrawCardButtonProps = {
  onClick: () => void;
};

const eraImageUrlMap: Record<Era, string> = {
  [Era.THE1950]: Era1950.src,
  [Era.THE1960]: Era1960.src,
  [Era.THE1970]: Era1970.src,
  [Era.THE1980]: Era1980.src,
  [Era.THE1990]: Era1990.src,
  [Era.THE2000]: Era2000.src
};

function DrawCardButton(props: DrawCardButtonProps) {
  const { onClick } = props;

  const dbGlobalData = useAtomValue(dbGlobalDataAtom);

  const eraImageUrl = useMemo(() => {
    return dbGlobalData?.currentEra ? eraImageUrlMap[dbGlobalData?.currentEra] : null;
  }, [dbGlobalData?.currentEra]);

  const eraRemainingMilliseconds = useMemo(() => {
    if (dbGlobalData) {
      // startTime, endTime format: 2023-09-24 15:30
      const { endTime } = dbGlobalData.era[dbGlobalData?.currentEra];
      const now = dayjs();
      const end = dayjs(endTime);
      return end.diff(now);
    }
    return 0;
  }, [dbGlobalData]);

  return (
    <button
      className="shadow-button relative flex h-[92px] w-[92px] items-center justify-center rounded-full"
      onClick={onClick}
    >
      <ChanceDestinyWheel className="absolute z-[-1] h-full animate-rotate" />
      <div className="inline-flex h-[48px] w-[48px] animate-breathePer30s flex-col items-center justify-center rounded-full border border-dark bg-yellow">
        <div className="text-[16px] font-bold leading-[17px]">抽</div>
        <Countdown
          date={Date.now() + eraRemainingMilliseconds}
          renderer={({ minutes, seconds, completed }) => (
            <div className="text-[12px] tracking-[0.6px] text-dark">
              {completed ? '00:00' : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </div>
          )}
        />
      </div>
      {eraImageUrl && (
        <Image src={eraImageUrl} alt="era" height={27} width={65} className="absolute top-0 translate-y-[-90%]" />
      )}
    </button>
  );
}

export default DrawCardButton;
