module.exports = (app) => {
    const location = require('../controllers/location.js');

    // Create a new location
    app.post('/locations', location.create);

    // Retrieve all location
    app.get('/locations', location.findAll);

    // Retrieve a single location with locationId
    app.get('/locations/:id', location.findOne);

    // Update a location with locationId
    app.put('/locations/:id', location.update);

    // Delete a location with locationId
    app.delete('/locations/:id', location.delete);
}