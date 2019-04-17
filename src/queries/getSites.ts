import gql from 'graphql-tag';
import { Site } from '@/interfaces/models';

export type SitesQuery = {
  allSites: Site[];
};

// GraphQL query for retrieving all sites
export default gql`
  {
    allSites {
      id
      title
      url
    }
  }
`;
