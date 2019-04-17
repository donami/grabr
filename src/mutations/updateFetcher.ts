import gql from 'graphql-tag';

export default gql`
  mutation UpdateFetcher(
    $id: Int!
    $siteId: Int!
    $url: String
    $categoryId: Int
  ) {
    updateFetcher(
      id: $id
      siteId: $siteId
      url: $url
      categoryId: $categoryId
    ) {
      __typename
      id
      site {
        id
        title
      }
      url
      category {
        id
        title
      }
    }
  }
`;
