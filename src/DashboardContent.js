import React from 'react';
import ProductList from './ProductList'; // Import ProductList component


const DashboardContent = ({ totalProducts, totalPurchases, activeMenuItem, dummyProducts }) => {
  return (
    <div className="main-content">
      {activeMenuItem === 'dashboard' && (
        <>
          <h2>Total Products: {totalProducts}</h2>
          <h2>Total Purchases: {totalPurchases}</h2>
        </>
      )}
      {activeMenuItem === 'products' && (
        <ProductList products={dummyProducts} /> // Assuming ProductList is imported and available here
      )}
    </div>
  );
};

export default DashboardContent;
