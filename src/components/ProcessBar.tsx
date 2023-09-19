import { useMemo, useState } from 'react';
import { Tooltip } from 'react-tooltip';

import { MonsterStage } from '@/common/types';
import GiftIcon from '@/web/assets/icon-gift.svg';
import Slime from '@/web/assets/slime.svg';

const TOOLTIP_ID = 'gift-tooltip';

type ProcessBarProps = {
  status: MonsterStage;
};

function ProcessBar(props: ProcessBarProps) {
  const { status } = props;
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(status === MonsterStage.Growth);

  const processBarStatus = useMemo(() => {
    switch (status) {
      case MonsterStage.Init: {
        return '21%';
      }
      case MonsterStage.Growth: {
        return '44%';
      }
      case MonsterStage.Maternity: {
        return '72%';
      }
      case MonsterStage.Complete: {
        return '91%';
      }
    }
  }, [status]);

  return (
    <div className="relative h-[37px]">
      <Tooltip
        id={TOOLTIP_ID}
        place="bottom"
        openOnClick
        style={{
          borderRadius: '100px'
        }}
        isOpen={isTooltipOpen}
        afterShow={() => {
          // close tooltip after 5s
          setTimeout(() => setIsTooltipOpen(false), 5000);
        }}
      >
        <div className="flex items-center gap-[4px]">
          <GiftIcon className="h-[16px]" />
          <span>恭喜你可以兌換禮物！</span>
        </div>
      </Tooltip>

      <Slime
        className="absolute left-[-10px] top-[-8px] h-[30px]"
        style={{
          left: processBarStatus
        }}
      />
      <svg
        width="336"
        height="37"
        viewBox="0 0 336 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full"
      >
        <rect x="0.5" y="0.5" width="335" height="17" rx="8.5" fill="white" />
        <rect x="0.5" y="0.5" width="335" height="17" rx="8.5" stroke="#231815" />
        {[MonsterStage.Init, MonsterStage.Growth, MonsterStage.Maternity, MonsterStage.Complete].includes(status) && (
          <path
            d="M3.5 9C3.5 5.96243 5.96243 3.5 9 3.5H84.25V14.5H9C5.96243 14.5 3.5 12.0376 3.5 9Z"
            fill="#E68169"
            stroke="#231815"
          />
        )}
        {[MonsterStage.Growth, MonsterStage.Maternity, MonsterStage.Complete].includes(status) && (
          <path d="M86.25 3.5H167V14.5H86.25V3.5Z" fill="#E68169" stroke="#231815" />
        )}
        {[MonsterStage.Maternity, MonsterStage.Complete].includes(status) && (
          <path d="M169 3.5H249.75V14.5H169V3.5Z" fill="#E68169" stroke="#231815" />
        )}
        {[MonsterStage.Complete].includes(status) && (
          <path
            d="M327 14.5L251.75 14.5L251.75 3.49999L327 3.5C330.038 3.5 332.5 5.96243 332.5 9C332.5 12.0376 330.038 14.5 327 14.5Z"
            fill="#00D85A"
            stroke="#231815"
          />
        )}
        <path
          d="M29.8421 26.222H32.8101C32.8101 26.222 32.7961 26.768 32.7961 26.95C32.7401 32.634 32.6841 34.636 32.2921 35.238C32.0121 35.7 31.6901 35.854 31.2561 35.938C30.8361 36.022 30.2201 36.008 29.5621 35.994C29.5341 35.532 29.3521 34.874 29.1001 34.426C29.6601 34.468 30.1641 34.468 30.4301 34.468C30.6121 34.482 30.7381 34.426 30.8641 34.23C31.1161 33.866 31.1581 32.242 31.2141 27.762H29.8001C29.6461 31.64 29.1001 34.482 27.0001 36.316C26.7621 35.924 26.2021 35.322 25.8521 35.07C26.1041 34.86 26.3141 34.636 26.5101 34.384L25.6001 34.804C25.5721 34.636 25.5441 34.44 25.4881 34.258C21.9601 34.846 21.3301 35.014 20.9241 35.224C20.8401 34.888 20.5601 34.09 20.3501 33.656C20.7561 33.53 21.0781 33.124 21.6241 32.424C21.9741 32.018 22.7021 30.87 23.4721 29.47C21.6241 29.652 21.1901 29.75 20.8961 29.862V29.834C20.8821 29.862 20.8821 29.876 20.8821 29.904C20.7981 29.554 20.5321 28.728 20.3361 28.294C20.6161 28.196 20.8541 27.888 21.1481 27.356C21.4281 26.88 22.2961 24.92 22.7161 23.114L24.4381 23.758C23.9481 25.228 23.2481 26.768 22.5061 28.042L24.2561 27.93C24.4941 27.426 24.7181 26.922 24.9001 26.418L26.5101 27.132C25.5301 29.274 24.2701 31.36 22.9821 33.082L25.0261 32.774C24.8301 32.228 24.6061 31.668 24.3681 31.192L25.6841 30.618C26.2021 31.598 26.7201 32.83 26.9581 33.782C27.8681 32.284 28.1341 30.31 28.2041 27.762H26.5381V26.222H28.2321C28.2321 25.27 28.2321 24.234 28.2321 23.142H29.8561C29.8561 24.22 29.8561 25.256 29.8421 26.222ZM39.6001 31.64H42.0221V29.512H39.6001V31.64ZM48.5321 31.64V33.236H43.7441V36.232H42.0221V33.236H35.7221V31.64H37.9341V27.972H42.0221V26.292H39.0261C38.4521 27.286 37.7801 28.182 37.1221 28.84C36.8001 28.56 36.0861 28 35.6801 27.762C36.9401 26.698 38.0181 24.906 38.6201 23.1L40.3141 23.534C40.1881 23.926 40.0341 24.304 39.8521 24.682H47.7621V26.292H43.7441V27.972H47.4401V29.512H43.7441V31.64H48.5321ZM53.7401 30.492V31.444H55.4761V30.492H53.7401ZM55.4761 26.25H53.7401V27.062H55.4761V26.25ZM53.7401 28.336V29.218H55.4761V28.336H53.7401ZM57.8561 31.444V32.9H50.9821V31.444H52.2421V26.25H51.1501V24.794H52.2421V23.31H53.7401V24.794H55.4761V23.31H57.0021V24.794H57.9541V26.25H57.0021V31.444H57.8561ZM52.7181 32.998L54.2721 33.46C53.7821 34.482 52.9561 35.574 52.2001 36.26C51.8921 35.966 51.2481 35.49 50.8701 35.266C51.5981 34.72 52.3261 33.838 52.7181 32.998ZM59.9701 30.1H62.0001V28.378H59.9841V28.896C59.9841 29.26 59.9841 29.666 59.9701 30.1ZM62.0001 25.27H59.9841V26.908H62.0001V25.27ZM63.6101 23.758V34.37C63.6101 35.196 63.4561 35.63 62.9661 35.896C62.4761 36.162 61.7621 36.204 60.7261 36.19C60.6701 35.756 60.4601 35.028 60.2501 34.608C60.8521 34.65 61.5241 34.636 61.7201 34.636C61.9301 34.636 62.0001 34.566 62.0001 34.342V31.584H59.8721C59.7181 33.236 59.3681 34.986 58.6121 36.246C58.3461 35.952 57.6601 35.448 57.2961 35.308C57.3381 35.224 57.3941 35.154 57.4361 35.07L56.2741 35.728C55.9941 35.182 55.3221 34.258 54.7761 33.614L56.0361 32.928C56.5401 33.488 57.1981 34.258 57.5481 34.832C58.3601 33.082 58.4301 30.716 58.4301 28.896V23.758H63.6101Z"
          fill="#231815"
        />
        <path
          d="M109.71 27.608L111.376 28.014C110.802 29.834 109.976 31.458 108.968 32.816C109.374 33.824 109.822 34.412 110.27 34.412C110.606 34.412 110.774 33.712 110.844 31.962C111.222 32.354 111.81 32.718 112.258 32.9C111.992 35.49 111.432 36.106 110.13 36.106C109.15 36.106 108.38 35.406 107.764 34.258C107.05 35 106.266 35.63 105.398 36.162C105.146 35.798 104.544 35.112 104.194 34.79C105.272 34.202 106.238 33.432 107.05 32.522C106.574 30.94 106.266 28.98 106.084 26.88H102.024V28.378H105.482C105.482 28.378 105.468 28.812 105.468 29.008C105.426 31.948 105.342 33.194 105.02 33.6C104.754 33.964 104.474 34.09 104.054 34.16C103.69 34.216 103.088 34.216 102.444 34.202C102.416 33.712 102.234 33.068 101.982 32.648C102.486 32.69 102.962 32.704 103.186 32.704C103.382 32.704 103.494 32.676 103.606 32.536C103.746 32.34 103.802 31.668 103.844 29.904H102.024C101.968 31.948 101.674 34.678 100.526 36.386C100.232 36.064 99.4901 35.448 99.1121 35.252C100.176 33.572 100.274 31.136 100.274 29.316V25.228H105.986C105.958 24.542 105.93 23.856 105.93 23.156H107.68C107.666 23.856 107.68 24.542 107.708 25.228H109.85C109.332 24.808 108.632 24.36 108.058 24.01L109.066 23.016C109.836 23.408 110.858 24.052 111.348 24.514L110.676 25.228H112.132V26.88H107.806C107.932 28.28 108.128 29.596 108.366 30.716C108.912 29.778 109.374 28.742 109.71 27.608ZM125.446 31.276H122.254C122.562 31.808 122.94 32.27 123.388 32.69C124.102 32.256 124.886 31.738 125.446 31.276ZM125.936 31.276L127.014 32.018C126.244 32.578 125.362 33.124 124.55 33.558C125.432 34.09 126.482 34.468 127.742 34.706C127.378 35.042 126.916 35.742 126.692 36.19C123.57 35.476 121.694 33.852 120.504 31.276H118.502V34.244L121.568 33.628C121.484 34.076 121.428 34.762 121.428 35.112C118.082 35.854 117.312 36.036 116.934 36.204L116.85 36.274C116.738 35.882 116.416 35.014 116.15 34.622C116.458 34.454 116.864 34.118 116.864 33.544V31.276H114.82V29.806H117.144V23.618H125.978V24.976H118.852V25.746H125.586V27.034H118.852V27.762H125.586V29.05H118.852V29.806H127.448V31.276H125.936ZM132.74 30.492V31.444H134.476V30.492H132.74ZM134.476 26.25H132.74V27.062H134.476V26.25ZM132.74 28.336V29.218H134.476V28.336H132.74ZM136.856 31.444V32.9H129.982V31.444H131.242V26.25H130.15V24.794H131.242V23.31H132.74V24.794H134.476V23.31H136.002V24.794H136.954V26.25H136.002V31.444H136.856ZM131.718 32.998L133.272 33.46C132.782 34.482 131.956 35.574 131.2 36.26C130.892 35.966 130.248 35.49 129.87 35.266C130.598 34.72 131.326 33.838 131.718 32.998ZM138.97 30.1H141V28.378H138.984V28.896C138.984 29.26 138.984 29.666 138.97 30.1ZM141 25.27H138.984V26.908H141V25.27ZM142.61 23.758V34.37C142.61 35.196 142.456 35.63 141.966 35.896C141.476 36.162 140.762 36.204 139.726 36.19C139.67 35.756 139.46 35.028 139.25 34.608C139.852 34.65 140.524 34.636 140.72 34.636C140.93 34.636 141 34.566 141 34.342V31.584H138.872C138.718 33.236 138.368 34.986 137.612 36.246C137.346 35.952 136.66 35.448 136.296 35.308C136.338 35.224 136.394 35.154 136.436 35.07L135.274 35.728C134.994 35.182 134.322 34.258 133.776 33.614L135.036 32.928C135.54 33.488 136.198 34.258 136.548 34.832C137.36 33.082 137.43 30.716 137.43 28.896V23.758H142.61Z"
          fill="#231815"
        />
        <g data-tooltip-id={TOOLTIP_ID}>
          <path
            d="M188.71 27.608L190.376 28.014C189.802 29.834 188.976 31.458 187.968 32.816C188.374 33.824 188.822 34.412 189.27 34.412C189.606 34.412 189.774 33.712 189.844 31.962C190.222 32.354 190.81 32.718 191.258 32.9C190.992 35.49 190.432 36.106 189.13 36.106C188.15 36.106 187.38 35.406 186.764 34.258C186.05 35 185.266 35.63 184.398 36.162C184.146 35.798 183.544 35.112 183.194 34.79C184.272 34.202 185.238 33.432 186.05 32.522C185.574 30.94 185.266 28.98 185.084 26.88H181.024V28.378H184.482C184.482 28.378 184.468 28.812 184.468 29.008C184.426 31.948 184.342 33.194 184.02 33.6C183.754 33.964 183.474 34.09 183.054 34.16C182.69 34.216 182.088 34.216 181.444 34.202C181.416 33.712 181.234 33.068 180.982 32.648C181.486 32.69 181.962 32.704 182.186 32.704C182.382 32.704 182.494 32.676 182.606 32.536C182.746 32.34 182.802 31.668 182.844 29.904H181.024C180.968 31.948 180.674 34.678 179.526 36.386C179.232 36.064 178.49 35.448 178.112 35.252C179.176 33.572 179.274 31.136 179.274 29.316V25.228H184.986C184.958 24.542 184.93 23.856 184.93 23.156H186.68C186.666 23.856 186.68 24.542 186.708 25.228H188.85C188.332 24.808 187.632 24.36 187.058 24.01L188.066 23.016C188.836 23.408 189.858 24.052 190.348 24.514L189.676 25.228H191.132V26.88H186.806C186.932 28.28 187.128 29.596 187.366 30.716C187.912 29.778 188.374 28.742 188.71 27.608ZM200.26 24.08V25.172H193.778V24.08H196.41C196.312 23.814 196.172 23.534 196.046 23.324L197.558 22.974C197.768 23.31 197.992 23.73 198.132 24.08H200.26ZM195.934 26.46V27.118H198.216V26.46H195.934ZM199.644 27.972H194.576V25.592H199.644V27.972ZM195.402 36.148L193.834 35.546C194.394 34.986 194.982 34.034 195.29 33.138L196.886 33.53C196.564 34.44 196.004 35.49 195.402 36.148ZM197.866 31.29V31.864C197.866 32.508 197.74 32.774 197.292 32.942C196.844 33.124 196.242 33.124 195.43 33.124C195.346 32.746 195.15 32.312 194.982 31.99C195.472 32.018 195.99 32.018 196.144 32.018C196.312 32.004 196.354 31.976 196.354 31.822V31.374C195.444 31.43 194.576 31.472 193.862 31.514L193.764 30.38C194.478 30.352 195.388 30.31 196.354 30.268V29.68H196.396C196.62 29.596 196.872 29.484 197.11 29.372H194.24V28.392H198.72L199 28.322L199.812 29.008C199.238 29.4 198.552 29.778 197.866 30.086V30.184L200.036 30.072L200.022 31.15L197.866 31.29ZM197.712 33.628L199.266 33.474C199.448 34.258 199.588 35.28 199.602 35.896L197.936 36.106C197.936 35.476 197.852 34.426 197.712 33.628ZM200.582 33.614L202.164 33.362C202.486 34.118 202.808 35.126 202.92 35.77L201.24 36.092C201.156 35.448 200.876 34.398 200.582 33.614ZM203.788 26.614H202.99C202.99 27.398 202.948 28.168 202.794 28.952C203.214 29.274 203.592 29.61 203.872 29.904C203.816 29.022 203.802 27.916 203.788 26.614ZM202.99 25.214H205.3C205.258 29.428 205.202 31.528 205.664 31.528C205.832 31.528 205.888 30.73 205.902 29.806C206.168 30.142 206.518 30.576 206.812 30.786C206.7 32.298 206.434 32.956 205.552 32.956C204.488 32.956 204.068 32.074 203.9 30.268L203.2 31.388C202.976 31.108 202.668 30.8 202.318 30.492C201.912 31.458 201.226 32.382 200.176 33.194C199.938 32.872 199.448 32.466 199.098 32.214C200.176 31.374 200.778 30.436 201.114 29.47C200.694 29.134 200.274 28.84 199.868 28.574L200.638 27.426C200.904 27.594 201.184 27.776 201.464 27.958C201.52 27.496 201.534 27.062 201.534 26.614H200.358V25.214H201.534V23.128H202.99V25.214ZM203.438 33.572L204.992 33.18C205.496 33.95 206.084 35.042 206.35 35.742L204.67 36.204C204.488 35.504 203.928 34.398 203.438 33.572ZM211.74 30.492V31.444H213.476V30.492H211.74ZM213.476 26.25H211.74V27.062H213.476V26.25ZM211.74 28.336V29.218H213.476V28.336H211.74ZM215.856 31.444V32.9H208.982V31.444H210.242V26.25H209.15V24.794H210.242V23.31H211.74V24.794H213.476V23.31H215.002V24.794H215.954V26.25H215.002V31.444H215.856ZM210.718 32.998L212.272 33.46C211.782 34.482 210.956 35.574 210.2 36.26C209.892 35.966 209.248 35.49 208.87 35.266C209.598 34.72 210.326 33.838 210.718 32.998ZM217.97 30.1H220V28.378H217.984V28.896C217.984 29.26 217.984 29.666 217.97 30.1ZM220 25.27H217.984V26.908H220V25.27ZM221.61 23.758V34.37C221.61 35.196 221.456 35.63 220.966 35.896C220.476 36.162 219.762 36.204 218.726 36.19C218.67 35.756 218.46 35.028 218.25 34.608C218.852 34.65 219.524 34.636 219.72 34.636C219.93 34.636 220 34.566 220 34.342V31.584H217.872C217.718 33.236 217.368 34.986 216.612 36.246C216.346 35.952 215.66 35.448 215.296 35.308C215.338 35.224 215.394 35.154 215.436 35.07L214.274 35.728C213.994 35.182 213.322 34.258 212.776 33.614L214.036 32.928C214.54 33.488 215.198 34.258 215.548 34.832C216.36 33.082 216.43 30.716 216.43 28.896V23.758H221.61Z"
            fill="#231815"
          />
          <g clipPath="url(#clip0_0_1)">
            <path
              d="M228.077 25.5976C227.872 25.103 227.829 24.6247 228.029 24.1363C228.179 23.7692 228.421 23.4814 228.755 23.2745C229.305 22.9331 230.204 22.797 231.002 23.5483C231.75 22.8188 232.719 22.888 233.353 23.3445C233.955 23.7777 234.343 24.6612 233.923 25.5813C233.948 25.6186 233.988 25.6039 234.021 25.6039C234.27 25.6039 234.52 25.6007 234.769 25.6007C235.216 25.6007 235.663 25.6031 236.11 25.6031C236.44 25.6031 236.726 25.7205 236.965 25.9414C237.184 26.1428 237.321 26.3925 237.359 26.6903C237.37 26.7736 237.377 26.8576 237.377 26.9416C237.378 27.4829 237.384 28.0242 237.375 28.5647C237.367 29.0679 237.139 29.4497 236.701 29.701C236.687 29.7087 236.673 29.7196 236.657 29.722C236.577 29.736 236.56 29.785 236.56 29.8619C236.563 31.3365 236.563 32.8103 236.564 34.2849C236.564 34.7065 236.554 35.1272 236.564 35.5487C236.578 36.118 236.194 36.7877 235.463 36.958C235.356 36.9829 235.248 36.9992 235.137 36.9992C232.502 36.9984 229.868 36.9984 227.234 36.9984C227.104 36.9984 226.975 37 226.845 36.9984C226.245 36.9899 225.725 36.6111 225.525 36.0659C225.472 35.9189 225.439 35.7681 225.439 35.611C225.438 35.0051 225.435 34.3993 225.434 33.7934C225.434 32.5132 225.434 31.2339 225.434 29.9537C225.434 29.9343 225.434 29.9148 225.434 29.8954C225.434 29.813 225.42 29.7391 225.32 29.7212C224.891 29.4692 224.635 29.1044 224.627 28.5958C224.619 28.0094 224.615 27.423 224.628 26.8366C224.637 26.3886 224.843 26.037 225.221 25.7936C225.35 25.7112 225.489 25.6474 225.641 25.621C225.723 25.6062 225.808 25.6007 225.892 25.6007C226.578 25.6007 227.265 25.6023 227.953 25.6031C227.987 25.6031 228.022 25.6 228.076 25.5976H228.077ZM231.507 35.9843C231.533 35.9874 231.549 35.9905 231.565 35.9905C231.684 35.9905 231.804 35.9905 231.924 35.9905C232.996 35.9905 234.068 35.9905 235.141 35.9905C235.356 35.9905 235.511 35.8591 235.542 35.6467C235.552 35.5767 235.552 35.5044 235.552 35.4336C235.552 33.6231 235.552 31.8117 235.552 30.0012C235.552 29.9786 235.552 29.9561 235.55 29.9335C235.549 29.8884 235.53 29.8619 235.48 29.8612C235.389 29.8596 235.298 29.8511 235.208 29.8503C234.903 29.8479 234.599 29.8479 234.294 29.8479C233.4 29.8479 232.506 29.8487 231.612 29.8503C231.506 29.8503 231.502 29.8557 231.503 29.9592C231.503 29.9817 231.503 30.0043 231.503 30.0268C231.503 31.9766 231.505 33.9272 231.505 35.8769C231.505 35.9088 231.505 35.9415 231.505 35.9835L231.507 35.9843ZM226.455 29.8526C226.452 29.8931 226.448 29.9179 226.448 29.9428C226.448 31.7277 226.448 33.5126 226.448 35.2975C226.448 35.4111 226.449 35.5239 226.452 35.6374C226.454 35.7035 226.477 35.7626 226.516 35.8171C226.606 35.9399 226.728 35.9913 226.876 35.9913C228.046 35.9913 229.215 35.9913 230.385 35.9913C230.417 35.9913 230.448 35.9913 230.488 35.9913C230.491 35.9508 230.495 35.9189 230.495 35.8878C230.495 35.8163 230.494 35.7455 230.494 35.674C230.494 33.8113 230.494 31.9486 230.494 30.0859C230.494 30.0408 230.494 29.9949 230.493 29.9498C230.49 29.8736 230.483 29.8651 230.41 29.8627C230.222 29.8573 230.034 29.8495 229.847 29.8487C228.972 29.8472 228.097 29.8479 227.222 29.8487C226.97 29.8487 226.718 29.8511 226.453 29.8526H226.455ZM230.483 28.8563C230.487 28.8143 230.494 28.7832 230.494 28.7521C230.494 28.091 230.495 27.4307 230.493 26.7697C230.493 26.6219 230.523 26.6172 230.339 26.6172C228.901 26.6172 227.462 26.6157 226.024 26.6149C225.972 26.6149 225.919 26.611 225.869 26.6203C225.819 26.6297 225.768 26.6445 225.726 26.6709C225.651 26.7183 225.632 26.7946 225.632 26.8817C225.634 27.4354 225.633 27.9899 225.633 28.5437C225.633 28.5662 225.633 28.5896 225.634 28.6114C225.644 28.7008 225.683 28.7669 225.77 28.8089C225.849 28.8478 225.931 28.8532 226.015 28.8532C227.43 28.8532 228.846 28.8548 230.262 28.8556C230.333 28.8556 230.403 28.8556 230.483 28.8556V28.8563ZM231.509 26.6328V28.8377C231.534 28.8439 231.555 28.8524 231.576 28.8532C231.667 28.8556 231.757 28.8563 231.848 28.8563C233.187 28.8563 234.525 28.8563 235.863 28.8563C235.928 28.8563 235.993 28.8579 236.058 28.8532C236.281 28.8361 236.369 28.7405 236.369 28.5165C236.369 27.9946 236.369 27.4735 236.369 26.9517C236.369 26.9159 236.368 26.8801 236.362 26.8451C236.341 26.7199 236.239 26.6079 236.093 26.6172C236.019 26.6219 235.943 26.6149 235.869 26.6149C234.871 26.6149 233.874 26.6149 232.876 26.6149C232.471 26.6149 232.066 26.618 231.661 26.6203C231.613 26.6203 231.565 26.6281 231.511 26.6328H231.509ZM231.519 25.5945C231.566 25.5961 231.614 25.6 231.66 25.5992C231.903 25.5969 232.145 25.6054 232.387 25.5883C232.854 25.5556 233.27 25.0408 233.034 24.4831C232.85 24.0476 232.216 23.8314 231.782 24.1954C231.605 24.3431 231.502 24.5298 231.507 24.7686C231.512 25.0237 231.509 25.2795 231.509 25.5354C231.509 25.551 231.515 25.5665 231.519 25.5937L231.519 25.5945ZM230.015 25.5945C230.015 25.5945 230.015 25.5992 230.015 25.6015C230.144 25.6015 230.273 25.6031 230.403 25.6015C230.483 25.6007 230.491 25.5914 230.492 25.5097C230.492 25.2826 230.494 25.0563 230.49 24.83C230.489 24.7429 230.483 24.6535 230.461 24.571C230.426 24.4442 230.352 24.3354 230.256 24.2459C230.07 24.0709 229.848 23.9823 229.591 24.018C229.191 24.0733 228.884 24.452 228.898 24.83C228.915 25.2928 229.292 25.5619 229.617 25.593C229.749 25.6062 229.882 25.5953 230.015 25.5953L230.015 25.5945Z"
              fill="#231815"
            />
          </g>
        </g>
        <path
          d="M276.954 28.126L276.058 28.42C276.03 28.266 276.002 28.098 275.96 27.902C274.294 28.14 273.986 28.224 273.776 28.336C273.734 28.126 273.566 27.664 273.468 27.398C273.678 27.356 273.888 27.188 274.14 26.908C274.224 26.796 274.42 26.572 274.658 26.278C274.014 26.39 273.804 26.446 273.664 26.516C273.608 26.306 273.44 25.788 273.314 25.522C273.482 25.48 273.636 25.34 273.79 25.102C273.93 24.892 274.42 24.01 274.658 23.17L275.666 23.59C275.414 24.22 275.05 24.892 274.672 25.424L275.288 25.354C275.456 25.088 275.596 24.822 275.736 24.542L276.688 24.976C276.184 25.774 275.582 26.558 275.008 27.202L275.764 27.118C275.708 26.922 275.638 26.726 275.582 26.558L276.436 26.334C276.66 26.908 276.87 27.692 276.954 28.126ZM273.538 28.154L272.74 28.448C272.726 28.28 272.698 28.07 272.656 27.846C271.242 28.07 270.92 28.168 270.738 28.252C270.696 28.042 270.528 27.58 270.416 27.328C270.626 27.286 270.822 27.118 271.06 26.838C271.158 26.74 271.34 26.516 271.536 26.236C271.032 26.32 270.85 26.376 270.724 26.432C270.668 26.222 270.5 25.704 270.374 25.438C270.542 25.41 270.682 25.27 270.822 25.046C270.962 24.836 271.424 24.01 271.606 23.212L272.642 23.632C272.404 24.22 272.068 24.836 271.732 25.34L272.152 25.284C272.292 25.06 272.418 24.822 272.53 24.584L273.468 25.018C273.034 25.76 272.488 26.502 271.942 27.132L272.488 27.076C272.446 26.922 272.418 26.782 272.376 26.656L273.146 26.418C273.314 26.992 273.496 27.72 273.538 28.154ZM266.258 30.282L267.35 30.142C267.266 29.764 267.182 29.372 267.084 29.05C266.818 29.47 266.538 29.89 266.258 30.282ZM268.764 31.626L267.672 31.934C267.658 31.766 267.63 31.556 267.588 31.332C265.432 31.654 265.012 31.766 264.746 31.892C264.662 31.654 264.452 30.968 264.298 30.618C264.606 30.534 264.872 30.198 265.264 29.652C265.418 29.442 265.712 28.994 266.048 28.392C265.11 28.504 264.816 28.588 264.634 28.672C264.564 28.392 264.34 27.762 264.186 27.412C264.424 27.356 264.648 27.062 264.872 26.628C265.11 26.222 265.824 24.612 266.188 23.1L267.504 23.618C267.112 24.822 266.538 26.11 265.922 27.16L266.734 27.104C267.028 26.46 267.336 25.774 267.588 25.102L268.806 25.802C268.344 26.824 267.798 27.888 267.182 28.882L268.078 28.658C268.372 29.624 268.666 30.87 268.764 31.626ZM264.774 32.34L265.936 32.522C265.824 33.824 265.614 35.21 265.334 36.092C265.082 35.966 264.508 35.798 264.2 35.714C264.522 34.832 264.69 33.53 264.774 32.34ZM266.132 32.522L267.126 32.368C267.294 33.404 267.42 34.748 267.448 35.658L266.398 35.84C266.398 34.93 266.286 33.572 266.132 32.522ZM267.336 32.27L268.274 32.004C268.54 32.886 268.82 34.034 268.932 34.79L267.966 35.098C267.868 34.328 267.602 33.152 267.336 32.27ZM270.36 34.58H277.36V35.868H268.974V23.59H270.36V28.49H277.024V29.666H275.078L275.652 29.918C275.442 30.436 275.148 30.94 274.84 31.388L275.47 31.318C275.61 31.094 275.75 30.856 275.862 30.618L276.786 31.066C276.31 31.864 275.722 32.634 275.148 33.278L275.89 33.194C275.834 32.984 275.764 32.788 275.708 32.606L276.548 32.368C276.772 32.956 276.982 33.726 277.066 34.174L276.17 34.468C276.156 34.328 276.128 34.16 276.086 33.978C274.42 34.216 274.098 34.3 273.902 34.412C273.846 34.202 273.692 33.74 273.58 33.474C273.804 33.432 274.014 33.25 274.238 32.984C274.364 32.858 274.602 32.578 274.868 32.214C274.168 32.326 273.944 32.41 273.818 32.48C273.748 32.256 273.594 31.794 273.468 31.528C273.636 31.5 273.776 31.36 273.916 31.178C274.028 30.996 274.406 30.366 274.63 29.666H271.844L272.572 29.96C272.376 30.436 272.096 30.898 271.816 31.29L272.306 31.248C272.418 31.052 272.516 30.87 272.614 30.674L273.552 31.094C273.118 31.85 272.572 32.592 272.012 33.208L272.544 33.152C272.502 32.998 272.474 32.858 272.432 32.732L273.188 32.494C273.37 33.068 273.552 33.782 273.594 34.23L272.796 34.524C272.782 34.356 272.754 34.16 272.712 33.936C271.298 34.146 270.99 34.244 270.794 34.328C270.752 34.118 270.598 33.656 270.472 33.404C270.682 33.362 270.892 33.18 271.13 32.928C271.228 32.802 271.466 32.522 271.704 32.158C271.116 32.27 270.906 32.326 270.78 32.396C270.724 32.186 270.57 31.71 270.444 31.458C270.598 31.43 270.738 31.304 270.864 31.122C270.99 30.954 271.382 30.324 271.578 29.666H270.36V34.58ZM287.664 25.284V24.808H284.332V23.744H287.664V23.142H289.288V23.744H292.452V24.808H289.288V25.284H292.018V26.278H284.85V25.284H287.664ZM285.746 27.678V28.518H286.754V27.678H285.746ZM291.01 28.518V27.678H290.114V28.518H291.01ZM287.986 28.518H288.896V27.678H287.986V28.518ZM284.388 29.526V26.67H292.438V29.526H284.388ZM284.654 31.57L283.478 31.948C283.45 31.752 283.422 31.528 283.38 31.276C280.902 31.64 280.44 31.766 280.146 31.906C280.062 31.626 279.838 30.926 279.67 30.548C280.006 30.478 280.286 30.142 280.706 29.61C280.874 29.4 281.182 28.966 281.56 28.378C280.538 28.504 280.244 28.574 280.034 28.672C279.964 28.392 279.726 27.72 279.572 27.37C279.824 27.3 280.048 27.02 280.314 26.586C280.58 26.194 281.392 24.598 281.84 23.128L283.198 23.66C282.736 24.808 282.12 26.04 281.476 27.062L282.372 26.992C282.694 26.39 283.016 25.746 283.282 25.102L284.542 25.858C283.8 27.356 282.834 28.896 281.826 30.17L283.114 30.016C283.016 29.638 282.918 29.26 282.806 28.938L283.912 28.644C284.234 29.596 284.556 30.828 284.654 31.57ZM280.174 32.34L281.434 32.536C281.322 33.852 281.098 35.252 280.804 36.148C280.524 35.994 279.922 35.812 279.586 35.728C279.908 34.846 280.09 33.558 280.174 32.34ZM281.644 32.508L282.736 32.312C282.904 33.348 283.03 34.65 283.058 35.532L281.882 35.742C281.882 34.86 281.77 33.544 281.644 32.508ZM282.946 32.242L283.968 31.948C284.234 32.732 284.542 33.768 284.654 34.454L283.59 34.818C283.478 34.118 283.198 33.054 282.946 32.242ZM286.362 32.858V33.306H290.422V32.858H286.362ZM286.362 31.836V32.256H290.422V31.836H286.362ZM286.362 30.8V31.22H290.422V30.8H286.362ZM291.976 34.146H290.156C291.094 34.454 292.046 34.818 292.676 35.07L292.018 36.232C291.276 35.882 290.058 35.378 288.994 34.986L289.456 34.146H287.384L288.224 34.972C287.118 35.448 285.718 35.966 284.696 36.302C284.57 35.994 284.318 35.49 284.122 35.154C284.892 34.902 285.97 34.524 286.768 34.146H284.892V29.946H291.976V34.146ZM301.342 26.6V23.296H302.868V29.386C302.868 32.186 302.504 34.636 299.746 36.162C299.494 35.812 298.92 35.252 298.57 35C300.222 34.118 300.908 32.942 301.174 31.556C300.628 32.004 300.054 32.452 299.55 32.844L298.696 31.444C299.354 31.052 300.348 30.394 301.314 29.75L301.342 29.806V29.372V27.944L300.516 28.448C300.292 27.748 299.788 26.684 299.298 25.844V27.328H298.136V29.134L299.2 28.742L299.508 30.212C299.06 30.394 298.598 30.562 298.136 30.73V34.454C298.136 35.224 297.996 35.644 297.576 35.91C297.156 36.176 296.554 36.232 295.644 36.218C295.602 35.812 295.42 35.126 295.21 34.678C295.728 34.706 296.204 34.706 296.372 34.692C296.54 34.692 296.61 34.636 296.61 34.454V31.318L295.322 31.794L294.916 30.226C295.392 30.072 295.966 29.89 296.61 29.666V27.328H295.098V25.788H296.61V23.156H298.136V25.788H299.27L299.144 25.578L300.376 24.906C300.712 25.41 301.048 26.04 301.342 26.6ZM305.668 34.594H306.452C306.732 34.594 306.788 34.188 306.83 32.774C307.194 33.054 307.796 33.334 308.23 33.432C308.076 35.336 307.698 36.078 306.592 36.078H305.374C304.114 36.078 303.764 35.588 303.764 33.838V23.296H305.332V27.384C305.752 26.572 306.214 25.536 306.466 24.738L307.95 25.494C307.376 26.53 306.746 27.706 306.228 28.448L305.332 27.944V29.512L305.738 29.12C306.648 29.876 307.726 30.912 308.244 31.584L307.18 32.76C306.788 32.2 306.06 31.388 305.332 30.674V33.852C305.332 34.496 305.374 34.594 305.668 34.594ZM323.406 25.69L322.076 26.418C321.852 25.774 321.292 24.738 320.76 23.996L322.02 23.338C322.566 24.066 323.196 25.032 323.406 25.69ZM316.392 25.452V24.542H315.65V25.452H316.392ZM317.638 23.506V26.502H314.474V23.506H317.638ZM312.738 25.452V24.542H312.01V25.452H312.738ZM313.956 23.506V26.502H310.82V23.506H313.956ZM312.332 30.128V30.884H313.494V30.128H312.332ZM312.332 28.252V28.98H313.494V28.252H312.332ZM316.084 28.98V28.252H314.894V28.98H316.084ZM316.084 30.884V30.128H314.894V30.884H316.084ZM317.876 34.258H314.978V36.218H313.396V34.258H310.414V32.802H313.396V32.102H310.96V27.034H317.526V32.102H314.978V32.802H317.876V34.258ZM321.964 28.462L323.224 29.162C322.79 30.506 322.118 31.822 321.292 32.984C321.53 33.768 321.796 34.216 322.09 34.244C322.314 34.244 322.468 33.586 322.538 32.326C322.804 32.69 323.476 33.11 323.742 33.264C323.392 35.7 322.678 36.246 322.076 36.232C321.236 36.19 320.592 35.546 320.116 34.412C319.472 35.084 318.758 35.644 317.988 36.078C317.708 35.7 317.218 35.224 316.784 34.916C317.834 34.426 318.786 33.656 319.598 32.732C319.332 31.598 319.136 30.212 318.996 28.63L317.834 28.77L317.666 27.23L318.884 27.076C318.814 25.886 318.758 24.598 318.73 23.226H320.312C320.326 24.5 320.368 25.746 320.438 26.894L323.42 26.53L323.588 28.056L320.564 28.434C320.648 29.358 320.746 30.212 320.858 30.968C321.32 30.17 321.698 29.316 321.964 28.462Z"
          fill="#231815"
        />
        <defs>
          <clipPath id="clip0_0_1">
            <rect width="12.7595" height="14" fill="white" transform="translate(224.62 23)" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default ProcessBar;
