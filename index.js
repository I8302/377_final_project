// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Initialize Supabase
const supabaseUrl = 'https://vvfhfukdyjkpqmhoixzd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2ZmhmdWtkeWprcHFtaG9peHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NTg1MDksImV4cCI6MjA2MzAzNDUwOX0.LscaU3_X2YkqXACu595TAjA5Shmj2obNkDPFxBSLNU8';  // Replace with your actual Supabase Key
const supabase = createClient(supabaseUrl, supabaseKey);


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

    // Return success message
    console.log('Inserted data:', data);
    return res.status(200).json({
      message: 'Favorite location saved successfully!',
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'An error occurred while saving the location' });
  }
});

// GET endpoint to fetch the saved favorite data
app.get('/api/favorite-info', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('favorite')
      .select('city, country, weather_type')
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'An error occurred while fetching the favorites' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
