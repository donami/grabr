import React, { Fragment, useState } from 'react';
import Field from '../ui/field';
import Input from '../ui/input';
import Button from '../ui/button';
import { Mutation } from 'react-apollo';
import updateProduct from '../../mutations/updateProduct';

type Props = { productId: number };
const AddFilterToProduct: React.SFC<Props> = ({ productId }) => {
  const [key, setKey] = useState('');
  const [values, setValues] = useState('');
  return (
    <Mutation mutation={updateProduct}>
      {mutate => (
        <Fragment>
          <Field>
            <label>Key</label>
            <Input
              type="text"
              defaultValue={key}
              onChange={e => {
                setKey(e.target.value);
              }}
              placeholder="Key"
            />
          </Field>
          <Field>
            <label>Values (separate with colon)</label>
            <Input
              type="text"
              defaultValue={values}
              onChange={e => {
                setValues(e.target.value);
              }}
              placeholder="Values"
            />
          </Field>
          <Button
            onClick={e => {
              e.preventDefault();
              mutate({
                variables: {
                  id: productId,
                  filters: [{ key, values }],
                },
              });
            }}
            primary
          >
            Save
          </Button>
        </Fragment>
      )}
    </Mutation>
  );
};

export default AddFilterToProduct;
