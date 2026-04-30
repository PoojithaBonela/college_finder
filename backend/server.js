const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('College Finder API is UP and RUNNING on port 5001');
});

// Fetch colleges with search, filters, and sorting
app.get('/colleges', async (req, res) => {
  try {
    const { search, location, type, fees, rating, nirf_rank, sort } = req.query;
    let query = 'SELECT * FROM colleges WHERE 1=1';
    let params = [];
    let paramCount = 1;

    // Search logic
    if (search) {
      const searchTerm = search.toLowerCase();
      const abbreviations = {
        'iit': 'Indian Institute of Technology',
        'nit': 'National Institute of Technology',
        'iiit': 'Indian Institute of Information Technology'
      };

      if (abbreviations[searchTerm]) {
        query += ` AND name ILIKE $${paramCount}`;
        params.push(`%${abbreviations[searchTerm]}%`);
      } else {
        query += ` AND (name ILIKE $${paramCount} OR city ILIKE $${paramCount})`;
        params.push(`%${searchTerm}%`);
      }
      paramCount++;
    }

    // Filter logic
    if (location) {
      query += ` AND (city ILIKE $${paramCount} OR location ILIKE $${paramCount})`;
      params.push(`%${location}%`);
      paramCount++;
    }
    if (type) {
      query += ` AND college_type = $${paramCount}`;
      params.push(type);
      paramCount++;
    }

    // Fees range logic
    if (fees) {
      if (fees === "under_1_5") {
        query += " AND fees < 150000";
      } else if (fees === "1_5_to_2") {
        query += " AND fees BETWEEN 150000 AND 200000";
      } else if (fees === "2_to_2_5") {
        query += " AND fees BETWEEN 200000 AND 250000";
      } else if (fees === "2_5_to_3") {
        query += " AND fees BETWEEN 250000 AND 300000";
      } else if (fees === "above_3") {
        query += " AND fees > 300000";
      }
    }

    if (rating) {
      query += ` AND rating >= $${paramCount}`;
      params.push(parseFloat(rating));
      paramCount++;
    }

    if (nirf_rank) {
      query += ` AND nirf_rank <= $${paramCount}`;
      params.push(parseInt(nirf_rank));
      paramCount++;
    }

    // Sorting logic
    if (sort) {
      switch (sort) {
        case 'fees_asc': query += ' ORDER BY fees ASC'; break;
        case 'fees_desc': query += ' ORDER BY fees DESC'; break;
        case 'rating_desc': query += ' ORDER BY rating DESC'; break;
        case 'rating_asc': query += ' ORDER BY rating ASC'; break;
        case 'nirf_best': query += ' ORDER BY nirf_rank ASC'; break;
        case 'newest': query += ' ORDER BY established_year DESC'; break;
        case 'oldest': query += ' ORDER BY established_year ASC'; break;
        default: query += ' ORDER BY id ASC';
      }
    } else {
      query += ' ORDER BY id ASC';
    }

    console.log(`🚀 Executing query: ${query} with params:`, params);
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error while fetching colleges' });
  }
});

// Fetch a single college by ID
app.get('/colleges/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM colleges WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'College not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error while fetching college details' });
  }
});

// Catch-all route for debugging
app.use((req, res) => {
  res.status(404).send(`Route not found: ${req.method} ${req.url}`);
});

// Test database connection on startup
db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Database connected at:', res.rows[0].now);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Test at http://localhost:${PORT}/`);
});
