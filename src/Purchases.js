import React from 'react';


const Purchases = ({ purchaseData }) => {
  return (
    <div className="purchases">
      <h2>Purchases</h2>
      <div className="table-container">
  <table>
    <thead>
      <tr>
        <th>Month</th>
        <th>Number of Purchases</th>
      </tr>
    </thead>
    <tbody>
    {purchaseData.labels.map((month, index) => (
    <tr key={month}>
      <td>{month}</td>
      <td>{purchaseData.datasets[0].data[index]}</td>
    </tr>
  ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Purchases;
