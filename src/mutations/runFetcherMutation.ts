import gql from 'graphql-tag';

export default gql`
  mutation RunFetcher($fetcherId: Int!) {
    runFetcher(fetcherId: $fetcherId) {
      id
      title
    }
  }
`;
