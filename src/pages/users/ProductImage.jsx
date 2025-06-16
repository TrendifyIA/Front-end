/**
 * @file ProductImage.jsx
 * @author Pablo Alonso
 * @description Componente que acompaña el producto de una imagen para mostrarser.
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renderiza una imagen de producto o un marcador de posición si no se proporciona una fuente de imagen.
 *
 * @componente
 * @param {Object} props
 * @param {string} props.src - La URL de la imagen del producto.
 * @param {string} [props.alt] - El texto alternativo para la imagen. Por defecto es "Imagen del producto" si no se proporciona.
 * @param {string} [props.className] - Clases CSS adicionales para estilizar la imagen o el marcador de posición.
 * @returns {JSX.Element} La imagen renderizada o un marcador de posición si no hay imagen disponible.
 */
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