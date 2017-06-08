// routes/note_routes.js
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {

    app.get('/movies/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('movies').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error occured' });
            } else {
                res.send(item);
            }
        });
    });

    app.post('/movies', (req, res) => {
        const movie = { title:req.body.title, description:req.body.description, rating:req.body.rating, released:req.body.released };
        db.collection('movies').insert(movie, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/movies/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('movies').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send('Movie ' + id + 'deleted');
            }
        });
    });

    app.put('/movies/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const movie = { title: req.body.title, description: req.body.description, rating: req.body.rating, released: req.body.released };
        db.collection('movies').update(details, movie, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            } else {
                res.send('Movie ' + id + 'deleted');
            }
        });
    });
};
