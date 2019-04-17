import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import addSite from '@/mutations/addSite';
import Button from '../ui/button';
import styled from '../../lib/styledComponents';
import getSites from '../../queries/getSites';

const AddSite = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  return (
    <Mutation
      mutation={addSite}
      update={(cache, { data: { addSite } }) => {
        const { allSites }: any = cache.readQuery({
          query: getSites,
        });
        cache.writeQuery({
          query: getSites,
          data: {
            allSites: allSites.concat(addSite),
          },
        });
      }}
    >
      {mutate => (
        <div>
          <h3>Add Site</h3>
          <form
            onSubmit={e => {
              e.preventDefault();

              if (title.length && url.length) {
                mutate({
                  variables: {
                    title,
                    url,
                  },
                });
              } else {
                console.log('Missing required fields.');
              }
            }}
          >
            <div>
              <label>Title</label>
              <input
                type="text"
                placeholder="Title"
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            <div>
              <label>URL</label>
              <input
                type="text"
                placeholder="http://"
                onChange={e => {
                  setUrl(e.target.value);
                }}
              />
            </div>

            <Button type="submit">Add</Button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default AddSite;

const Reset = styled.span`
  cursor: pointer;
`;
