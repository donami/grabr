import gql from 'graphql-tag';

// ----------------------------------------------------------------------------

// GraphQL query for run all fetchers
export default gql`
  mutation {
    runFetchers {
      id
      title
    }
  }
`;
