import React from 'react';
import Categories from '../../Categories/Categories';
import ContactVendor from '../../ContactVendor/ContactVendor';
import Products from '../../Products/Products';
import ShopPromotion from './ShopPromotion';

const CategoryDetails = () => {
  return (
    <section>
      <div className="flex md:flex-row flex-col-reverse mx-auto container px-4 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        {/* Category sidebar */}
        <div className="md:w-3/12 bg-white order-first">
          <Categories />
          <ContactVendor />
        </div>

        {/* Products */}
        <div className="md:w-9/12 order-last">
          <ShopPromotion/>
          <Products />
        </div>
      </div>
    </section>
  );
};

export default CategoryDetails;
