import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection setup with reconnection logic
let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: '148.251.246.72',
    user: 'ojpsjxez_sharenet',
    password: 'Pwa4zamRhbXaEbYgLwWU',
    database: 'ojpsjxez_sharenet'
  });

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      setTimeout(handleDisconnect, 2000); // Try reconnecting after 2 seconds
    } else {
      console.log('MySQL connected...');
    }
  });

  db.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
      console.error('MySQL connection lost. Reconnecting...');
      handleDisconnect(); // Reconnect if the connection is lost
    } else {
      throw err;
    }
  });
}

handleDisconnect(); // Start the connection handling

// API Route to fetch workshops data
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM workshops';

  console.log('Executing query:', query);

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching workshops:', err);
      res.status(500).json({ error: 'Database query failed', details: err.message });
      return;
    }

    if (results.length === 0) {
      console.warn('No workshops found in the database');
      res.status(404).json({ message: 'No workshops available' });
      return;
    }

    console.log('Workshops data retrieved successfully:', results);
    res.json(results);
  });
});

// API Route to book a workshop
app.post('/api/book', (req, res) => {
  const { workshop_id, user_name, booking_date } = req.body;
  const updateSeatsQuery = `UPDATE workshops SET seats_available = seats_available - 1 WHERE id = ? AND seats_available > 0`;

  console.log('Updating seats for workshop ID:', workshop_id);

  db.query(updateSeatsQuery, [workshop_id], (err, result) => {
    if (err) {
      console.error('Error updating seats:', err);
      res.status(500).json({ error: 'Failed to update seats', details: err.message });
      return;
    }

    if (result.affectedRows === 0) {
      console.warn('No seats available for workshop ID:', workshop_id);
      res.status(400).json({ error: 'No seats available' });
      return;
    }

    const insertBookingQuery = `INSERT INTO bookings (workshop_id, user_name, booking_date, status) VALUES (?, ?, ?, 'booked')`;

    console.log('Inserting booking for workshop ID:', workshop_id, 'user:', user_name);

    db.query(insertBookingQuery, [workshop_id, user_name, booking_date], (err, result) => {
      if (err) {
        console.error('Error inserting booking:', err);
        res.status(500).json({ error: 'Failed to book workshop', details: err.message });
        return;
      }
      console.log('Booking successful for workshop ID:', workshop_id, 'user:', user_name);
      res.send('Booking successful!');
    });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
