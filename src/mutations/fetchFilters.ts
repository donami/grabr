import gql from 'graphql-tag';

export default gql`
  mutation FetchFilters($listingId: Int!) {
    fetchFilters(listingId: $listingId) {
      id
      title
      filters {
        id
        key
        values
      }
    }
  }
`;
