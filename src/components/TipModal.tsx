import WindowModal from './WindowModal';

type TipModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function TipModal(props: TipModalProps) {
  const { isOpen, onClose } = props;

  return (
    <WindowModal
      isOpen={isOpen}
      onClose={onClose}
      title={{
        text: '新手村小提示',
        className: 'bg-orange'
      }}
    >
      <div className="text-[16px] leading-[24px] tracking-[0.8px]">
        關卡藏在整個新手村裡，四處找找注意「遊戲手把」！
        <br />
        <br />
        隨時也可能出現神秘角色或是驚動全村的大事件！
        <br />
        <br />
        如果真的找不到某個關卡，或許身旁的村民可以給你一些線索…
      </div>
      <button onClick={onClose} className="w-full rounded-[5px] border-[1px] border-dark bg-orange2 px-[10px] py-[8px]">
        <div className="text-[20px] font-bold leading-[24px] tracking-[2px]">我知道了</div>
      </button>
    </WindowModal>
  );
}

export default TipModal;
