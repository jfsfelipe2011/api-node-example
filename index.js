const express = require('express');
const bodyParser = require('body-parser');
const joi = require('@hapi/joi');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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

app.get('/persons/:id', function(req, res) {
    const schema = joi.object({
        id: joi.number().required()
    })

    const result = schema.validate(req.params);

    if (result.error !== undefined) {
        res.set('Content-Type', 'application/json; charset=utf-8');
        res.status(422);
        return res.send(JSON.stringify(result.error));
    }

    const [person] = persons.filter(person => {
        return person.id == req.params.id;
    });

    res.set('Content-Type', 'application/json; charset=utf-8');
    res.status(200);
    res.send(JSON.stringify(person));
});

app.post('/persons', function(req, res) {
    const schema = joi.object({
        name: joi.string().max(30).required(),
        age: joi.number().min(0).max(122).required(),
        gender: joi.string().valid(...['Male', 'Female', 'Others']).required()
    })

    const result = schema.validate(req.body);

    if (result.error !== undefined) {
        res.set('Content-Type', 'application/json; charset=utf-8');
        res.status(422);
        return res.send(JSON.stringify(result.error));
    }

    id++;

    persons.push({
        id,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
    });

    res.set('Content-Type', 'application/json; charset=utf-8');
    res.status(201);
    return res.send(JSON.stringify(req.body));
});

app.delete('/persons/:id', function(req, res) {
    const schema = joi.object({
        id: joi.number().required()
    })

    const result = schema.validate(req.params);

    if (result.error !== undefined) {
        res.set('Content-Type', 'application/json; charset=utf-8');
        res.status(422);
        return res.send(JSON.stringify(result.error));
    }

    persons = persons.filter(person => {
        return person.id != req.params.id;
    });

    res.set('Content-Type', 'application/json; charset=utf-8');
    res.status(200);
    res.send();
});

app.put('/persons/:id', function(req, res) {
    const schema = joi.object({
        id: joi.number().required(),
        name: joi.string().max(30).required(),
        age: joi.number().min(0).max(122).required(),
        gender: joi.string().valid(...['Male', 'Female', 'Others']).required()
    })

    const result = schema.validate({
        ...req.params,
        ...req.body
    });

    if (result.error !== undefined) {
        res.set('Content-Type', 'application/json; charset=utf-8');
        res.status(422);
        return res.send(JSON.stringify(result.error));
    }

    persons.forEach(person => {
        if (person.id == req.params.id) {
            person.name = req.body.name;
            person.age = req.body.age,
            person.gender = req.body.gender
        }
    });

    res.set('Content-Type', 'application/json; charset=utf-8');
    res.status(200);
    return res.send();
});

app.listen(8000, function() {
    console.log('Servidor rodando na porta 8000.');
});
