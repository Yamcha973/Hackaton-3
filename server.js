const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const connection = require('./conf');

const corsOptions = {
    origin: "http://localhost:3000",
  };
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({
    extended: true
}));

//fiche patient
app.get('/api/patients/:patient_id/medicaments/:id', (req, res) => {
    const idPatients = req.params.patient_id;
    const idTreatment = req.params.id;
    connection.query('SELECT * FROM medecine_alert ma JOIN medicaments me ON ma.medicaments_id=me.id WHERE patient_id = ? AND medicaments_id = ?', [idPatients, idTreatment], (err, results) => {
        if(err) {
            res.status(500).send('Error')
        } else {
            res.json(results);
        }
    });
});

//Treatment patient list 
app.get('/api/patients/:id/treatment', (req, res) => {
    const idPatients = req.params.id;
    connection.query('SELECT * FROM medecine_alert ma JOIN medicaments me ON ma.medicaments_id=me.id WHERE patient_id = ?', idPatients, (err, results) => {
        if(err) {
            res.status(500).send('Error')
        } else {
            res.json(results);
        }
    });
});

//Show all patients
app.get('/api/patients', (req, res) => {
    const patients = req.params.patients;
    connection.query('SELECT * FROM patients', patients, (err, results) => {
        if(err) {
            res.status(500).send('Error while getting patient list');
        } else {
            res.json(results);
        }
    });
});

//Show one patient
app.get('/api/patients/:id', (req, res) => {
    const idPatients = req.params.id;
    connection.query('SELECT * FROM patients WHERE id = ?', idPatients, (err, results) => {
        if(err) {
            res.status(500).send('Error while getting patient list');
        } else {
            res.json(results);
        }
    });
});

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


//Create a treatment for a patient who exist
app.post('/api/treatment/', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO medecine_alert SET ? WHERE id = ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error during treatment creation');
        } else {
            res.sendStatus(200);
        }
    });
});

//Create a treatment for a patient who exist
app.put('/api/treatment/:id', (req, res) => {
    const idTreatment = req.params.id;
    connection.query('UPDATE medecine_alert SET done = 1 WHERE id = ?', idTreatment, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error during treatment validation');
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

//Show all treatments
app.get('/api/treatments', (req, res) => {
    connection.query('SELECT * FROM medecine_alert ma JOIN patients p ON ma.patient_id = p.id JOIN medicaments on ma.medicaments_id = medicaments.id', (err, results) => {
        if(err) {
            res.status(500).send('Error while getting patient list');
        } else {
            res.json(results);
        }
    });
});




app.listen(port, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }
    console.log(`Server is running on ${port}`);
});