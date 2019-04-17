import React, { useState, useEffect } from 'react';
import getCategories from '@/queries/getCategories';
import styled from '@/lib/styledComponents';
import { Category } from '@/interfaces/models';
import Tag from '@/components/ui/tag';
import Input from '@/components/ui/input';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../ui/loader';

type Props = {
  title?: string;
  onSelect: (item?: Category) => void;
  preselected?: number | null;
  ignoreIds?: number[];
};

const CategoryPicker: React.SFC<Props> = ({
  onSelect,
  title,
  preselected,
  ignoreIds,
}) => {
  const [items, setItems] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category | undefined>(undefined);
  const { data, loading } = useQuery(getCategories);

  useEffect(() => {
    if (!loading) {
      const preselectedItem = preselected
        ? data.allCategories.find(
            (category: Category) => category.id === preselected
          )
        : null;

      if (preselectedItem) {
        setSelected(preselectedItem);
      }
    }
  }, [data.allCategories, loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <div>
        {!selected && (
          <React.Fragment>
            {title && <label>{title}</label>}
            <Input
              onChange={e => {
                if (e.target.value.length > 1) {
                  const filtered = data!.allCategories.filter(
                    (item: Category) => {
                      const re = new RegExp(e.target.value, 'i');

                      if ((ignoreIds || []).indexOf(item.id) > -1) {
                        return false;
                      }
                      return re.test(item.title);
                    }
                  );

                  setItems(filtered);
                } else {
                  setItems([]);
                }
              }}
            />
            {!!items.length && (
              <Matches>
                {items.map(item => (
                  <li key={item.id}>
                    <MatchItem
                      onClick={() => {
                        onSelect(item);
                        setSelected(item);
                        setItems([]);
                      }}
                    >
                      {item.title}
                    </MatchItem>
                  </li>
                ))}
              </Matches>
            )}
          </React.Fragment>
        )}

        {selected && (
          <Tag
            onClick={() => {
              setSelected(undefined);
              onSelect(undefined);
            }}
          >
            {selected.title}
          </Tag>
        )}
      </div>
    </React.Fragment>
  );
};

export default CategoryPicker;

const Matches = styled.ul`
  list-style: none;
  border: ${props => props.theme.colors.light} 1px solid;
  padding: ${props => props.theme.spacing.small};
`;

const MatchItem = styled.div`
  cursor: pointer;
`;
