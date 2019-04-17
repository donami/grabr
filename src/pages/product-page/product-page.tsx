import React, { Fragment } from 'react';
import { RouteComponentProps } from 'react-router';
import { Query } from 'react-apollo';
import getProduct, { ProductQuery } from '@/queries/getProduct';
import Heading from '@/components/ui/heading';
import DefaultLayout from '@/components/layout/default-layout';
import styled from '@/lib/styledComponents';
import ListingItem from './listing-item';
import Box from '../../components/ui/box';
import Icon from '../../components/ui/icon';
import AddToFavorites from '../../components/favorites/add-to-favorites';
import Loader from '../../components/ui/loader';

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.huge};
`;
const Left = styled.div`
  flex: 2;
  display: flex;
`;
const ImageHolder = styled.div`
  max-width: 25%;
  text-align: center;
  margin-right: ${props => props.theme.spacing.normal};
  flex: 1;

  img {
    max-width: 100%;
  }
`;
const DescriptionHolder = styled.div`
  flex: 1;

  h3 {
    color: ${props => props.theme.colors.secondary};
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const ProductListings = styled.div`
  h3 {
    margin-bottom: ${props => props.theme.spacing.normal};
  }
`;

type Props = {};
type EnhancedProps = Props & RouteComponentProps<{ id: string }>;

const ProductPage: React.SFC<EnhancedProps> = ({ match: { params } }) => {
  return (
    <DefaultLayout>
      <Box>
        <Query<ProductQuery> query={getProduct} variables={{ id: params.id }}>
          {({ data, loading }) => {
            if (loading) {
              return <Loader />;
            }
            return (
              <React.Fragment>
                <ProductInfo>
                  <Left>
                    <ImageHolder>
                      <img
                        src={data!.product.image}
                        alt={data!.product.title}
                      />
                    </ImageHolder>
                    <DescriptionHolder>
                      <Heading>{data!.product.title}</Heading>
                      <p>{data!.product.title}</p>
                    </DescriptionHolder>
                  </Left>
                  <Right>
                    <AddToFavorites product={data!.product} />
                  </Right>
                </ProductInfo>
                {data!.product.filters && !!data!.product.filters.length && (
                  <Fragment>
                    <Tabs>
                      <li>
                        <a className="active" href="#">
                          Technical Details
                        </a>
                      </li>
                      {/* <li>
                        <a href="#">Price Chart</a>
                      </li> */}
                    </Tabs>
                    <Spec>
                      <Heading as="h3">Technical Details</Heading>
                      <SpecItem>
                        <div>
                          <strong>Product Name</strong>
                        </div>
                        <div>{data!.product.title}</div>
                      </SpecItem>
                      {data!.product.filters.map((filter, index) => (
                        <SpecItem key={index}>
                          <div>
                            <strong>{filter.key}</strong>
                          </div>
                          <div>{filter.values}</div>
                        </SpecItem>
                      ))}
                    </Spec>
                  </Fragment>
                )}

                <ProductListings>
                  <Heading divided>Available at</Heading>
                  {!data!.product.listings && (
                    <p>No listings exists for this product.</p>
                  )}
                  {(data!.product.listings || []).map(listing => (
                    <ListingItem
                      key={listing.id}
                      listing={listing}
                      product={data!.product}
                    />
                  ))}
                </ProductListings>
              </React.Fragment>
            );
          }}
        </Query>
      </Box>
    </DefaultLayout>
  );
};

export default ProductPage;

const Spec = styled.div`
  margin-bottom: ${props => props.theme.spacing.normal};
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    flex: 1;
  }
`;

const Tabs = styled.ul`
  padding: 0;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #ebebeb;
  list-style: none;
  list-style-image: none;
  margin: 0 0 -0.1rem 0;
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.normal};

  li {
    float: left;
    margin: 0;
    margin-right: 0.5rem;

    &:first-child {
      margin-left: ${props => props.theme.spacing.small};
    }

    a {
      display: block;
      position: relative;
      outline: 0;
      z-index: 1;
      padding: 10px;
      border: 1px solid #ebebeb;
      margin: 0 0 -0.1rem 0;
      background: #f9f9f9;
      color: #22313f;
      font-size: 1em;
      text-decoration: none;

      &.active {
        z-index: 1;
        padding: 9px 10px 10px 10px;
        border-width: 2px 1px 1px 1px;
        border-color: ${props => props.theme.colors.primary} #ebebeb #fff
          #ebebeb;
        background: #fff;
        color: #000;
      }
    }
  }
`;
