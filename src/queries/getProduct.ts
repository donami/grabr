import gql from 'graphql-tag';
import { Product } from '@/interfaces/models';

export type ProductQuery = {
  product: Product;
};

// GraphQL query for retrieving a product by id
export default gql`
  query($id: Int!) {
    product(id: $id) {
      id
      title
      image
      listings {
        id
        url
        price
        site
      }
      filters {
        id
        key
        values
      }
    }
  }
`;
