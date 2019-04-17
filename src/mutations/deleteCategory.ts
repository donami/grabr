import gql from 'graphql-tag';

export default gql`
  mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id) {
      id
      title
      __typename
    }
  }
`;
