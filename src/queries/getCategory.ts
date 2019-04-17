import gql from 'graphql-tag';
import { Category } from '@/interfaces/models';

export type CategoryQuery = {
  category: Category;
};

// GraphQL query for retrieving a category by id
export default gql`
  query($id: Int!, $categoryFilter: [UniqueFilterInput]) {
    category(id: $id) {
      id
      title
      parent
      trail
      children {
        id
        title
      }
      filters {
        key
        values
      }
      products(categoryFilter: $categoryFilter) {
        id
        title
        image
        filters {
          id
          key
          values
        }
        listings {
          id
        }
        cheapestListing {
          id
          price
        }
      }
    }
  }
`;
