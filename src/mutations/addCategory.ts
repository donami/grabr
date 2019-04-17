import gql from 'graphql-tag';

export default gql`
  mutation AddCategory($title: String!, $parentId: Int) {
    addCategory(title: $title, parentId: $parentId) {
      id
      title
      root
      children {
        id
        title
      }
    }
  }
`;
