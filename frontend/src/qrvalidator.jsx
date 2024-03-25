import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import './qrvalidator.css';

const QRValidator = () => {
    const [qrData, setQrData] = useState(null);
    const [adId, setAdId] = useState('');
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [brandName, setBrandName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle QR code scanning result
    const handleScanResult = async (text, result) => {
        console.log(text);
        setLoading(true);
        try {
            // Send the hashed QR code data to the backend
            const response = await fetch('http://localhost:8081/unhashdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ hashedData: text })
            });

            if (!response.ok) {
                throw new Error('Failed to send hashed data to the backend');
            }

            // Parse the response JSON
            const data = await response.json();

            // Assuming the backend sends back the unhashed data along with other information
            const { adId, productId, productName, brandName, description, additionalInfo } = data;

            // Update the state with the received data
            setAdId(adId);
            setProductId(productId);
            setProductName(productName);
            setBrandName(brandName);
            setDescription(description);
            setQrData(true);
            setError(null);
        } catch (error) {
            console.error('Error handling QR code result:', error);
            setError('Failed to fetch data from the backend');
        } finally {
            setLoading(false);
        }
    };

    // Function to handle QR code scanning error
    const handleScanError = (error) => {
        console.error('Error scanning QR code:', error);
        setError('Failed to scan QR code');
    };

    // Function to handle button click event
    const handleScanButtonClick = () => {
        // Reset the state before scanning a new QR code
        setQrData(null);
        setAdId('');
        setProductId('');
        setProductName('');
        setBrandName('');
        setDescription('');
        setError(null);
    };

    return (

        <div className='myapp'>
        <div className="qr-validator">
            <h1>QR Validator</h1>
            {/* Button to initiate QR code scanning */}
            <button onClick={handleScanButtonClick}>Scan QR Code</button>
            {/* QR code scanner component */}
            <div className='qr-scanner'>
                <Scanner
                    onResult={handleScanResult}
                    onError={handleScanError}
                />
            </div>
            {/* Display scanned QR code data */}
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {qrData && !loading && !error && (
                <div className="qr-data">
                    <h2>Scanned QR Code Data:</h2>
                    <p>Ad ID: {adId}</p>
                    <p>Product ID: {productId}</p>
                    <p>Product Name: {productName}</p>
                    <p>Brand Name: {brandName}</p>
                    <p>Description: {description}</p>
                </div>
            )}
        </div>
        </div>
    );
};

export default QRValidator;
