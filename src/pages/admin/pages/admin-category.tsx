import React, { useState, useEffect } from 'react';
import getCategories, { CategoriesQuery } from '@/queries/getCategories';
import { useModal } from '@/components/modal';
import Modal from '@/components/modal/modal';
import { Query, Mutation } from 'react-apollo';
import { Category } from '../../../interfaces/models';
import updateCategory from '../../../mutations/updateCategory';
import Button from '../../../components/ui/button';
import styled from '../../../lib/styledComponents';
import Input from '../../../components/ui/input';
import AddCategory from '@/components/admin/add-category';
import { useToasts } from '../../../components/toasts/toast-manager';
import deleteCategory from '../../../mutations/deleteCategory';
import Heading from '../../../components/ui/heading';
import Icon from '../../../components/ui/icon';
import CategoryPicker from '../../../components/admin/category-picker';
import Loader from '../../../components/ui/loader';
import Table from '../../../components/ui/table';

const EditCategory: React.SFC<{
  category: Category;
}> = ({ category }) => {
  const { add } = useToasts();

  const [showModal, hideModal] = useModal(() => {
    const [values, setValues] = useState(category);
    const [parent, setParent] = useState<Category | undefined>(undefined);

    return (
      <Modal hideModal={hideModal} header="Edit Category">
        <form>
          <Field>
            <Input
              type="text"
              defaultValue={category.title}
              onChange={(e: any) => {
                setValues({
                  ...values,
                  title: e.target.value,
                });
              }}
            />
          </Field>

          <Field>
            <CategoryPicker
              ignoreIds={[category.id]}
              preselected={category.parent}
              title="Select parent category (leave empty for root)"
              onSelect={item => setParent(item ? item : undefined)}
            />
            {parent && <div>Category will be placed in: {parent.title}</div>}
          </Field>

          <Actions>
            <Mutation mutation={updateCategory}>
              {(mutate, { loading }) => {
                return (
                  <Button
                    disabled={loading}
                    loading={loading}
                    type="button"
                    onClick={() => {
                      mutate({
                        variables: {
                          id: category.id,
                          title: values.title,
                          parentId: parent && parent.id,
                        },
                      });
                      add({
                        type: 'success',
                        message: 'Category was updated.',
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
      <td>{category.title}</td>
      <td>
        <Icon
          icon="edit"
          pointer
          onClick={showModal}
          style={{ marginRight: 5 }}
        />
        <Mutation
          mutation={deleteCategory}
          update={(cache, { data: { deleteCategory } }) => {
            const { allCategories }: any = cache.readQuery({
              query: getCategories,
              variables: {
                root: true,
              },
            });
            cache.writeQuery({
              query: getCategories,
              data: {
                allCategories: allCategories.filter(
                  (category: Category) => category.id !== deleteCategory.id
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
                    id: category.id,
                  },
                });
                add({ type: 'success', message: 'Category was removed' });
              }}
            />
          )}
        </Mutation>
      </td>
    </tr>
  );
};

const AdminCategory: React.SFC<{}> = () => {
  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal hideModal={hideModal} header="Add Category">
        <AddCategory />
      </Modal>
    );
  });

  return (
    <Query<CategoriesQuery> query={getCategories}>
      {({ data, loading }) => {
        if (loading) {
          return <Loader />;
        }

        return (
          <div>
            <Top>
              <Heading>Manage Categories</Heading>
              <Icon icon="plus-square" onClick={showModal} pointer />
            </Top>

            {!data!.allCategories.length && (
              <div>No categories.exists yet.</div>
            )}

            <Table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {data!.allCategories.map(category => (
                  <EditCategory category={category} key={category.id} />
                ))}
              </tbody>
            </Table>
          </div>
        );
      }}
    </Query>
  );
};

export default AdminCategory;

const Actions = styled.div`
  button {
    margin-right: ${props => props.theme.spacing.normal};
  }
`;

const Field = styled.div`
  margin-bottom: ${props => props.theme.spacing.normal};
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  > h3 {
    flex: 1;
  }
`;
