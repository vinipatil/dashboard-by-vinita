import React from 'react';

const Page1 = () => {
  const data = [65, 59, 80, 81, 56, 55, 40];
  return (
    <div>
      <h2>Page 1</h2>
      <p>Data: {data.join(', ')}</p>
    </div>
  );
};

export default Page1;
