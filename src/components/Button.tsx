import clsx from 'clsx';
import { ReactNode } from 'react';

import Arrow1 from '@/web/assets/icon-arrow-1.svg';

type ButtonProps = {
  className?: string;
  isShowArrow?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

function Button(props: ButtonProps) {
  const { children, className, isShowArrow = false, onClick } = props;

  return (
    <button
      className={clsx(
        'shadow-button flex items-center gap-[5px] rounded-[5px] border-[1px] border-dark bg-blue px-[10px] py-[5px] text-[20px] font-bold tracking-[2px] text-white',
        className
      )}
      onClick={onClick}
    >
      {children}
      {isShowArrow && <Arrow1 className="h-[15px]" />}
    </button>
  );
}

export default Button;
