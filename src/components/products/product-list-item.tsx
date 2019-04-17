import React from 'react';
import { Product, Listing } from '@/interfaces/models';
import styled from '@/lib/styledComponents';
import { Link } from 'react-router-dom';
import Button from '../ui/button';
import Card from '../ui/card';
import ProductImage from './product-image';

type Props = {
  product: Product;
};

const ListingInfo: React.SFC<{
  listings: Listing[];
  cheapestListing?: Listing;
}> = ({ listings, cheapestListing }) => {
  if (!listings.length || !cheapestListing) {
    return <React.Fragment>0 shops</React.Fragment>;
  }

  return (
    <React.Fragment>
      {listings.length} shops, from {cheapestListing!.price} USD
    </React.Fragment>
  );
};

const StyledItem = styled(Card)`
  display: flex;
  flex-direction: row;
  margin-bottom: ${props => props.theme.spacing.normal};
`;

const Image = styled.div`
  flex: 1;
`;
const Title = styled.div`
  flex: 1;
`;
const Info = styled.div`
  flex: 1;
`;
const More = styled.div`
  flex: 1;
`;

const ProductListItem: React.SFC<Props> = ({ product }) => {
  return (
    <StyledItem className="product-list-item">
      <Image className="product-list-item-image">
        <ProductImage image={product.image} title={product.title} />
      </Image>
      <Title className="product-list-item-title">
        <Link to={`/product/${product.id}`}>{product.title}</Link>
      </Title>
      <Info className="product-list-item-info">
        <ListingInfo
          listings={product.listings || []}
          cheapestListing={product.cheapestListing}
        />
      </Info>
      <More className="product-list-item-more">
        <Button type="button" secondary to={`/product/${product.id}`} as={Link}>
          More
        </Button>
      </More>
    </StyledItem>
  );
};

export default ProductListItem;
