import React, { useState, useEffect, useRef } from 'react';
import { compose, graphql, Query } from 'react-apollo';
import search from '@/mutations/search';
import getSearchResults from '../../queries/getSearchResults';
import styled from '../../lib/styledComponents';
import { Link } from 'react-router-dom';
import Loader from '../ui/loader';
import { Product } from '../../interfaces/models';

// Hook
function useDebounce(value: string, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
}

type Props = {
  change?: Function;
  className?: string;
  mutate: any;
  onClose?: Function;
};

const ProductSelector: React.SFC<Props> = ({ mutate, className, change }) => {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const debouncedSearchTerm = useDebounce(value, 500);
  const wrapperRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (debouncedSearchTerm) {
      mutate({ variables: { query: debouncedSearchTerm } });
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setValue('');

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleSelect = (item: Product | undefined) => {
    setSelected(item);
    if (change) {
      change(item);
    }
  };

  return (
    <Wrapper className={className} ref={wrapperRef}>
      <>
        {selected && (
          <>
            <span>Selected: {selected.title}</span>
            <span onClick={() => handleSelect(undefined)}>Clear</span>
          </>
        )}
      </>
      <>
        {!selected && (
          <>
            {debouncedSearchTerm && (
              <SearchResults>
                <h3>Search results</h3>
                <Query
                  query={getSearchResults}
                  variables={{
                    filter: { title_contains: debouncedSearchTerm },
                  }}
                >
                  {({ data, loading }) => {
                    if (loading) {
                      return <Loader />;
                    }

                    if (data.allProducts && !data.allProducts.length) {
                      return <p>No matches.</p>;
                    }

                    return (
                      <ul>
                        {data.allProducts.map((item: Product) => (
                          <li key={item.id}>
                            <span
                              onClick={() => {
                                handleSelect(item);
                              }}
                            >
                              {item.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    );
                  }}
                </Query>
              </SearchResults>
            )}
            <SearchInput
              ref={inputRef}
              placeholder="Search..."
              onChange={e => setValue(e.target.value)}
            />
          </>
        )}
      </>
    </Wrapper>
  );
};

export default compose(graphql(search))(ProductSelector);

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 0.5em;
  width: calc(100% - 1em - 2px);
  border: none;
  border-radius: ${props => props.theme.radius};
  background-color: #f7f9fa;
  outline: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgba(0, 123, 255, 0.5);
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 45px;
  width: calc(100% - 30px - 2px);
  padding: 15px;
  background: #fff;
  border: ${props => props.theme.colors.border} 1px solid;
  color: ${props => props.theme.colors.darkText};

  a {
    color: ${props => props.theme.colors.darkText};
  }

  h3 {
    font-weight: 300;
    color: ${props => props.theme.colors.secondary};
    text-transform: uppercase;
    border-bottom: ${props => props.theme.colors.light} 1px solid;
    padding-bottom: ${props => props.theme.spacing.small};
    margin-bottom: ${props => props.theme.spacing.small};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 1em;
  }

  li {
    margin: ${props => props.theme.spacing.normal} 0;
  }
`;
