//
// async function fetchWeather(city) {
//   try {
//     const response = await fetch(`http://localhost:3000/api/location?city=${encodeURIComponent(city)}`);
//     const data = await response.json();

//     if (response.ok) {
//       console.log('Weather/location data:', data);
//       alert(`City: ${data.city}\nLongitude: ${data.longitude}\nLatitude: ${data.latitude}\nWeather: ${data.weather_status}`);
//     } else {
//       console.error('Error:', data.error);
//     }
//   } catch (error) {
//     console.error('Error fetching city weather:', error);
//   }
// }


let currentChart = null;

// Function to fetch weather details based on city name
// Function to fetch weather details based on city name
async function fetchWeather(city) {
    try {
        console.log(`Fetching weather for city: ${city}`);
        const response = await fetch(`http://localhost:3000/api/location?city=${encodeURIComponent(city)}`);
        
        // Log the raw response to check if the server is returning data
        const data = await response.json();
        console.log('Fetched data:', data);
        
        if (response.ok) {
            // Display weather details on the page
            document.getElementById('weatherData').innerHTML = `
                <h2>Weather in ${data.city}</h2>
                <p>Longitude: ${data.longitude}</p>
                <p>Latitude: ${data.latitude}</p>
                <p>Weather: ${data.status}</p>
            `;


            createChart(data);

        } else {
            // Handle the error returned by the API
            document.getElementById('weatherData').innerHTML = `<p>Error: ${data.error}</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weatherData').innerHTML = '<p>There was an error fetching the weather data. Please try again.</p>';
    }
}


// Function to create a chart with weather data using Chart.js
function createChart(data) {
    const ctx = document.getElementById('weatherChart').getContext('2d');

    // Destroy previous chart if it exists
    if (currentChart) {
        currentChart.destroy();
    }

    // Create a new chart and store the reference
    currentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Longitude', 'Latitude'],
            datasets: [{
                label: 'Weather Data',
                data: [data.longitude, data.latitude],
                backgroundColor: ['blue', 'purple'],
                borderColor: ['green', 'pink'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


// Event listener to fetch weather when button is clicked
document.getElementById('fetch-weather-btn').addEventListener('click', () => {
    const city = document.getElementById('city-name').value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name!!');
    }
});



// Function to handle adding favorites
async function addFavorite() {
    const city = document.getElementById('favorite-city').value.trim();
    const country = document.getElementById('favorite-country').value.trim();
    const weatherType = document.getElementById('favorite-weather').value.trim();

    // Check input
    if (!city || !country || !weatherType) {
        alert('Please fill in all fields.');
        return;
    }


    try {
        const response = await fetch('http://localhost:3000/api/favorite-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ city, country, weather_type: weatherType })
        });

        const result = await response.json();
        
        if (response.ok) {
            alert('Favorite added successfully!');
            console.log(result.message); 
        } else {
            console.error(result.error); 
            alert('Failed to add favorite.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error adding your favorite.');
    }
}

// Event listener for the Add Favorite button
document.getElementById('add-favorite-btn').addEventListener('click', addFavorite);