import gql from 'graphql-tag';

export default gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      id
      title
      __typename
    }
  }
`;
