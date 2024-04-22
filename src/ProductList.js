import React from 'react';

const ProductList = ({ products }) => {
  const productsByCategory = {};
  products.forEach((product) => {
    const category = product.category.charAt(0).toUpperCase() + product.category.slice(1); 
    if (!productsByCategory[category]) {
      productsByCategory[category] = [];
    }
    productsByCategory[category].push(product);
  });

  return (
    <div className="product-list">
      {Object.keys(productsByCategory).map((category) => (
        <div key={category} className="category">
          <h2>{category}</h2>
          <div className="product-container">
            {productsByCategory[category].map((product) => (
              <div className="product" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div><br></br>
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.details}</p>
                  <p className="product-price">Price: {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
