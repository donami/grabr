import gql from 'graphql-tag';
import { Site } from '@/interfaces/models';

export type SiteQuery = {
  site: Site;
};

// GraphQL query for retrieving a site by id
export default gql`
  query($id: Int!) {
    site(id: $id) {
      __typename
      id
      title
      url
      fetchers {
        __typename
        id
        url
        category {
          __typename
          id
          title
        }
      }
    }
  }
`;
