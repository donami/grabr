import gql from 'graphql-tag';

export default gql`
  query AllProductsCursor(
    $categoryIds: [Int]
    $first: Int
    $after: String
    $filters: [UniqueFilterInput]
  ) {
    allProductsCursor(
      categoryIds: $categoryIds
      first: $first
      after: $after
      filters: $filters
    ) {
      pageInfo {
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
          cheapestListing {
            id
            url
            price
            site
          }
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
    }
  }
`;
