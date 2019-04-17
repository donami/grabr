import gql from 'graphql-tag';

export default gql`
  mutation AddSite($title: String!, $url: String!) {
    addSite(title: $title, url: $url) {
      id
      title
      url
      fetchers {
        id
      }
    }
  }
`;
