const brandData = [
  {
    imageSrc:
      'https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_202302_0003-999_CheeseburgerAlt_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off',
    name: 'Cheese Burger',
    quantity: 100,
  },
  {
    imageSrc:
      'https://www.mcdonalds.com.sg/sites/default/files/2023-02/1200x1200_MOP_BBPilot_FOF.png',
    name: 'Fillet-O-Fish Burger',
    quantity: 50,
  },
  {
    imageSrc:
      'https://s7d1.scene7.com/is/image/mcdonaldsstage/DC_202302_0005-999_BigMac_1564x1564:product-header-mobile?wid=1313&hei=1313&dpr=off',
    name: 'Big Mac',
    quantity: 80,
  },
  {
    imageSrc:
      'https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-Chicken-McNuggets-6-pieces-2:1-3-product-tile-desktop?wid=829&hei=515&dpr=off',
    name: 'Chicken Nuggets',
    quantity: 200,
  },
];

export default function ProductTable() {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Tomorrow's Demand
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Source
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Quantity
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 ${
              key === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <img
                src={brand.imageSrc}
                alt={brand.name}
                className="w-16 h-16 object-cover" // Adjust these values as needed
              />
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
