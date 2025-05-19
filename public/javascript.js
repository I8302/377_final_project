let currentChart = null;

  document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.glide')) {
        new Glide('.glide', {
            type: 'carousel',
            startAt: 0,
            perView: 1,
            autoplay: 3000, // Auto-slide every 3 seconds
            hoverpause: true
        }).mount();
    }
});

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.glide')) {
    new Glide('.glide', {
      type: 'carousel',
      startAt: 0,
      perView: 1,
      autoplay: 3000,
      hoverpause: true
    }).mount();
  }
});

// Fetch weather information based on city name
async function fetchWeather(city) {
    try {
        console.log(`Fetching weather for city: ${city}`);
        const response = await fetch(`/api/location?city=${encodeURIComponent(city)}`);
        
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
            document.getElementById('weatherData').innerHTML = `<p>Error: ${data.error}</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weatherData').innerHTML = '<p>There was an error fetching the weather data. Please try again.</p>';
    }
}


// Create a chart with weather data using Chart.js
function createChart(data) {
    const ctx = document.getElementById('weatherChart').getContext('2d');

    // Destroy previous chart if it exists
    if (currentChart) {
        currentChart.destroy();
    }

    // Create a new chart and store the data
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
document.getElementById('buttonOne').addEventListener('click', () => {
    const city = document.getElementById('city-name').value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name!!');
    }
});


// Function to add favorites
async function addFavorite() {
    const city = document.getElementById('favorite-city').value.trim();
    const country = document.getElementById('favorite-country').value.trim();
    const weatherType = document.getElementById('favorite-weather').value.trim();

    if (!city || !country || !weatherType) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch('/api/favorite-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({city, country, weather_type: weatherType})
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
document.getElementById('buttonTwo').addEventListener('click', addFavorite);


// Fetch and display the added favorite data
async function fetchFavorites() {
    try {
        const response = await fetch('/api/favorite-info');
        const favorites = await response.json();

        if (favorites.length === 0) {
            document.getElementById('favorites-list').innerHTML = '<p>No favorites to display.</p>';
            return;
        }

        // Clear the existing favorites list before adding new ones
        const favoritesList = document.getElementById('favorites-list');
        favoritesList.innerHTML = '';
        const recentFavorites = favorites; 

        recentFavorites.forEach(favorite => {
            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('favorite-item');
            favoriteItem.innerHTML = `
                <h3>${favorite.city}, ${favorite.country}</h3>
                <p>Weather: ${favorite.weather_type}</p>

            `;
            favoritesList.appendChild(favoriteItem);
        });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        document.getElementById('favorites-list').innerHTML = '<p>Failed to load favorites.</p>';
    }
}

document.getElementById('load-favorites-btn').addEventListener('click', fetchFavorites);
