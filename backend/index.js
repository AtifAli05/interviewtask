require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// GET all geojsons
app.get('/geojsons', async (req, res) => {
  const result = await pool.query('SELECT * FROM geojson_data');
  res.json(result.rows);
});

// POST new geojson
app.post('/geojsons', async (req, res) => {
  const { name, geojson } = req.body;
  const geometry = geojson.geometry;

  const result = await pool.query(
    `INSERT INTO geojson_data (id, name, geojson, geometry)
     VALUES ($1, $2, $3, ST_SetSRID(ST_GeomFromGeoJSON($4), 4326))
     RETURNING *`,
    [uuidv4(), name, geojson, JSON.stringify(geometry)]
  );

  res.status(201).json(result.rows[0]);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
