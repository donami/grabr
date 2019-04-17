import gql from 'graphql-tag';

export default gql`
  mutation UpdateFilter($id: Int!, $key: String, $values: String) {
    updateFilter(id: $id, key: $key, values: $values) {
      id
      key
      values
      __typename
    }
  }
`;
