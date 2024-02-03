import { ReactNode, useMemo } from 'react';

import { MonsterStage, MonsterType } from '@/common/types';

import MonsterSaltyLevel1 from './MonsterSaltyLevel1';
import MonsterSaltyLevel2 from './MonsterSaltyLevel2';
import MonsterSaltyLevel3 from './MonsterSaltyLevel3';
import MonsterSourLevel1 from './MonsterSourLevel1';
import MonsterSourLevel2 from './MonsterSourLevel2';
import MonsterSourLevel3 from './MonsterSourLevel3';
import MonsterSpicyLevel1 from './MonsterSpicyLevel1';
import MonsterSpicyLevel2 from './MonsterSpicyLevel2';
import MonsterSpicyLevel3 from './MonsterSpicyLevel3';
import MonsterSweetLevel1 from './MonsterSweetLevel1';
import MonsterSweetLevel2 from './MonsterSweetLevel2';
import MonsterSweetLevel3 from './MonsterSweetLevel3';
// import MonsterSaltyLevel1 from '@/web/assets/monster-salty-level1.svg?url';
// import MonsterSaltyLevel2 from '@/web/assets/monster-salty-level2.svg?url';
// import MonsterSaltyLevel3 from '@/web/assets/monster-salty-level3.svg?url';
// import MonsterSourLevel1 from '@/web/assets/monster-sour-level1.svg?url';
// import MonsterSourLevel2 from '@/web/assets/monster-sour-level2.svg?url';
// import MonsterSourLevel3 from '@/web/assets/monster-sour-level3.svg?url';
// import MonsterSpicyLevel1 from '@/web/assets/monster-spicy-level1.svg?url';
// import MonsterSpicyLevel2 from '@/web/assets/monster-spicy-level2.svg?url';
// import MonsterSpicyLevel3 from '@/web/assets/monster-spicy-level3.svg?url';
// import MonsterSweetLevel1 from '@/web/assets/monster-sweet-level1.svg?url';
// import MonsterSweetLevel2 from '@/web/assets/monster-sweet-level2.svg?url';
// import MonsterSweetLevel3 from '@/web/assets/monster-sweet-level3.svg?url';

type MonstersType = Record<
  MonsterType,
  Record<MonsterStage, (...props: Parameters<typeof MonsterSaltyLevel1>) => ReactNode>
>;

const monsters: MonstersType = {
  [MonsterType.Salty]: {
    [MonsterStage.Init]: MonsterSaltyLevel1,
    [MonsterStage.Growth]: MonsterSaltyLevel2,
    [MonsterStage.GiftRedeem]: MonsterSaltyLevel3,
    [MonsterStage.Maternity]: MonsterSaltyLevel3
  },
  [MonsterType.Sour]: {
    [MonsterStage.Init]: MonsterSourLevel1,
    [MonsterStage.Growth]: MonsterSourLevel2,
    [MonsterStage.GiftRedeem]: MonsterSourLevel3,
    [MonsterStage.Maternity]: MonsterSourLevel3
  },
  [MonsterType.Spicy]: {
    [MonsterStage.Init]: MonsterSpicyLevel1,
    [MonsterStage.Growth]: MonsterSpicyLevel2,
    [MonsterStage.GiftRedeem]: MonsterSpicyLevel3,
    [MonsterStage.Maternity]: MonsterSpicyLevel3
  },
  [MonsterType.Sweet]: {
    [MonsterStage.Init]: MonsterSweetLevel1,
    [MonsterStage.Growth]: MonsterSweetLevel2,
    [MonsterStage.GiftRedeem]: MonsterSweetLevel3,
    [MonsterStage.Maternity]: MonsterSweetLevel3
  }
};

type MonsterImageProps = {
  name: string;
  type: MonsterType;
  stage: MonsterStage;
};

function MonsterImage(props: MonsterImageProps) {
  const { name, type, stage } = props;

  const MonsterImage = useMemo(() => {
    return monsters[type][stage];
  }, [type, stage]);

  return (
    <div className="mx-auto h-[503px] w-[282px]">
      <MonsterImage name={name} />
    </div>
  );
}

export default MonsterImage;
