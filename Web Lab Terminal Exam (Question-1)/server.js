const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(cors());

// connect to the database
mongoose.connect('mongodb://localhost/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create a todo model
const Todo = mongoose.model('Todo', {
  todo: String,
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// add todo api
app.post('/api/todos', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

// delete todo api
app.delete('/api/todos/:id', async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndDelete(id);
  res.json({ success: true });
});

// update todo api
app.put('/api/todos/:id', async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndUpdate(id, {todo: req.body.todo});
  res.json({ success: true });
});

app.listen(5000, () => console.log('Server listening on port 5000!'));