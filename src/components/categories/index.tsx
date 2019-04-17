import React from 'react';
import CategoryList from './category-list';
import DefaultLayout from '@/components/layout/default-layout';

const Categories: React.SFC<{}> = () => (
  <DefaultLayout>
    <h1>Categories Page</h1>

    <CategoryList />
  </DefaultLayout>
);

export default Categories;
