Population Management System is an Node JS API that contains a list of locations, the total number of residents in each of the locations which are further broken down by their gender. 
With this API, you can add, edit, delete and view contacts as well as send, edit, receive and view locations.

# Pre-Requisites to be installed
Ensure to have these on your machine.

- Node

- Mongo

- Postman


# Set up:
 Clone the repository.

git clone `https://github.com/shakirandagire/Population-Management-System.git`

# Install the dependencies by running:

`npm install`

# Get started

`npm start`

You can now access the application using postman on http://localhost:3000


# Endpoints:

|EndPoint|Description|
|---------|------------|
|POST/locations|Creates a new location|
|PATCH/locations/:id|Updates a location|
|DELETE/locations/:id|Deletes a location|
|GET/locations|Get all locations|
|GET/locations/:id|Gets single location|


Datasets to use when testing in Postman
# Creating a new location
`{
    name: 'Kampala',
    females: 50,
    males: 40,
    parent_location: 3
 } `
