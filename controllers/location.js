const Location = require('../models/location.js');
const _ = require('lodash');

exports.create = (req, res) => {
    if(!req.body.name || !req.body.females || !req.body.males ) {
        return res.status(400).send({
            message: "Ensure that you fill all fields"
        });
    }

    const location = new Location({
        name: req.body.name,
        females: req.body.females,
        males: req.body.males,
        parent_location: req.body.parent_location,
    });

    location.save()
    .then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the location."
        });
    });

};

exports.findAll = (req, res) => {
    Location.find()
    .then(location => {
        var males = _.sumBy(location, 'males');
        var females = _.sumBy(location, 'females');
        const total_residents = females + males;
        res.status(200).send({
            status: 'Successful',
            message: 'Contact retrieved',
            population: { location, females, males, total_residents },
            });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving location."
        });
    });
};

exports.findOne = (req, res) => {
   Location.findById(req.params.id)
    .then(location => {
        if (location && location.length > 1) {
            var males = _.sumBy(location, 'males');
            var females = _.sumBy(location, 'females');
            var total_residents = females + males;
            return res.status(200).send({
              Name: location.name,
              location,
              females,
              males,
              total_residents
            });
          }
          if (location.length === 1) {
            var female = location[0].females;
            var male = location[0].males;
            var residents = female + male;
      
            return res.status(200).send({ location, female, male, residents });
          }
        if(!location) {
            return res.status(404).send({
                message: "Location not found with id " + req.params.id
            });            
        }
        res.send(location);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Location not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving location with id " + req.params.id
        });
    });

};

exports.update = (req, res) => {
    if(!req.body.name || !req.body.females || !req.body.males) {
        return res.status(400).send({
            message: "Ensure that you fill all fields"
        });
    }


    Location.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        females: req.body.females,
        males: req.body.males,
        parent_location: req.body.parent_location
    }, {new: true})
    .then(location => {
        if(!location) {
            return res.status(404).send({
                message: "Location not found with id " + req.params.id
            });
        }
        res.send(location);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });

};

exports.delete = (req, res) => {
    Location.findByIdAndRemove(req.params.id)
    .then(location => {
        if(!location) {
            return res.status(404).send({
                message: "Location not found with id " + req.params.id
            });
        }
        res.send({message: "Location deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Location not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete location with id " + req.params.id
        });
    });

};