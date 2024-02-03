import { ReactNode } from 'react';

type RedeemModalContentContainerProps = {
  title: ReactNode;
  children: ReactNode;
  onButtonClick: () => void;
};

function RedeemModalContentContainer(props: RedeemModalContentContainerProps) {
  const { title, children, onButtonClick } = props;

  return (
    <>
      <p className="relative z-10 text-center text-[16px] leading-[24px] tracking-[0.8px]">{title}</p>
      {children}
      <button
        onClick={onButtonClick}
        className="relative z-10 w-fit rounded-[5px] border-[1px] border-dark bg-yellow2 px-[10px] py-[8px]"
      >
        <div className="text-[20px] font-bold leading-[24px] tracking-[2px]">確認</div>
      </button>
    </>
  );
}

export default RedeemModalContentContainer;
