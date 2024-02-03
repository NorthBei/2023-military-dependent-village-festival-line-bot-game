import { ReactNode } from 'react';

type MahjongListContainerProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
};

function MahjongListContainer(props: MahjongListContainerProps) {
  const { title, subtitle, children } = props;

  return (
    <section className="flex flex-col gap-[20px]">
      <h1 className="mx-auto">{title}</h1>
      {subtitle && <p className="text-[12px] tracking-[0.6px]">{subtitle}</p>}
      <div className="mx-auto inline-grid w-fit grid-cols-5 gap-[8px]">{children}</div>
    </section>
  );
}

export default MahjongListContainer;
