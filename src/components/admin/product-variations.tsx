import React, { useState, Fragment } from 'react';
import { Product } from '../../interfaces/models';
import Button from '../ui/button';
import { Mutation } from 'react-apollo';
import combine from '../../mutations/combine';
import ProductSelector from './product-selector';
import split from '../../mutations/split';
import Icon from '../ui/icon';

type Props = { product: Product };
const ProductVariations: React.SFC<Props> = ({ product }) => {
  const [selected, setSelected] = useState<Product | null>(null);
  return (
    <div>
      {product.variations && !!product.variations.length && (
        <>
          <p>This is a variation of:</p>

          <Mutation mutation={split}>
            {mutate => (
              <div>
                {product.variations.map(item => (
                  <div key={item.id}>
                    {item.title}{' '}
                    {product.main === 0 && (
                      <Icon
                        pointer
                        title="Split"
                        icon="cut"
                        onClick={() => {
                          mutate({
                            variables: {
                              productId: item.id,
                            },
                          });
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </Mutation>
        </>
      )}

      {product.main === 0 && (
        <Fragment>
          <h3>Add variation</h3>
          <ProductSelector
            change={(item: Product) => {
              setSelected(item);
            }}
          />
        </Fragment>
      )}

      <Mutation mutation={combine}>
        {mutate => (
          <Button
            type="button"
            disabled={!selected}
            onClick={e => {
              e.preventDefault();

              if (!selected) {
                return;
              }

              const productIds = [selected.id];
              if (productIds.indexOf(product.id) > -1) {
                return;
              }

              mutate({
                variables: {
                  productIds,
                  mainId: product.id,
                },
              });
            }}
          >
            Save
          </Button>
        )}
      </Mutation>
    </div>
  );
};

export default ProductVariations;
