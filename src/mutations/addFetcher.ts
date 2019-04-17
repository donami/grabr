import gql from 'graphql-tag';

export default gql`
  mutation AddFetcher($url: String!, $siteId: Int!, $categoryId: Int!) {
    addFetcher(url: $url, siteId: $siteId, categoryId: $categoryId) {
      id
      url
      site {
        __typename
        id
        title
      }
      category {
        id
      }
    }
  }
`;
