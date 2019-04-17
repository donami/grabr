import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { useMutation } from 'react-apollo-hooks';
import getFetchers from '@/queries/getFetchers';
import Loader from '@/components/ui/loader';
import { Fetcher, Site } from '@/interfaces/models';
import { useToasts } from '@/components/toasts/toast-manager';
import deleteFetcher from '@/mutations/deleteFetcher';
import runFetcherMutation from '@/mutations/runFetcherMutation';
import Modal from '@/components/modal/modal';
import styled from '@/lib/styledComponents';
import Input from '@/components/ui/input';
import updateFetcher from '@/mutations/updateFetcher';
import Button from '@/components/ui/button';
import { useModal } from '@/components/modal';
import CategoryPicker from '@/components/admin/category-picker';
import AddFetcher from '@/components/admin/add-fetcher';
import Heading from '@/components/ui/heading';
import Icon from '@/components/ui/icon';
import getSites from '@/queries/getSites';
import Field from '@/components/ui/field';
import Table from '../../../components/ui/table';
import { formatDate } from '../../../lib/helpers';

const EditFetcher: React.SFC<{
  fetcher: Fetcher;
  sites: Site[];
  runFetcher: Function;
}> = ({ fetcher, sites, runFetcher }) => {
  const { add } = useToasts();
  const [fetching, setFetching] = useState(false);

  const [showModal, hideModal] = useModal(() => {
    const [values, setValues] = useState<any>(fetcher);

    return (
      <Modal hideModal={hideModal} header="Edit Fetcher">
        <form>
          <Field>
            <label>Site</label>
            <select
              onChange={(e: any) => {
                setValues({
                  ...values,
                  siteId: e.target.value,
                });
              }}
            >
              <option value="-1">Select site...</option>
              {sites.map(site => (
                <option key={site.id} value={site.id}>
                  {site.title}
                </option>
              ))}
            </select>
          </Field>

          <Field>
            <label>URL</label>
            <Input
              type="text"
              defaultValue={fetcher.url}
              placeholder="URL"
              onChange={(e: any) => {
                setValues({
                  ...values,
                  url: e.target.value,
                });
              }}
            />
          </Field>

          <Field>
            <CategoryPicker
              title="Select category"
              onSelect={item =>
                setValues({
                  ...values,
                  category: item ? item : undefined,
                })
              }
            />
          </Field>

          <Actions>
            <Mutation mutation={updateFetcher}>
              {(mutate, { loading }) => {
                return (
                  <Button
                    disabled={loading}
                    loading={loading}
                    type="button"
                    onClick={() => {
                      if (!values.siteId || values.siteId === '-1') {
                        add({
                          type: 'error',
                          message: 'You need to select a site.',
                        });

                        return;
                      }
                      mutate({
                        variables: {
                          id: fetcher.id,
                          siteId: +values.siteId,
                          url: values.url,
                          categoryId: values.category && values.category.id,
                        },
                      });
                      add({
                        type: 'success',
                        message: 'Fetcher was updated.',
                      });
                      hideModal();
                    }}
                  >
                    Save
                  </Button>
                );
              }}
            </Mutation>
            <Button type="button" onClick={hideModal}>
              Cancel
            </Button>
          </Actions>
        </form>
      </Modal>
    );
  });

  return (
    <tr>
      <td>
        <strong>{fetcher.site.title}</strong> <br />
        <p style={{ maxWidth: 200, wordBreak: 'break-word' }}>{fetcher.url}</p>
      </td>
      <td>{fetcher.lastFetched ? formatDate(fetcher.lastFetched) : 'Never'}</td>
      <td>
        {fetching ? (
          <span>Loading...</span>
        ) : (
          <Button
            disabled={fetching}
            type="button"
            onClick={() => {
              setFetching(true);
              runFetcher({ variables: { fetcherId: fetcher.id } })
                .then(() => {
                  setFetching(false);
                  add({
                    type: 'success',
                    message: 'Fetched!',
                  });
                })
                .catch(e => {
                  setFetching(false);
                  add({
                    type: 'error',
                    message: 'Unable to fetch!',
                  });
                });
            }}
          >
            Fetch
          </Button>
        )}
      </td>
      <td>
        <Icon
          icon="edit"
          pointer
          onClick={showModal}
          style={{ marginRight: 5 }}
        />
        <Mutation
          mutation={deleteFetcher}
          update={(cache, { data: { deleteFetcher } }) => {
            const { allFetchers }: any = cache.readQuery({
              query: getFetchers,
            });
            cache.writeQuery({
              query: getFetchers,
              data: {
                allFetchers: allFetchers.filter(
                  (fetcher: Fetcher) => fetcher.id !== deleteFetcher.id
                ),
              },
            });
          }}
        >
          {mutate => (
            <Icon
              icon="trash"
              pointer
              onClick={() => {
                mutate({
                  variables: {
                    id: fetcher.id,
                  },
                });
                add({ type: 'success', message: 'Fetcher was removed' });
              }}
            />
          )}
        </Mutation>
      </td>
    </tr>
  );
};

type Props = {};
const AdminFetchers: React.SFC<Props> = () => {
  const runFetcher = useMutation(runFetcherMutation);

  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal hideModal={hideModal} header="Add Fetcher">
        <AddFetcher />
      </Modal>
    );
  });

  return (
    <Query query={getSites}>
      {({ data: { allSites }, loading }) => {
        if (loading) {
          return <Loader />;
        }
        return (
          <Query query={getFetchers}>
            {({ data: { allFetchers }, loading }) => {
              if (loading) {
                return <Loader />;
              }
              return (
                <div>
                  <Top>
                    <Heading>Manage Fetchers</Heading>
                    <Icon icon="plus-square" onClick={showModal} pointer />
                  </Top>

                  {!allFetchers.length && <div>No fetchers added yet.</div>}

                  {!!allFetchers.length && (
                    <Table>
                      <thead>
                        <tr>
                          <th>Fetcher</th>
                          <th>Last fetched</th>
                          <th>Fetch</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allFetchers.map((fetcher: Fetcher) => (
                          <EditFetcher
                            key={fetcher.id}
                            sites={allSites || []}
                            fetcher={fetcher}
                            runFetcher={runFetcher}
                          />
                        ))}
                      </tbody>
                    </Table>
                  )}
                </div>
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};

export default AdminFetchers;

const Actions = styled.div`
  button {
    margin-right: ${props => props.theme.spacing.normal};
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  > h3 {
    flex: 1;
  }
`;
