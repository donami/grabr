import gql from 'graphql-tag';

export default gql`
  mutation Split($productId: Int!) {
    split(productId: $productId) {
      id
      title
      main
    }
  }
`;
