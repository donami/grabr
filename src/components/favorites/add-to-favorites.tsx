import React from 'react';
import Icon from '@/components/ui/icon';
import styled from '@/lib/styledComponents';
import { Product } from '@/interfaces/models';

type Props = {
  product: Product;
};

const AddToFavorites: React.SFC<Props> = () => {
  return (
    <Wrapper>
      <Icon title="Add to favorites" icon="star" />
      <span>Add to favorites</span>
    </Wrapper>
  );
};

export default AddToFavorites;

const Wrapper = styled.div`
  span {
    margin-left: ${props => props.theme.spacing.tiny};
  }
`;
