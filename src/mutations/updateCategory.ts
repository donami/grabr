import gql from 'graphql-tag';

export default gql`
  mutation UpdateCategory($id: Int!, $title: String, $parentId: Int) {
    updateCategory(id: $id, title: $title, parentId: $parentId) {
      id
      title
    }
  }
`;
