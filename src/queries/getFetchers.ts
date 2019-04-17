import gql from 'graphql-tag';
import { Fetcher } from '@/interfaces/models';

export type FetchersQuery = {
  allFetchers: Fetcher[];
};

// GraphQL query for retrieving all fetchers
export default gql`
  {
    allFetchers {
      id
      lastFetched
      site {
        __typename
        id
        title
      }
      url
      category {
        id
        title
      }
    }
  }
`;
