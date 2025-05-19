# Weather Forecast 

This platform is a weather forecast application that allows users to search for weather forecast data for a specified location. From this, users are able to visualize the longitude and latitude of the city with charts. Users can also store their favorite city, country, and weather type, and generate a list of all thier favorites

This is currently supported mainly on desktop browsers, however, it should work across mobile browsers.

The Developer Manual can be found below.
[Developer Manual](#developer-manual)



# Developer Manual

## How to install your application and all dependencies 

The developers will be required to download the project files, as well as download nvm following these steps: "https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/"

Users should also download: VSCode (or another coding platform), Insomnia (to test the API), Node.js, Supabase (database editing), Github (recommended), and Git.


## How to run your application on a server 

The user should run "npm start" in the terminal or command prompt.

## How to run tests

There are error and catch cases written to see if there are any issues within the code. These tests do not require developers to take any action. Developers may add additonal tests if necessary.

## The API for your server application 

### GET /api/location
This api endpoint gets the city from the Supabase table, and the returns the related longitude, latitude, and weather status. The coordinates are utilized by chart.js to create a bar chart.

### Post /api/favorite-info
This POST api end point allows the user to post their favorites (city, country, weather type) to a Supabase table.

### GET /api/favorite-info
This GET api endpoint returns the list of favorites (city, country, weather tyoe) that the user inputted and saved. 

## Future Road-Map

Users are not requried to create an account to access weather data or upload favorites. This could create accidental duplicates. In the future, developers could add this as an option, to better allow users to store and manage thier weather related data.
