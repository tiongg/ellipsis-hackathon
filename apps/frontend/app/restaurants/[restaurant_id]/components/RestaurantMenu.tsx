import { useState } from 'react';

import { Menu } from '../typings/menuType';
import RestaurantMenuItem from './RestaurantMenuItem';

const RestaurantMenu = ({ menu }: { menu: Menu[] }) => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<
    null | number
  >(0);

  const handleToggleAccordion = (index: number) => {
    if (index === activeAccordionIndex) {
      setActiveAccordionIndex(null);
    } else {
      setActiveAccordionIndex(index);
    }
  };

  return (
    <div className="my-4">
      {menu?.map((m, i: number) => {
        return (
          <RestaurantMenuItem
            menu={m}
            key={i}
            index={i}
            activeIndex={activeAccordionIndex}
            setActiveIndex={handleToggleAccordion}
          />
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
