import gql from 'graphql-tag';

export default gql`
  mutation DeleteFetcher($id: Int!) {
    deleteFetcher(id: $id) {
      id
      site
      url
      __typename
    }
  }
`;
