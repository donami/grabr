import gql from 'graphql-tag';

export default gql`
  {
    state @client {
      search
    }
  }
`;
