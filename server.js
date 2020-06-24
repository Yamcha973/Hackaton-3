const express = require('express');
const app = express();
const port = 8000;
const connection = require('./conf');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Show all patients
app.get('/api/patients', (req, res) => {
    const patients = req.params.patients;
    connection.query('SELECT * FROM patients p JOIN medecine_alert ma ON p.id=ma.patient_id WHERE ma.done=0', patients, (err, results) => {
        if(err) {
            res.status(500).send('Error while getting patient list');
        } else {
            res.json(results);
        }
    });
})

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

//Create a treatment for a patient
app.post('/api/treatment/', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO medecine_alert SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error during treatment creation');
        } else {
            res.sendStatus(200);
        }
    });
});

//Create a medicament
app.post('/api/medicaments/', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO medicaments SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error during medicament creation');
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