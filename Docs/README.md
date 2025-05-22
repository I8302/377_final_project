# Weather Forecast Introduction/Description

Simple Weather is a weather forecast application that provides users with weather information for a city of their choices. With Simple Weather, users are able to input the city location of their choice, and they will be abou to see the current weather status, as well as the longitude and latitude. Users are able to visualize the longitude and latitude of the city with charts. Users can also save their favorite city, country, and weather type, as well as access a list of their saved favorites later. Simple Weather is built mainly with HTML, CSS, and Javascript.

This application designed to be compatible with modern web browsers and is supported mainly on desktop browsers. However, this application should work across mobile browsers.

The Developer Manual can be found below.
[CLICK HERE FOR DEVELOPER MANUAL](#developer-manual)



# Developer Manual

## Introduction
This Developer Manual section is a guide for future developers to set up and work with Simple Weather. 

## How to install the application and dependencies 

1. First, should download Node Version Manager (NVM) following these steps: "https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/"

2. Then also download: a code editor (such as VSCode), Insomnia (to test the API), Node.js, Supabase (database management), Github (recommended), and Git.

3. Next, download each file under the project directory to their device. However, it may be helpful to clone the project repository from Github to edit the files.


## How to run the application on a server 

To run this application, developers should verify that they are in the corect directory with the Simple Weather files. Then, they should run "node index.js" to run the server at the local host.

## How to run tests

There are error and catch cases written in the code to see if there are any issuess. These tests do not require developers to take any action. Developers may add additonal tests if necessary.


## The API for your server application
## all GET, POST, PATCH, etc endpoints

All API endpoints are accessed via the front-end via Fetch calls.

### GET endpoint: /api/location

This api endpoint gets data from the Supabase table labelled "location". It gets the city from the table, and returns the related longitude, latitude, and weather status. The coordinates are utilized by chart.js to create a bar chart visual.

Query parameters includes text/string that the user will input into the search box.

### POST endpoint: /api/favorite-info
This POST api end point allows the user to add their favorite weather-related information (city, country, weather type) to a Supabase table.

### GET endpoint: /api/favorite-info
This GET api endpoint returns the list of previiously saved favorites that the user had inputted (including: city, country, weather type).


## Expectations around bugs & Future Road-Map

There are no known bugs.

Currently, the location table in the Supabase database is limited. The API endpoint fetches data from the table, but the table does not yet contain all city locations worldwide. As a result, usres may experience limitations when searching for cities that are not included in the database. 

This is a list of currently available cities with provided data that users may search: London, Greece, Budapest, Turkey, Nashville.

Additionally, users are not required to create an account to access weather data or upload favorites. This could create accidental duplicates. 

In the future, it will be helpful to add more cities and their weather-related data. As well as adding an option for users to create an account to manage thier weather related data.
