import gql from 'graphql-tag';

export default gql`
  mutation UpdateProduct(
    $id: Int!
    $title: String
    $filters: [AddProductFilters]
    $categoryId: Int
  ) {
    updateProduct(
      id: $id
      title: $title
      filters: $filters
      categoryId: $categoryId
    ) {
      id
      title
      category {
        id
        title
        __typename
      }
      filters {
        id
        key
        values
      }
    }
  }
`;
