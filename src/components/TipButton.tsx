type TipButtonProps = {
  onClick: () => void;
};

function TipButton(props: TipButtonProps) {
  const { onClick } = props;

  return (
    <button
      onClick={onClick}
      className="shadow-button flex h-[40px] w-[40px] items-center justify-center rounded-full bg-orange"
    >
      <span className="text-[32px] font-bold">?</span>
    </button>
  );
}

export default TipButton;
