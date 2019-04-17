import React from 'react';
import { Listing, Product } from '../../interfaces/models';
import styled from '../../lib/styledComponents';

type Props = {
  listing: Listing;
  product: Product;
};

const ListingItem: React.SFC<Props> = ({ product, listing }) => {
  return (
    <Wrapper>
      <div>
        <img src={product.image} alt={product.title} />
      </div>
      <Price>${listing.price}</Price>
      <Site>{listing.site}</Site>
      <div>
        <SeeOffer href={listing.url} target="_blank">
          See offer
        </SeeOffer>
      </div>
    </Wrapper>
  );
};

export default ListingItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    max-width: 40%;
  }
`;

const Price = styled.div`
  color: ${props => props.theme.colors.primary};
`;

const Site = styled.div`
  color: ${props => props.theme.colors.accent};
  a {
    color: ${props => props.theme.colors.accent};
  }
`;
const SeeOffer = styled.a`
  display: block;
  text-decoration: none;
  color: #fff;
  background: #1b95e0;
  padding: 5px 10px;
`;
