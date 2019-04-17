import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { useToasts } from '@/components/toasts/toast-manager';
import getSite from '@/queries/getSite';
import Loader from '@/components/ui/loader';
import { RouteComponentProps } from 'react-router';
import Heading from '@/components/ui/heading';
import { Fetcher } from '@/interfaces/models';
import Modal from '@/components/modal/modal';
import AddFetcher from '@/components/admin/add-fetcher';
import { useModal } from '@/components/modal';
import Button from '../../../components/ui/button';
import runSitemapCrawler from '../../../mutations/runSitemapCrawler';

type Props = {} & RouteComponentProps<{ id: string }>;
const AdminSite: React.SFC<Props> = ({ match: { params } }) => {
  const { add } = useToasts();
  const [showModal, hideModal] = useModal(() => {
    if (!params.id) {
      return <div>Not found</div>;
    }

    return (
      <Modal hideModal={hideModal} header="Add Fetcher">
        <AddFetcher defaultSiteId={params.id} />
      </Modal>
    );
  });

  if (!params.id) {
    return null;
  }
  return (
    <Query query={getSite} variables={{ id: params.id }}>
      {({ data: { site }, loading }) => {
        if (loading) {
          return <Loader />;
        }
        if (!site) {
          // TODO: not found page
          return <div>404 NOT_FOUND</div>;
        }
        return (
          <div>
            <Button type="button" primary onClick={showModal}>
              Add fetcher
            </Button>
            <Mutation mutation={runSitemapCrawler}>
              {(mutate, { loading }) => (
                <Button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    mutate({
                      variables: {
                        siteId: site.id,
                      },
                    })
                      .then(() => {
                        add({
                          type: 'success',
                          message: 'Crawled sitemap!',
                        });
                      })
                      .catch(() => {
                        add({
                          type: 'error',
                          message: 'Something went wrong...',
                        });
                      });
                  }}
                >
                  {loading ? 'Crawling...' : 'Crawl Sitemap'}
                </Button>
              )}
            </Mutation>
            <Heading>{site.title}</Heading>
            <strong>URL:</strong> {site.url}
            <h5>Fetchers</h5>
            {!(site.fetchers || []).length && (
              <em>No fetchers attached to this site.</em>
            )}
            {(site.fetchers || []).map((fetcher: Fetcher) => (
              <div key={fetcher.id}>
                {fetcher.url} -{' '}
                {fetcher.category ? (
                  fetcher.category.title
                ) : (
                  <em>NoCategory</em>
                )}
              </div>
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default AdminSite;
