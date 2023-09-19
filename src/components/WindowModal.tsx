import clsx from 'clsx';
import { ReactNode } from 'react';
import ReactModal from 'react-modal';

type WindowModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: {
    text: string;
    className?: string;
  };
  container?: {
    className?: string;
  };
};

function WindowModal(props: WindowModalProps) {
  const { isOpen, onClose, children, title, container } = props;
  return (
    <ReactModal
      appElement={document.body}
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={300}
      className="text-dark"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        content: {}
      }}
    >
      <div className="w-[320px] overflow-hidden rounded-[5px] border-[1px] border-dark">
        <h6
          className={clsx(
            'border-b-[1px] border-dark bg-orange px-[12px] py-[10px] text-center text-[20px] font-bold leading-[24px] tracking-[2px]',
            title.className
          )}
        >
          {title.text}
        </h6>
        <div className={clsx('flex flex-col items-center gap-[15px] bg-white p-[20px]', container?.className)}>
          {children}
        </div>
      </div>
    </ReactModal>
  );
}

export default WindowModal;
