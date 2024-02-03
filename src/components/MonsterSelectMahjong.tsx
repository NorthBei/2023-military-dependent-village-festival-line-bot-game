type MonsterSelectMahjongProps = {
  onClick: () => void;
};

// the content is copy from '@/web/assets/mahjong-blind-box-green.svg
function MonsterSelectMahjong(props: MonsterSelectMahjongProps) {
  const { onClick } = props;

  return (
    <div className="h-[120px] w-[100px] cursor-pointer" onClick={onClick}>
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
        <g clipPath="url(#clip0_799_34928)" stroke="#231815" strokeMiterlimit="10">
          <path
            d="m89.6 113.44-50.685-2.821c-5.948-.333-10.859-6.135-10.978-12.961l-1.424-85.216C26.42 6.64 29.813 1.982 34.47.905L8.975 6.773C4.304 7.851.91 12.522 1.004 18.323l1.424 85.217c.12 6.826 5.03 12.628 10.978 12.96l50.685 2.821a9.243 9.243 0 0 0 2.595-.213l25.509-5.881a9.318 9.318 0 0 1-2.595.213Z"
            fill="#fff"
          />
          <path
            d="M86.433 3.5c5.948.332 10.858 6.134 10.978 12.96l1.424 85.217c.12 6.826-4.618 12.096-10.566 11.763l-50.685-2.821c-5.948-.333-10.859-6.135-10.978-12.96l-1.424-85.217C25.062 5.616 29.799.346 35.747.679l50.686 2.82Z"
            fill="#fff"
          />
          <g className="fill-[#74D194] hover:fill-[#63A872]">
            <path
              d="m88.23 113.52-50.686-2.821c-5.948-.333-10.858-6.135-10.952-12.961l-1.237-85.256c-.04-2.914.798-5.55 2.235-7.572 1.438-2.036 3.473-3.46 5.829-3.992L20.658 3.753c-4.711 1.05-8.144 5.735-8.064 11.563l1.237 85.256c.093 6.827 5.003 12.628 10.952 12.961l50.685 2.821a9.341 9.341 0 0 0 2.528-.2l12.761-2.834a9.34 9.34 0 0 1-2.528.2Z"
              fill="inherit"
            />
            <path
              d="M86.632 3.54c5.948.332 10.845 6.134 10.952 12.96l1.237 85.256c.093 6.827-4.644 12.096-10.592 11.764l-50.685-2.821c-5.948-.333-10.858-6.135-10.952-12.961l-1.237-85.256C25.262 5.655 29.999.386 35.947.719l50.685 2.82Z"
              fill="inherit"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_799_34928">
            <path fill="#fff" transform="translate(.338)" d="M0 0h99.162v120H0z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default MonsterSelectMahjong;
