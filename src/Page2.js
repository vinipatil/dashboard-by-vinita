import React from 'react';

const Page2 = () => {
  const data = [30, 50, 75, 45, 70, 30, 60];
  return (
    <div>
      <h2>Page 2</h2>
      <p>Data: {data.join(', ')}</p>
    </div>
  );
};

export default Page2;
