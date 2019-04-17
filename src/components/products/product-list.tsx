import React, { useState, useEffect } from 'react';
import { Product } from '@/interfaces/models';
import ProductListItem from './product-list-item';
import styled from '../../lib/styledComponents';
import Heading from '../ui/heading';
import Card from '../ui/card';

type Props = {
  products: Product[];
  categorized?: boolean;
  horizontal?: boolean;
};

type CategorizedProductListItem = {
  categoryId: number;
  categoryTitle: string;
  items: Product[];
};

const useCategorizedProductList = (
  products: Product[],
  categorized: boolean,
  limitPerCategory: number = 10
) => {
  const [items, setItems] = useState<CategorizedProductListItem[]>([]);

  if (!categorized) {
    return products;
  }

  useEffect(() => {
    const filtered = products.reduce(
      (acc: CategorizedProductListItem[], product) => {
        const exists = acc.find(
          item => item.categoryId === product.category.id
        );

        if (exists) {
          if (exists.items.length < limitPerCategory) {
            exists.items.push(product);
          }
        } else {
          acc.push({
            categoryId: product.category.id,
            categoryTitle: product.category.title,
            items: [product],
          });
        }

        return acc;
      },
      []
    );

    setItems(filtered);
  }, [products]);

  return items;
};

const ProductList: React.SFC<Props> = ({
  products,
  categorized = false,
  horizontal = false,
}) => {
  const items = useCategorizedProductList(products, categorized);

  if (categorized) {
    if (!products.length) {
      return <React.Fragment>No products here...</React.Fragment>;
    }
    return (
      <ProductListCarousel>
        {(items as CategorizedProductListItem[]).map((item, index) => (
          <ProductListCarouselItemWrapper key={index}>
            <Heading divided>{item.categoryTitle}</Heading>
            <ProductListCarouselItems>
              {item.items.map(product => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </ProductListCarouselItems>
          </ProductListCarouselItemWrapper>
        ))}
      </ProductListCarousel>
    );
  }

  if (horizontal) {
    if (!products.length) {
      return <Card>No products here...</Card>;
    }

    return (
      <ProductListHorizontal>
        {products.map(product => (
          <ProductListHorizontalItem key={product.id}>
            <ProductListItem product={product} />
          </ProductListHorizontalItem>
        ))}
      </ProductListHorizontal>
    );
  }

  return (
    <div>
      {!products.length && <Card>No products here...</Card>}
      {!!products.length && (
        <React.Fragment>
          {products.map(product => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default ProductList;

const ProductListHorizontal = styled.div`
  display: flex;
  flex-wrap: wrap;

  .product-list-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${props => props.theme.spacing.normal};
    box-sizing: border-box;
    height: 100%;

    img {
      max-width: 100%;
    }
  }

  .product-list-item-more {
    margin-top: ${props => props.theme.spacing.normal};
  }

  .product-list-item-title {
    max-width: 90%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    a {
      text-decoration: none;
    }
  }
`;

const ProductListHorizontalItem = styled.div`
  flex: 0 0 25%;
  max-width: 25%;
  padding: ${props => props.theme.spacing.normal};
  box-sizing: border-box;
`;

const ProductListCarousel = styled.div``;
const ProductListCarouselItemWrapper = styled.div`
  margin-bottom: ${props => props.theme.spacing.large};
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid;
  border-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: ${props => props.theme.spacing.large};
`;
const ProductListCarouselItems = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  flex-wrap: nowrap;
  padding: ${props => props.theme.spacing.large} 0;

  .product-list-item {
    flex-direction: column;
    align-items: center;
    margin: 0 ${props => props.theme.spacing.huge};
    padding: ${props => props.theme.spacing.normal};
    border-radius: ${props => props.theme.radius};
    background-color: #fff;
    font-size: 0.8rem;
  }

  .product-list-item-image {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 96px;
    }
  }

  .product-list-item-more {
    width: 100%;
    text-align: right;
    flex-grow: 0;
    display: none;
    margin-top: ${props => props.theme.spacing.normal};
  }

  .product-list-item-info {
    display: none;
  }

  .product-list-item-title {
    max-width: 150px;
    text-align: center;
    display: flex;
    align-items: flex-end;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: ${props => props.theme.spacing.small};

    a {
      text-decoration: none;
    }
  }

  > * {
    flex: 0 0 auto;
  }
`;
