import clsx from 'clsx';

import GiftIcon from '@/web/assets/icon-gift.svg';

type RedeemButtonProps = {
  onClick: () => void;
  isRedeemed: boolean;
};

function RedeemButton(props: RedeemButtonProps) {
  const { onClick, isRedeemed } = props;

  return (
    <button
      onClick={onClick}
      className={clsx('shadow-button flex h-[40px] w-[40px] items-center justify-center rounded-full', {
        'bg-yellow': !isRedeemed,
        'bg-gray2': isRedeemed
      })}
    >
      <GiftIcon
        className={clsx('h-[20px]', {
          'text-dark': !isRedeemed,
          'text-gray': isRedeemed
        })}
      />
    </button>
  );
}

export default RedeemButton;
