export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
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
