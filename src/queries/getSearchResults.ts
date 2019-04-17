import gql from 'graphql-tag';

// GraphQL query for retrieving filtered products
export default gql`
  query($filter: ProductFilter) {
    allProducts(filter: $filter) {
      id
      title
      image
    }
  }
`;
