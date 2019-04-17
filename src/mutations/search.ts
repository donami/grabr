import gql from 'graphql-tag';

export default gql`
  mutation Search($query: String) {
    search(query: $query) @client {
      search
    }
  }
`;
