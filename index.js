const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let persons = [
    {
        id: 1,
        name: "João da Silva",
        age: 23,
        gender: "Male"
    },
    {
        id: 2,
        name: "Marcio Santos",
        age: 50,
        gender: "Male"
    },
    {
        id: 3,
        name: "Farnanda Souza",
        age: 19,
        gender: "Female"
    },
    {
        id: 4,
        name: "Gabriela Pacheco",
        age: 32,
        gender: "Female"
    }
]

let id = 4;

app.get('/persons', function(req, res) {
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.status(200);
    res.send(JSON.stringify(persons))
});

app.post('/persons', function(req, res) {
    id++;

    persons.push({
        id,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
    });

    res.set('Content-Type', 'application/json; charset=utf-8');
    res.status(201);
    res.send(JSON.stringify(req.body));
});

app.delete('/persons/:id', function(req, res) {
    persons = persons.filter(person => {
        return person.id != req.params.id;
    });

    res.set('Content-Type', 'application/json; charset=utf-8');
    res.status(200);
    res.send();
});

app.put('/persons/:id', function(req, res) {
    persons.forEach(person => {
        if (person.id == req.params.id) {
            person.name = req.body.name;
            person.age = req.body.age,
            person.gender = req.body.gender
        }
    });

    res.set('Content-Type', 'application/json; charset=utf-8');
    res.status(200);
    res.send();
});

app.listen(8000, function() {
    console.log('Servidor rodando na porta 8000.');
});
