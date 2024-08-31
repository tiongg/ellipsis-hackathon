export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  amountLeft: number;
};

export type Menu = {
  title: string;
  items: MenuItem[];
};

export type RestaurantMenuItemProps = {
  menu: Menu;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number) => void;
};

export type RestaurantInfoProps = {
  info: {
    name: string;
    description: string;
    sla: {
      lastMileTravelString: string;
    };
    areaName: string;
    totalRatingsString: string;
    avgRatingString: string;
    cuisines: string[];
  };
};
