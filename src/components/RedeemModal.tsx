import { useAtom } from 'jotai';
import { sha256 } from 'js-sha256';
import { memo, useCallback, useState } from 'react';

import RedeemGift from '@/web/assets/redeem-gift.svg';
import RedeemMahJong from '@/web/assets/redeem-mahjong.svg';
import SpotLight from '@/web/assets/spot-light.svg';

import { updateUserData } from '../firebase';
import { userDataAtom } from '../store';
import WindowModal from './WindowModal';

const REDEEM_GIFT_PASSWORD = ['d80173b942d7236e0a374dc61f78150dabbacf17230b95e62201ce7094d088c5']; // 6688990
const REDEEM_MAHJONG_PASSWORD = [
  '068a9f5baa13da8e4c05b3c34754a276f10fd88d942988900c2197bc33596daf',
  '29624e2e4c4ccee26ed8f3e0ca1012ea57a8f2191be6149f632250f7036119cc'
]; // 778899

enum RedeemModalType {
  Gift = 'Gift',
  MahJong = 'MahJong'
}

type RedeemModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function RedeemModal(props: RedeemModalProps) {
  const { isOpen, onClose } = props;
  const [password, setPassword] = useState('');
  const [redeemType, setRedeemType] = useState<RedeemModalType | null>(null);
  const [userData, setUserData] = useAtom(userDataAtom);

  const onCloseModal = useCallback(() => {
    onClose();
    // Change state after the modal closing animation played
    setTimeout(() => setRedeemType(null), 1000);
  }, [onClose]);

  const onCheckPassword = () => {
    let isGetGift = false;
    let isGetNpcPoint = false;

    if (password === '') {
      onCloseModal();
      return;
    }

    if (REDEEM_GIFT_PASSWORD.includes(sha256(password))) {
      isGetGift = true;
      setRedeemType(RedeemModalType.Gift);
    } else if (REDEEM_MAHJONG_PASSWORD.includes(sha256(password))) {
      isGetNpcPoint = true;
      setRedeemType(RedeemModalType.MahJong);
    } else {
      setRedeemType(null);
    }

    if (userData && (isGetGift || isGetNpcPoint)) {
      setUserData((userData) => {
        if (userData) {
          return {
            ...userData,
            isRedeemGift: isGetGift ? true : false,
            npcPoints: isGetNpcPoint ? userData.npcPoints + 1 : userData.npcPoints
          };
        }
        return null;
      });

      updateUserData(userData.userId, {
        ...userData,
        isRedeemGift: isGetGift ? true : false,
        npcPoints: isGetNpcPoint ? userData.npcPoints + 1 : userData.npcPoints
      });
    }
  };

  return (
    <WindowModal
      isOpen={isOpen}
      onClose={onClose}
      title={{
        text: '轉生通關密碼',
        className: 'bg-yellow'
      }}
      container={{
        className: 'relative'
      }}
    >
      {redeemType === null && (
        <>
          {/* repetitive style */}
          <p className="text-center text-[16px] leading-[24px] tracking-[0.8px]">你解不開，村子裡總有人解得開。</p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event?.target.value)}
            className="h-[60px] w-[280px] rounded-[100px] border-[1px]  border-dark px-[10px] py-[8px] text-center text-[20px] leading-[24px] tracking-[2px] outline-none"
          />
          {/* repetitive style */}
          <button
            onClick={onCheckPassword}
            className="w-fit rounded-[5px] border-[1px] border-dark bg-yellow2 px-[10px] py-[8px]"
          >
            <div className="text-[20px] font-bold leading-[24px] tracking-[2px]">確認</div>
          </button>
        </>
      )}
      {redeemType === RedeemModalType.Gift && (
        <>
          {/* repetitive style */}
          <p className="text-center text-[16px] leading-[24px] tracking-[0.8px]">
            恭喜獲得轉生眷面禮！
            <br /> 沒完成的關卡還是可以繼續挑戰喔～
          </p>
          <div className="my-[15px]">
            <RedeemGift className="h-[100px]" />
          </div>
          {/* repetitive style */}
          <button
            onClick={onCloseModal}
            className="w-fit rounded-[5px] border-[1px] border-dark bg-yellow2 px-[10px] py-[8px]"
          >
            <div className="text-[20px] font-bold leading-[24px] tracking-[2px]">確認</div>
          </button>
        </>
      )}
      {redeemType === RedeemModalType.MahJong && (
        <>
          {/* repetitive style */}
          <p className="relative z-10 text-center text-[16px] leading-[24px] tracking-[0.8px]">
            恭喜！獲得一張遇眷你麻將
          </p>
          <div className="relative z-10 my-[15px]">
            <RedeemMahJong className="h-[150px]" />
          </div>
          <SpotLight className="absolute" />
          {/* repetitive style */}
          <button
            onClick={onCloseModal}
            className="relative z-10 w-fit rounded-[5px] border-[1px] border-dark bg-yellow2 px-[10px] py-[8px]"
          >
            <div className="text-[20px] font-bold leading-[24px] tracking-[2px]">確認</div>
          </button>
        </>
      )}
    </WindowModal>
  );
}

export default memo(RedeemModal);
