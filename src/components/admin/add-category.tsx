import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import addCategory from '@/mutations/addCategory';
import Button from '../ui/button';
import CategoryPicker from './category-picker';
import { Category } from '../../interfaces/models';
import getCategories from '../../queries/getCategories';
import Field from '../ui/field';
import Input from '../ui/input';

const AddCategory = () => {
  const [title, setTitle] = useState('');
  const [parent, setParent] = useState<Category | undefined>(undefined);

  return (
    <Mutation
      mutation={addCategory}
      refetchQueries={[
        {
          query: getCategories,
        },
      ]}
      // update={(cache, { data: { addCategory } }) => {
      //   const { allCategories }: any = cache.readQuery({
      //     query: getCategories,
      //   });
      //   cache.writeQuery({
      //     query: getCategories,
      //     data: {
      //       allCategories: allCategories.concat(addCategory),
      //     },
      //   });
      // }}
    >
      {mutate => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();

              if (title.length) {
                mutate({
                  variables: {
                    title,
                    parentId: parent ? parent.id : undefined,
                  },
                });
              } else {
                console.log('Missing required fields.');
              }
            }}
          >
            <Field>
              <label>Title</label>
              <Input
                type="text"
                placeholder="Title"
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />
            </Field>
            <Field>
              <CategoryPicker
                title="Select parent category (leave empty for root)"
                onSelect={item => setParent(item ? item : undefined)}
              />
              {parent && <div>Category will be placed in: {parent.title}</div>}
            </Field>
            <Button type="submit">Add</Button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default AddCategory;
