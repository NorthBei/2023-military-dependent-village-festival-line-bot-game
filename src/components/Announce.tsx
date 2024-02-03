import { ReactNode } from 'react';

import Button from './Button';

type AnnounceProps = {
  image: ReactNode;
  content: string[];
  button: {
    text: string;
    isShowArrow: boolean;
    onClick: () => void;
  };
  className?: string;
};

function Announce(props: AnnounceProps) {
  const { image, content, button, className } = props;

  return (
    <div className={className}>
      <div className="mx-auto flex max-w-[320px] flex-col items-center gap-[35px]">
        <div className="h-[200px]">{image}</div>
        <div>
          {content.map((text) => {
            return (
              <p key={text} className="text-[16px] leading-[24px] tracking-[0.8px]">
                {text}
              </p>
            );
          })}
        </div>
        <div className="pb-[10px]">
          <Button isShowArrow={button.isShowArrow} onClick={button.onClick}>
            <span className="whitespace-nowrap">{button.text}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Announce;
