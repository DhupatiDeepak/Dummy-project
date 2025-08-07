const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON

// Sample tasks array
let tasks = [
  { id: 1, title: 'Learn Node.js', done: false },
  { id: 2, title: 'Build REST API', done: false }
];

// ✅ GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// ✅ GET a single task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

// ✅ POST new task
app.post('/tasks', (req, res) => {
  const newTask = req.body;

  if (!newTask.title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ✅ PUT update task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;

  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, ...updatedTask } : task
  );

  res.send(`Task ${taskId} updated`);
});

// ✅ DELETE task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.send(`Task ${taskId} deleted`);
});

// ✅ Start server
app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
