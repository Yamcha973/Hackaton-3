const express = require('express');
const app = express();
const port = 8000;
const connection = require('./conf');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Create a patient
app.post('/api/patients', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO patients SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error during patient creation');
        } else {
            res.sendStatus(200);
        }
    });
});




app.listen(port, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }
    console.log(`Server is running on ${port}`);
});