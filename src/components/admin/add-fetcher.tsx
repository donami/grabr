import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import addFetcher from '@/mutations/addFetcher';
import getFetchers from '@/queries/getFetchers';
import { useToasts } from '@/components/toasts/toast-manager';
import Button from '@/components/ui/button';
import CategoryPicker from './category-picker';
import { Category } from '../../interfaces/models';
import getSites from '../../queries/getSites';
import Loader from '../ui/loader';
import styled from '../../lib/styledComponents';
import Field from '../ui/field';
import Input from '../ui/input';

type Props = {
  defaultSiteId?: string;
};
const AddFetcher: React.SFC<Props> = ({ defaultSiteId }) => {
  const [url, setUrl] = useState('');
  const [siteId, setSiteId] = useState(defaultSiteId || '-1');
  const [category, setCategory] = useState('');
  const { add } = useToasts();

  return (
    <Mutation
      mutation={addFetcher}
      update={(cache, { data: { addFetcher } }) => {
        const { allFetchers }: any = cache.readQuery({
          query: getFetchers,
        });
        cache.writeQuery({
          query: getFetchers,
          data: {
            allFetchers: allFetchers.concat(addFetcher),
          },
        });
      }}
    >
      {mutate => (
        <Wrapper>
          <h3>Add Fetcher</h3>
          <form
            onSubmit={e => {
              e.preventDefault();

              if (url.length && category.length && siteId && siteId !== '-1') {
                mutate({
                  variables: {
                    url,
                    siteId: +siteId,
                    categoryId: +category,
                  },
                });
                add({
                  type: 'success',
                  message: 'Fetcher was added.',
                });
              } else {
                console.log('Missing required fields.');
              }
            }}
          >
            <Field>
              <label>URL</label>
              <Input
                type="text"
                placeholder="URL"
                onChange={e => {
                  setUrl(e.target.value);
                }}
              />
            </Field>
            <Field>
              <label>Site</label>
              <Query query={getSites}>
                {({ data: { allSites }, loading }) => {
                  if (loading) {
                    return <Loader />;
                  }
                  return (
                    <select
                      defaultValue={siteId}
                      onChange={(e: any) => {
                        setSiteId(e.target.value);
                      }}
                    >
                      <option value="-1">Select site...</option>
                      {(allSites || []).map((site: any) => (
                        <option key={site.id} value={site.id}>
                          {site.title}
                        </option>
                      ))}
                    </select>
                  );
                }}
              </Query>
            </Field>
            <Field>
              <CategoryPicker
                title="Select category"
                onSelect={(item?: Category) => {
                  setCategory(item ? item.id.toString() : '');
                }}
              />
            </Field>
            <Button type="submit">Add</Button>
          </form>
        </Wrapper>
      )}
    </Mutation>
  );
};

export default AddFetcher;

const Wrapper = styled.div`
  label {
    display: block;
  }
`;
