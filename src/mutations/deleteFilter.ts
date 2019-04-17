import gql from 'graphql-tag';

export default gql`
  mutation DeleteFilter($id: Int!) {
    deleteFilter(id: $id) {
      id
      key
      values
      __typename
    }
  }
`;
