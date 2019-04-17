import gql from 'graphql-tag';

// GraphQL query for retrieving products
export default gql`
  {
    allProducts {
      id
      title
      image
      main
      filters {
        id
        key
        values
      }
      variations {
        id
        title
        main
      }
      category {
        id
        title
      }
      listings {
        id
      }
    }
  }
`;
