import Image from 'next/image';
import { useMemo } from 'react';

import { MonsterStage, MonsterType } from '@/common/types';
import MonsterSaltyLevel1 from '@/web/assets/monster-salty-level1.svg?url';
import MonsterSaltyLevel2 from '@/web/assets/monster-salty-level2.svg?url';
import MonsterSaltyLevel3 from '@/web/assets/monster-salty-level3.svg?url';
import MonsterSourLevel1 from '@/web/assets/monster-sour-level1.svg?url';
import MonsterSourLevel2 from '@/web/assets/monster-sour-level2.svg?url';
import MonsterSourLevel3 from '@/web/assets/monster-sour-level3.svg?url';
import MonsterSpicyLevel1 from '@/web/assets/monster-spicy-level1.svg?url';
import MonsterSpicyLevel2 from '@/web/assets/monster-spicy-level2.svg?url';
import MonsterSpicyLevel3 from '@/web/assets/monster-spicy-level3.svg?url';
import MonsterSweetLevel1 from '@/web/assets/monster-sweet-level1.svg?url';
import MonsterSweetLevel2 from '@/web/assets/monster-sweet-level2.svg?url';
import MonsterSweetLevel3 from '@/web/assets/monster-sweet-level3.svg?url';

type MonstersType = Record<MonsterType, Record<MonsterStage, string>>;

const monsters: MonstersType = {
  [MonsterType.Salty]: {
    [MonsterStage.Init]: MonsterSaltyLevel1.src,
    [MonsterStage.Growth]: MonsterSaltyLevel2.src,
    [MonsterStage.Maternity]: MonsterSaltyLevel3.src,
    [MonsterStage.Complete]: MonsterSaltyLevel3.src
  },
  [MonsterType.Sour]: {
    [MonsterStage.Init]: MonsterSourLevel1.src,
    [MonsterStage.Growth]: MonsterSourLevel2.src,
    [MonsterStage.Maternity]: MonsterSourLevel3.src,
    [MonsterStage.Complete]: MonsterSourLevel3.src
  },
  [MonsterType.Spicy]: {
    [MonsterStage.Init]: MonsterSpicyLevel1.src,
    [MonsterStage.Growth]: MonsterSpicyLevel2.src,
    [MonsterStage.Maternity]: MonsterSpicyLevel3.src,
    [MonsterStage.Complete]: MonsterSpicyLevel3.src
  },
  [MonsterType.Sweet]: {
    [MonsterStage.Init]: MonsterSweetLevel1.src,
    [MonsterStage.Growth]: MonsterSweetLevel2.src,
    [MonsterStage.Maternity]: MonsterSweetLevel3.src,
    [MonsterStage.Complete]: MonsterSweetLevel3.src
  }
};

type MonsterImageProps = {
  type: MonsterType;
  stage: MonsterStage;
};

function MonsterImage(props: MonsterImageProps) {
  const { type, stage } = props;

  const monsterImage = useMemo(() => {
    return monsters[type][stage];
  }, [type, stage]);

  return <Image src={monsterImage} alt="Your Monster" width={280} height={505} className="mx-auto" />;
}

export default MonsterImage;
