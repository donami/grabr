import React from 'react';
import ReactImageFallback from 'react-image-fallback';
import placeholderImage from './placeholder-image.png';
import loadingImage from './loading.gif';

type Props = { image?: string; title?: string };
const ProductImage: React.SFC<Props> = ({ image, title, ...other }) => {
  const skipNames = ['blank.gif'];
  const fileName = (image || '').split('/');
  const srcImage =
    image && skipNames.indexOf(fileName[fileName.length - 1]) === -1
      ? image
      : placeholderImage;

  return (
    <ReactImageFallback
      src={srcImage}
      fallbackImage={placeholderImage}
      alt={title || ''}
      initialImage={loadingImage}
      className="product-image"
      {...other}
    />
  );
};

export default ProductImage;
