import React, { useState, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import deleteFilter from '../../mutations/deleteFilter';
import updateFilter from '../../mutations/updateFilter';
import Button from '../ui/button';
import styled from '../../lib/styledComponents';
import Input from '../ui/input';
import Field from '../ui/field';
import Icon from '../ui/icon';

type FilterItemType = {
  id: number;
  key: string;
  values: string;
};
type Props = { filter: FilterItemType };
const FilterItem: React.SFC<Props> = ({ filter }) => {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(filter.values);
  const [key, setKey] = useState(filter.key);

  return (
    <div>
      <strong>{filter.key}</strong>{' '}
      <Actions>
        {editing ? (
          <Icon
            icon="window-close"
            title="Cancel"
            onClick={() => setEditing(false)}
          />
        ) : (
          <Icon
            icon="edit"
            title="Edit filter"
            onClick={() => setEditing(true)}
          />
        )}{' '}
        <Mutation mutation={deleteFilter}>
          {mutate => (
            <Icon
              icon="trash"
              title="Remove filter"
              onClick={() => {
                mutate({
                  variables: {
                    id: filter.id,
                  },
                });
              }}
            />
          )}
        </Mutation>
      </Actions>
      <br />
      {editing && (
        <Mutation mutation={updateFilter}>
          {mutate => (
            <Fragment>
              <Field>
                <label>Key</label>
                <Input
                  type="text"
                  defaultValue={filter.key}
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
                  defaultValue={filter.values}
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
                      key,
                      values,
                      id: filter.id,
                    },
                  });
                }}
                primary
              >
                Save
              </Button>
              <Button
                onClick={e => {
                  e.preventDefault();
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
            </Fragment>
          )}
        </Mutation>
      )}
      {!editing && <Fragment>{filter.values}</Fragment>}
    </div>
  );
};

export default FilterItem;

const Actions = styled.div`
  float: right;

  i,
  svg {
    cursor: pointer;
  }
`;
