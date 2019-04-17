import gql from 'graphql-tag';

export default gql`
  mutation DeleteSite($id: Int!) {
    deleteSite(id: $id) {
      id
      title
      url
      __typename
    }
  }
`;
