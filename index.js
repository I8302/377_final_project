// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Initialize Supabase client directly with URL and Key
const supabaseUrl = 'https://vvfhfukdyjkpqmhoixzd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2ZmhmdWtkeWprcHFtaG9peHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NTg1MDksImV4cCI6MjA2MzAzNDUwOX0.LscaU3_X2YkqXACu595TAjA5Shmj2obNkDPFxBSLNU8';  // Replace with your actual Supabase Key
const supabase = createClient(supabaseUrl, supabaseKey);

// // GET endpoint to stored locations from Supabase
// app.get('/api/location', async (req, res) => {
//   const { data, error } = await supabase.from('location').select('*');
//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }
//   res.json(data);
// });


// http://localhost:3000/api/location?city=London
// GET endpoint to get location details based on the city name
app.get('/api/location', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  const {data, error} = await supabase
    .from('location')
    .select('latitude, longitude, city, status')
    .eq('city', city)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});



//http://localhost:3000/api/favorite-info
// POST endpoint to save favorite info to supabase table
app.post('/api/favorite-info', async (req, res) => {
  const { city, country, weather_type } = req.body;

  // Validate the input
  if (!city || !country || !weather_type) {
    return res.status(400).json({ error: 'Missing city, country, or weather_type' });
  }

  try {
    // Insert the favorite location into the Supabase table 'favorite'
    const {data, error} = await supabase
      .from('favorite')
      .insert([{ city, country, weather_type }]);

    // Handle errors from Supabase
    if (error) {
      console.error('Error inserting data:', error);
      return res.status(500).json({ error: 'Failed to save favorite location' });
    }

    // Successfully inserted data, return a success message
    console.log('Inserted data:', data);
    return res.status(200).json({
      message: 'Favorite location saved successfully!',
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'An error occurred while saving the location' });
  }
});



// GET endpoint to fetch all favorite locations
app.get('/api/favorite-info', async (req, res) => {
  const { data, error } = await supabase.from('favorite').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);  // Return the favorite locations
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
