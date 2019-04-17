import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import getSites from '../../../queries/getSites';
import Loader from '../../../components/ui/loader';
import { Site } from '../../../interfaces/models';
import { useToasts } from '../../../components/toasts/toast-manager';
import deleteSite from '../../../mutations/deleteSite';
import Modal from '../../../components/modal/modal';
import styled from '../../../lib/styledComponents';
import Input from '../../../components/ui/input';
import updateSite from '../../../mutations/updateSite';
import Button from '../../../components/ui/button';
import { useModal } from '../../../components/modal';
import AddSite from '../../../components/admin/add-site';
import Heading from '../../../components/ui/heading';
import Icon from '../../../components/ui/icon';
import { Link } from 'react-router-dom';
import Table from '../../../components/ui/table';

const EditSite: React.SFC<{ site: Site }> = ({ site }) => {
  const { add } = useToasts();

  const [showModal, hideModal] = useModal(() => {
    const [values, setValues] = useState<any>(site);

    return (
      <Modal hideModal={hideModal} header="Edit Site">
        <form>
          <Field>
            <label>Title</label>
            <Input
              type="text"
              defaultValue={site.title}
              placeholder="Title"
              onChange={(e: any) => {
                setValues({
                  ...values,
                  title: e.target.value,
                });
              }}
            />
          </Field>

          <Field>
            <label>URL</label>
            <Input
              type="text"
              defaultValue={site.url}
              placeholder="http://"
              onChange={(e: any) => {
                setValues({
                  ...values,
                  url: e.target.value,
                });
              }}
            />
          </Field>

          <Actions>
            <Mutation mutation={updateSite}>
              {(mutate, { loading }) => {
                return (
                  <Button
                    disabled={loading}
                    loading={loading}
                    type="button"
                    onClick={() => {
                      mutate({
                        variables: {
                          id: site.id,
                          title: values.title,
                          url: values.url,
                        },
                      });
                      add({
                        type: 'success',
                        message: 'Site was updated.',
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
        <Link to={`/admin/site/${site.id}`}>{site.title}</Link>
      </td>
      <td>
        <Icon
          icon="edit"
          pointer
          onClick={showModal}
          style={{ marginRight: 5 }}
        />
        <Mutation
          mutation={deleteSite}
          update={(cache, { data: { deleteSite } }) => {
            const { allSites }: any = cache.readQuery({
              query: getSites,
            });
            cache.writeQuery({
              query: getSites,
              data: {
                allSites: allSites.filter(
                  (site: Site) => site.id !== deleteSite.id
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
                    id: site.id,
                  },
                });
                add({ type: 'success', message: 'Site was removed' });
              }}
            />
          )}
        </Mutation>
      </td>
    </tr>
  );
};

type Props = {};
const AdminSites: React.SFC<Props> = () => {
  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal hideModal={hideModal} header="Add Site">
        <AddSite />
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
          <div>
            <Top>
              <Heading>Manage Sites</Heading>
              <Icon icon="plus-square" onClick={showModal} pointer />
            </Top>

            {!allSites.length && <div>No sites added yet.</div>}

            {!!allSites.length && (
              <Table>
                <thead>
                  <tr>
                    <th>Site</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {allSites.map((site: Site) => (
                    <EditSite key={site.id} site={site} />
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        );
      }}
    </Query>
  );
};

export default AdminSites;

const Actions = styled.div`
  button {
    margin-right: ${props => props.theme.spacing.normal};
  }
`;

const Field = styled.div`
  label {
    display: block;
  }
  margin-bottom: ${props => props.theme.spacing.normal};
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  > h3 {
    flex: 1;
  }
`;
