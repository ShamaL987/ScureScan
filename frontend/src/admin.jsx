import React, { useState } from 'react';

const Admin = () => {
  const [adId, setAdId] = useState('');
  const [productId, setProductId] = useState('');
  const [result, setResult] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:8081/delete_record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ adId, productId })
      });

      if (!response.ok) {
        throw new Error('Failed to delete data from the database');
      }

      const data = await response.json();
      setResult(data.message);

      setAdId('');
      setProductId('')

    } catch (error) {
      console.error('Error deleting data:', error);
      setResult('Failed to delete data from the database');
    }
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <div>
        <label htmlFor="adId">Ad ID:</label>
        <input 
          type="text" 
          id="adId" 
          value={adId} 
          onChange={(e) => setAdId(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="productId">Product ID:</label>
        <input 
          type="text" 
          id="productId" 
          value={productId} 
          onChange={(e) => setProductId(e.target.value)} 
        />
      </div>
      <button onClick={handleDelete}>Delete from Database</button>
      {result && <p>{result}</p>}
    </div>
  );
};

export default Admin;
