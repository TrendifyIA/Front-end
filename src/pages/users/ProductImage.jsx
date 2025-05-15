import React from 'react';
import PropTypes from 'prop-types';

const ProductImage = ({ src, alt, className = "" }) => {
  if (!src) {
    return (
      <div className={`bg-gray-200 rounded-md flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-xs">No image</span>
      </div>
    );
  }

  return (
    <img 
      src={src}
      alt={alt || "Product image"}
      className={`object-contain rounded-md ${className}`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "";
      }}
    />
  );
};

ProductImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default ProductImage;