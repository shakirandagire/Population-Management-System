const request = require('supertest');
const app = require('../index')

const mongoose = require('mongoose');

const location = {
    name: 'Kampala',
    females: 50,
    males: 40
  };

const location2 = {
    name: 'Kampala2',
    females: 5,
    males: 4
  };

const empty_location = {
}

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/population_db'); 
mongoose.connection
    .once('open', () => {})
    .on('error', (error) => {
        console.warn('Error : ',error);
    });

describe('Test the home page for Population Mgt System', () => {
    test('It should show response to the GET method', async () => {
        const response = await request(app).get('/locations');
        expect(response.statusCode).toBe(200);
    })
})

describe('Test post location to the Population Mgt System', () => {
    test('It should post the location with the POST method', async () => {
        const response = await request(app)
                        .post('/locations')
                        .send(location)
        expect(response.statusCode).toBe(200);
    })

    test('It should not post the location without required data on the POST method', async () => {
        const response = await request(app)
                        .post('/locations')
                        .send(empty_location)
        expect(response.statusCode).toBe(400);
    })

})


describe('Test get location from the Population Mgt System', () => {
    test('It should get the specific location from GET method', async () => {
        const response = await request(app)
                        .post('/locations')
                        .send(location)           
        expect(response.statusCode).toBe(200);
        const id = response.body.id;
        const response2 = await request(app)
                        .get(`/locations/${id}`)          
        expect(response2.statusCode).toBe(200);
    })

    test('It should not get the specific location from GET method', async () => {
        const response = await request(app)
                        .get('/locations/:id')
        expect(response.statusCode).toBe(404);
    })
})

describe('Test edit location from the Population Mgt System', () => {
    test('It should edit the specific location from PATCH method', async () => {
        const response = await request(app)
                        .post('/locations')
                        .send(location)           
        expect(response.statusCode).toBe(200);
        const id = response.body.id;
        const response2 = await request(app)
                        .patch(`/locations/${id}`)
                        .send(location2)   
        expect(response2.statusCode).toBe(200);
    })

    test('It should edit the specific location from PATCH method', async () => {
        const response = await request(app)
                        .post('/locations')
                        .send(location)           
        expect(response.statusCode).toBe(200);
        const id = response.body.id;
        const response2 = await request(app)
                        .patch(`/locations/${id}`)
                        .send(location2)   
        expect(response2.statusCode).toBe(404);
    })
})



