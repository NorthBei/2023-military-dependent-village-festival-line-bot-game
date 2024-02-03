import Image from 'next/image';
import { memo } from 'react';
import Marquee from 'react-fast-marquee';

import SpeakerIcon from '@/web/assets/icon-speaker.svg?url';

type AnnouncementMarqueeProps = {
  data: string;
};

function AnnouncementMarquee(props: AnnouncementMarqueeProps) {
  const { data } = props;

  return (
    <section className="flex h-[25px] items-center border-[1px] border-dark bg-white" style={{ borderTop: 'none' }}>
      <Image src={SpeakerIcon.src} alt="大聲公" height={15} width={15} className="flex-0 mx-[9px]" />
      <div className="flex-1">
        <Marquee speed={30}>
          <div className="text-[12px] tracking-[1.2px] text-dark">{data}</div>
        </Marquee>
      </div>
    </section>
  );
}

export default memo(AnnouncementMarquee);
