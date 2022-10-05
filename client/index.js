const Joi = require('joi');
const express = require('express');

const app = express();

app.use(express.json());

const courses = [
  {
    id: 1,
    name: 'The Ultimate Typescript',
    author: 'Mosh Hamedani',
    price: 55,
  },
  {
    id: 2,
    name: 'The Ultimate Java Series',
    author: 'Mosh Hamedani',
    price: 34,
  },
  {
    id: 3,
    name: 'The Ultimate Django Series',
    author: 'Mosh Hamedani',
    price: 150,
  },
  {
    id: 4,
    name: 'The FullStack JavaScript Mastery Bundle',
    author: 'Mosh Hamedani',
    price: 200,
  },
];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// Creating a post request.
app.post('/api/courses', (req, res) => {
  // To valide first you need to create a schema object
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  // Validate the schema object
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  // Create the course object
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// Creating HTTP Put request -------------
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The couse by given ID was not found.');

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  // Validate the schema object
  const result = schema.validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  course.name = req.body.name;
});

// Creating Delete Request
app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The couse by given ID was not found.');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('The couse by given ID was not found.');
  res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

// Creating a function to validate the course
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}
