import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import getProducts from '@/queries/getProducts';
import Loader from '@/components/ui/loader';
import { Product } from '@/interfaces/models';
import { useToasts } from '@/components/toasts/toast-manager';
import deleteProduct from '@/mutations/deleteProduct';
import Modal from '@/components/modal/modal';
import styled from '@/lib/styledComponents';
import Input from '@/components/ui/input';
import updateProduct from '@/mutations/updateProduct';
import Button from '@/components/ui/button';
import { useModal } from '@/components/modal';
import fetchFilters from '@/mutations/fetchFilters';
import Heading from '@/components/ui/heading';
import FilterItem from '../../../components/admin/filter-item';
import AddFilterToProduct from '../../../components/admin/add-filter';
import Accordion from '../../../components/ui/accordion';
import Table from '../../../components/ui/table';
import Icon from '../../../components/ui/icon';
import CategoryPicker from '@/components/admin/category-picker';
import ProductVariations from '../../../components/admin/product-variations';
import { useQuery } from 'react-apollo-hooks';

const EditProduct: React.SFC<{ product: Product }> = ({ product }) => {
  const { add } = useToasts();

  const [showModal, hideModal] = useModal(() => {
    const [values, setValues] = useState(product);

    return (
      <Modal hideModal={hideModal} header="Edit Product">
        <form>
          <Field>
            <Input
              type="text"
              defaultValue={product.title}
              onChange={(e: any) => {
                setValues({
                  ...values,
                  title: e.target.value,
                });
              }}
            />
          </Field>
          <Field>
            <label>Select category</label>
            <CategoryPicker
              preselected={
                (product.category && product.category.id) || undefined
              }
              onSelect={item => {
                setValues({ ...values, category: item });
              }}
            />
          </Field>

          {product.filters && !!product.filters.length && (
            <div>
              <Heading as="h3">Filters</Heading>
              {(product.filters || []).map(filter => (
                <FilterItem filter={filter as any} key={filter.id} />
              ))}
            </div>
          )}

          <Accordion title="Add filter">
            <AddFilterToProduct productId={product.id} />
          </Accordion>

          <Accordion title="Variations">
            <ProductVariations product={product} />
          </Accordion>

          <FetchFilters>
            {product.listings && product.listings[0] && (
              <Mutation
                mutation={fetchFilters}
                update={(cache, { data: { fetchFilters } }) => {
                  const { allProducts }: any = cache.readQuery({
                    query: getProducts,
                  });

                  const index = allProducts.findIndex(
                    (item: Product) => item.id === fetchFilters.id
                  );

                  cache.writeQuery({
                    query: getProducts,
                    data: {
                      allProducts: [
                        ...allProducts.slice(0, index),
                        {
                          ...allProducts[index],
                          filters: fetchFilters.filters,
                        },
                        ...allProducts.slice(index + 1),
                      ],
                    },
                  });
                }}
              >
                {(mutate, { loading }) => (
                  <Button
                    type="button"
                    loading={loading}
                    disabled={loading}
                    primary
                    onClick={async e => {
                      e.preventDefault();
                      if (product.listings && product.listings[0]) {
                        try {
                          await mutate({
                            variables: {
                              listingId: product.listings[0].id,
                            },
                          });
                          add({
                            type: 'success',
                            message: 'Filters was fetched.',
                          });
                        } catch (e) {
                          add({
                            type: 'error',
                            message: 'Something went wrong.',
                          });
                        }
                      }
                    }}
                  >
                    Fetch filters
                  </Button>
                )}
              </Mutation>
            )}
          </FetchFilters>

          <Actions>
            <Mutation mutation={updateProduct}>
              {(mutate, { loading }) => {
                return (
                  <Button
                    disabled={loading}
                    loading={loading}
                    type="button"
                    onClick={() => {
                      mutate({
                        variables: {
                          id: product.id,
                          title: values.title,
                          categoryId: values.category && values.category.id,
                        },
                      });
                      add({
                        type: 'success',
                        message: 'Product was updated.',
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
        {product.title} &nbsp;
        <Link to={`/product/${product.id}`}>
          <Icon icon="external-link-alt" pointer title="Go to product" />
        </Link>
      </td>
      <td style={{ textAlign: 'center' }}>
        <Icon pointer icon="edit" onClick={showModal} />
      </td>
      <td style={{ textAlign: 'center' }}>
        <Mutation
          mutation={deleteProduct}
          update={(cache, { data: { deleteProduct } }) => {
            const { allProducts }: any = cache.readQuery({
              query: getProducts,
            });
            cache.writeQuery({
              query: getProducts,
              data: {
                allProducts: allProducts.filter(
                  (product: Product) => product.id !== deleteProduct.id
                ),
              },
            });
          }}
        >
          {mutate => (
            <Icon
              pointer
              icon="trash"
              onClick={() => {
                mutate({
                  variables: {
                    id: product.id,
                  },
                });
                add({ type: 'success', message: 'Product was removed' });
              }}
            />
          )}
        </Mutation>
      </td>
    </tr>
  );
};

const useFilter = (allItems, loading, prop) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(allItems || []);
  }, [loading]);

  const handleFilter = (value: string) => {
    const filtered = allItems.filter(item => {
      const re = new RegExp(value, 'i');
      return re.test(item[prop]);
    });

    setItems(filtered);
  };

  return [items, handleFilter];
};

type Props = {};
const AdminProduct: React.SFC<Props> = () => {
  const {
    data: { allProducts },
    loading,
  } = useQuery(getProducts);

  const [products, handleFilter] = useFilter(allProducts, loading, 'title');

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Input
        type="text"
        placeholder="Filter..."
        onChange={e => handleFilter(e.target.value)}
      />
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <EditProduct key={product.id} product={product} />
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default AdminProduct;

const Actions = styled.div`
  button {
    margin-right: ${props => props.theme.spacing.normal};
  }
`;

const Field = styled.div`
  margin-bottom: ${props => props.theme.spacing.normal};
`;

const FetchFilters = styled.div`
  margin-bottom: ${props => props.theme.spacing.normal};
`;
