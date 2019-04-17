import gql from 'graphql-tag';

export default gql`
  mutation Combine($productIds: [Int]!, $mainId: Int!) {
    combine(productIds: $productIds, mainId: $mainId) {
      id
      title
      main
    }
  }
`;
