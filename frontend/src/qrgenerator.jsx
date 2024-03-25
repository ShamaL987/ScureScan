import React from 'react'
import { useState } from 'react';
import QRCode from 'qrcode';

const qrcode = () => {
    const [adId, setAdId] = useState('');
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [brandName, setBrandName] = useState('');
    const [description, setDescription] = useState('');
    const [qrcode, setQrcode] = useState('');
  
    const generateQrCode = async () => {
      const userData = {
        adId,
        productId,
        productName,
        brandName,
        description
      };
  
      try {
        const response = await fetch('http://localhost:8081/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
  
        if (!response.ok) {
          throw new Error('Failed to generate QR code');
        }
  
        const data = await response.json();
        const hashedData = data.hashedData;
  
        // Generate QR code using hashed data
        const url = await QRCode.toDataURL(hashedData, {
          width: 800,
          margin: 2
        });
  
        setQrcode(url);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div className='app'>
        <h1>Product QR Code Generator</h1>
        <label>Ad ID:</label>
        <input
          type="text"
          value={adId}
          onChange={(evt) => setAdId(evt.target.value)}
        />
        <label>Product ID:</label>
        <input
          type="text"
          value={productId}
          onChange={(evt) => setProductId(evt.target.value)}
        />
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(evt) => setProductName(evt.target.value)}
        />
        <label>Brand Name:</label>
        <input
          type="text"
          value={brandName}
          onChange={(evt) => setBrandName(evt.target.value)}
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        ></textarea>
        <button onClick={generateQrCode}>Generate QR Code</button>
        {qrcode && (
          <>
            <img src={qrcode} alt="" />
            <a href={qrcode} download="product_qrcode.png">Download QR Code</a>
          </>
        )}
      </div>
    );
}

export default qrcode