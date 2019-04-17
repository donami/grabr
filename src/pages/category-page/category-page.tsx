import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

import getCategory, { CategoryQuery } from '@/queries/getCategory';
import getProductsCursor from '@/queries/getProductsCursor';
import ProductList from '@/components/products/product-list';
import DefaultLayout from '@/components/layout/default-layout';
import styled from '../../lib/styledComponents';
import { Link } from 'react-router-dom';
import CategoryFilter from '@/components/categories/category-filter';
import { filterProductsByFilter } from '@/lib/helpers';
import Box from '../../components/ui/box';
import Button from '../../components/ui/button';
import Loader from '../../components/ui/loader';

type Props = {};
type EnhancedProps = Props & RouteComponentProps<{ id: string }>;

const CategoryPage: React.SFC<EnhancedProps> = ({ match: { params } }) => {
  const [filters, setFilters] = useState<any[]>([]);

  return (
    <DefaultLayout>
      <Query<CategoryQuery>
        query={getCategory}
        variables={{
          id: params.id,
        }}
        fetchPolicy="cache-and-network"
      >
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }
          return (
            <Query
              query={getProductsCursor}
              variables={{
                filters: filters.map(({ key, values }) => ({ key, values })),
                first: 10,
                categoryIds: data!.category.trail,
              }}
            >
              {({ data: productsData, loading, fetchMore }) => {
                if (loading) {
                  return <Loader />;
                }

                const products =
                  productsData &&
                  productsData.allProductsCursor &&
                  productsData.allProductsCursor.edges
                    ? productsData.allProductsCursor.edges.map(
                        (edge: any) => edge.node
                      )
                    : [];

                return (
                  <Wrapper>
                    <Top>
                      <h1>
                        Browsing <em>"{data!.category.title}"</em>
                      </h1>
                    </Top>
                    <Left
                      display={(
                        !!data!.category.children.length ||
                        !!(
                          data!.category.filters &&
                          data!.category.filters.length
                        )
                      ).toString()}
                    >
                      <React.Fragment>
                        {!!data!.category.children.length && (
                          <Box heading="Categories">
                            {data!.category.children.map(item => (
                              <div key={item.id}>
                                <SubCategory to={`/category/${item.id}`}>
                                  {item.title}
                                </SubCategory>
                              </div>
                            ))}
                          </Box>
                        )}

                        {!!(data!.category.filters || []).length && (
                          <Box heading="Filters">
                            {(data!.category.filters || []).map(filter => (
                              <CategoryFilter
                                key={filter.key}
                                filter={filter}
                                activeFilters={filters}
                                onChange={(e: any, value: string) => {
                                  const hasFilter = filters.find(
                                    item => item.key === filter.key
                                  );

                                  if (hasFilter) {
                                    const hasValue = hasFilter.values.find(
                                      (item: string) => value === item
                                    );

                                    const newFilters = filters
                                      .map(item => {
                                        if (item.key === filter.key) {
                                          item.id = Math.random();
                                          if (hasValue) {
                                            item.values = item.values.filter(
                                              (item: string) => item !== value
                                            );
                                          } else {
                                            item.values = [
                                              ...item.values,
                                              value,
                                            ];
                                          }
                                        }
                                        return item;
                                      })
                                      .filter(item => {
                                        if (item.values.length === 0) {
                                          return false;
                                        }
                                        return true;
                                      });

                                    setFilters(newFilters);
                                  } else {
                                    setFilters([
                                      ...filters,
                                      {
                                        id: Math.random(),
                                        key: filter.key,
                                        values: [value],
                                      },
                                    ]);
                                  }
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      </React.Fragment>
                    </Left>
                    <Right>
                      <React.Fragment>
                        <div>
                          <ProductList horizontal products={products} />
                          {productsData.allProductsCursor &&
                            productsData.allProductsCursor.pageInfo && (
                              <PaginationWrapper>
                                <Button
                                  secondary
                                  disabled={
                                    !productsData.allProductsCursor.pageInfo
                                      .endCursor
                                  }
                                  onClick={() => {
                                    fetchMore({
                                      query: getProductsCursor,
                                      variables: {
                                        categoryIds: data!.category.trail,
                                        after:
                                          productsData.allProductsCursor
                                            .pageInfo.endCursor,
                                        first: 10,
                                      },
                                      updateQuery: (
                                        prev: any,
                                        { fetchMoreResult }: any
                                      ) => {
                                        const newData = {
                                          ...prev,
                                          allProductsCursor: {
                                            ...prev.allProductsCursor,
                                            edges: [
                                              ...prev.allProductsCursor.edges,
                                              ...fetchMoreResult
                                                .allProductsCursor.edges,
                                            ],
                                            pageInfo:
                                              fetchMoreResult.allProductsCursor
                                                .pageInfo,
                                          },
                                        };

                                        return newData;
                                      },
                                    });
                                  }}
                                >
                                  Show more...
                                </Button>
                              </PaginationWrapper>
                            )}
                        </div>
                      </React.Fragment>
                    </Right>
                  </Wrapper>
                );
              }}
            </Query>
          );
        }}
      </Query>
    </DefaultLayout>
  );
};

export default CategoryPage;

const SubCategory = styled(Link)`
  display: inline-block;
  padding: ${props =>
    `${props.theme.spacing.tiny} ${props.theme.spacing.small}`};
  text-decoration: none;
  border-radius: 5px;
  background: ${props => props.theme.colors.secondary};
  color: #fff;
  margin-bottom: ${props => props.theme.spacing.small};
  transition: all 300ms ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Top = styled.div`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.huge};
`;

const Left = styled.div<{ display: string }>`
  flex: 2;
  margin-right: ${props => props.theme.spacing.huge};

  display: ${props => (props.display === 'true' ? 'block' : 'none')};

  h2 {
    margin-bottom: ${props => props.theme.spacing.normal};
  }
`;
const Right = styled.div`
  flex: 6;
  max-width: 100%;
`;
const PaginationWrapper = styled.div`
  border: #eee 1px solid;
  border-radius: ${props => props.theme.radius};
  padding: ${props => props.theme.spacing.normal};
  margin: ${props => props.theme.spacing.normal};
  background: #fff;
  text-align: center;
`;
