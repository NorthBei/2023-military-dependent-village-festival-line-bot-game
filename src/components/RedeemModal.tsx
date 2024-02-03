import { format } from 'fecha';
import { useAtom } from 'jotai';
import { sha256 } from 'js-sha256';
import groupBy from 'lodash/groupBy';
import { memo, useCallback, useState } from 'react';

import { MonsterStage, UserData } from '@/common/types';
import RedeemGift from '@/web/assets/redeem-gift.svg';
import RedeemMahJong from '@/web/assets/redeem-mahjong.svg';
import SpotLight from '@/web/assets/spot-light.svg';
import { getTodayInitializedUser, updateAnnouncement } from '@/web/libs/firebase';
import { userDataSyncAtom } from '@/web/store';

import RedeemModalContentContainer from './RedeemModalContentContainer';
import WindowModal from './WindowModal';

const REDEEM_GIFT_PASSWORD = ['6823222fac6e06f4c0dfbb86bb7db8e61e91aeac7665696112aa319e3965f143']; // 44211248
const REDEEM_MAHJONG_PASSWORD = ['f96db9502f85310f137de57ad1252e663dd6225a8a595c727ab8780245b4e03a']; // 953083
const ADMIN_CHANGE_ANNOUNCE_PASSWORD = ['151245e342b7421f2ab36d2a4cb313d6bb3e58a20a1902656d39b354165edf91']; // 24716589
const ADMIN_GET_ALL_MONSTER_NAME = ['757588e9af38dbc6d70e080bd94167014d1e3e6dbc486096e4eafada6875dc59']; // 556600

enum RedeemModalType {
  Gift = 'Gift',
  MahJong = 'MahJong',
  MonsterList = 'MonsterList'
}

type RedeemModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function RedeemModal(props: RedeemModalProps) {
  const { isOpen, onClose } = props;
  const [password, setPassword] = useState('');
  const [redeemType, setRedeemType] = useState<RedeemModalType | null>(null);
  const [userData, setUserDataSyncFirebase] = useAtom(userDataSyncAtom);
  const [userDataList, setUserDataList] = useState<UserData[]>([]);

  const onCloseModal = useCallback(() => {
    setPassword('');
    onClose();
    // Change state after the modal closing animation played
    setTimeout(() => setRedeemType(null), 1000);
  }, [onClose, setPassword]);

  const onCheckPassword = async () => {
    let isGetGift = false;
    let isGetNpcPoint = false;

    if (password === '') {
      onCloseModal();
      return;
    }

    const encryptedPassword = sha256(password);

    if (REDEEM_GIFT_PASSWORD.includes(encryptedPassword)) {
      if (userData && [MonsterStage.GiftRedeem, MonsterStage.Maternity].includes(userData.monsterStage)) {
        isGetGift = true;
        setRedeemType(RedeemModalType.Gift);
      } else {
        alert('你的轉轉獸還沒到達成熟期，沒辦法兌換禮物啦');
        return;
      }
    } else if (REDEEM_MAHJONG_PASSWORD.includes(encryptedPassword)) {
      isGetNpcPoint = true;
      setRedeemType(RedeemModalType.MahJong);
    } else if (ADMIN_CHANGE_ANNOUNCE_PASSWORD.includes(encryptedPassword)) {
      const announcement = window.prompt('嘿嘿，來更改公告吧！');
      if (announcement) await updateAnnouncement(announcement);
      return;
    } else if (ADMIN_GET_ALL_MONSTER_NAME.includes(encryptedPassword)) {
      // only get today's users
      const userDataList = await getTodayInitializedUser();
      setUserDataList(userDataList);
      setRedeemType(RedeemModalType.MonsterList);
      return;
    } else {
      setRedeemType(null);
    }

    if (isGetGift || isGetNpcPoint) {
      setUserDataSyncFirebase((userData) => {
        if (userData) {
          return {
            ...userData,
            isRedeemGift: isGetGift,
            npcPoints: isGetNpcPoint ? userData.npcPoints + 1 : userData.npcPoints
          };
        }
        return null;
      });
    }
  };

  return (
    <WindowModal
      isOpen={isOpen}
      onClose={onCloseModal}
      title={{
        text: '轉生通關密碼',
        className: 'bg-yellow'
      }}
      container={{
        className: 'relative'
      }}
    >
      {redeemType === null && (
        <RedeemModalContentContainer title="你解不開，村子裡總有人解得開。" onButtonClick={onCheckPassword}>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event?.target.value)}
            className="h-[60px] w-[280px] rounded-[100px] border-[1px]  border-dark px-[10px] py-[8px] text-center text-[20px] leading-[24px] tracking-[2px] outline-none"
          />
        </RedeemModalContentContainer>
      )}
      {redeemType === RedeemModalType.Gift && (
        <RedeemModalContentContainer
          title={
            <span>
              恭喜獲得轉生眷面禮！
              <br /> 沒完成的關卡還是可以繼續挑戰喔～
            </span>
          }
          onButtonClick={onCloseModal}
        >
          <div className="my-[15px]">
            <RedeemGift className="h-[100px]" />
          </div>
        </RedeemModalContentContainer>
      )}
      {redeemType === RedeemModalType.MahJong && (
        <RedeemModalContentContainer title="恭喜！獲得一張遇眷你麻將" onButtonClick={onCloseModal}>
          <div className="relative z-10 my-[15px]">
            <RedeemMahJong className="h-[150px]" />
          </div>
          <SpotLight className="absolute" />
        </RedeemModalContentContainer>
      )}
      {redeemType === RedeemModalType.MonsterList && (
        <RedeemModalContentContainer title="這裡是所有轉轉獸的名稱&建立時間" onButtonClick={onCloseModal}>
          <ul className="max-h-[430px] w-full overflow-y-auto text-left">
            {userDataList.map((userData, index) => {
              return (
                <li key={userData.userId} className="flex justify-between">
                  <span>
                    [{index + 1}]: {userData.monsterName}
                  </span>

                  <span>
                    <span className="mr-[8px]">{userData.monsterStage}</span>
                    {format(new Date(userData.initAt), 'MM/DD HH:mm')}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="flex gap-[20px] text-left">
            <div>
              {Object.entries(groupBy(userDataList, 'monsterStage')).map(([monsterStage, userDataList]) => {
                return (
                  <div key={monsterStage}>
                    {monsterStage}: {userDataList.length}人
                  </div>
                );
              })}
            </div>
            <div>
              {Object.entries(groupBy(userDataList, 'monsterType')).map(([monsterType, userDataList]) => {
                return (
                  <div key={monsterType}>
                    {monsterType}: {userDataList.length}人
                  </div>
                );
              })}
            </div>
          </div>
        </RedeemModalContentContainer>
      )}
    </WindowModal>
  );
}

export default memo(RedeemModal);
