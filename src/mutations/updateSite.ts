import gql from 'graphql-tag';

export default gql`
  mutation UpdateSite($id: Int!, $title: String, $url: String) {
    updateSite(id: $id, title: $title, url: $url) {
      id
      title
      url
      fetchers {
        id
      }
    }
  }
`;
