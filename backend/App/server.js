import express from 'express';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'qrcode'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to receive user details and save to MySQL
app.post('/user', (req, res) => {
  const { adId, productId, productName, brandName, description } = req.body;

  // Hash the data
  const hashedData = bcrypt.hashSync(JSON.stringify(req.body), 10);

  // Save to MySQL
  const sql = 'INSERT INTO users (ad_id, product_id, product_name, brand_name, description, hashed_data) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [adId, productId, productName, brandName, description, hashedData];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error saving to MySQL:', err);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
    console.log('User data saved to MySQL');
    res.json({ success: true, hashedData });
  });
});

// Endpoint to receive hashed data and unhash it
app.post('/unhashdata', (req, res) => {
    try {
      // Get the hashed data from the request body
      const hashedData = req.body.hashedData;
  
      // Query the database to select all hashed data
      const sql = 'SELECT * FROM users'; // Update with your table name
      connection.query(sql, (err, results) => {
        if (err) {
          console.error('Error selecting hashed data:', err);
          return res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
  
        // Iterate over the results to find a match
        let matchedData = null;
        results.forEach(row => {
          if (hashedData === row.hashed_data) {
            // Hashed data matches a record in the database
            matchedData = row;
            return;
          }
        });
  
        if (matchedData) {
          // Send the matched data back to the frontend
          const { ad_id, product_id, product_name, brand_name, description } = matchedData;
          res.status(200).json({ success: true, adId: ad_id, productId: product_id, productName: product_name, brandName: brand_name, description: description });
        } else {
          // No match found
          res.status(400).json({ success: false, error: 'No matching data found' });
        }
      });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


// Route to handle deletion of records
app.post('/delete_record', (req, res) => {
  try {
    const { adId, productId } = req.body;

    if (!adId || !productId) {
      return res.status(400).json({ error: 'Ad ID and Product ID are required' });
    }

    const deleteQuery = 'DELETE FROM users WHERE ad_id = ? AND product_id = ?';

    connection.query(deleteQuery, [adId, productId], (err, results) => {
      if (err) {
        console.error('Error deleting record:', err);
        return res.status(500).json({ error: 'Failed to delete record' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Record not found' });
      }

      console.log('Number of records deleted:', results.affectedRows);
      res.status(200).json({ message: 'Record deleted successfully' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
