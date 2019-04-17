import gql from 'graphql-tag';
import { Category } from '@/interfaces/models';

export type CategoriesQuery = {
  allCategories: Category[];
};

// GraphQL query for retrieving all categories
export default gql`
  query AllCategories($root: Boolean, $limit: Int) {
    allCategories(filter: { root: $root, limit: $limit }) {
      id
      title
      root
      parent
      children {
        id
        title
      }
    }
  }
`;
