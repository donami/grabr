import React from 'react';
import CategoryList from '../categories/category-list';

const Sidebar = () => {
  return <CategoryList childLimit={5} />;
};

export default Sidebar;
