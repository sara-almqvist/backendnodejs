import express from 'express';
import { connectToDatabase } from './db.js';
import { User } from './models/User.js';
import { validateInput } from './middleware/validate.js';

const app = express();
const PORT = process.env.PORT || 3000;

function notFound(res) {
  return res.status(404).json({ error: 'Resursen finns inte' });
}

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Välkommen till denna startsida' });
});

//Rutter för resursen users
app.get('/users', async (req, res) => {
  const allUsers = await User.find();
  if (!allUsers) {
    return notFound(res);
  }
  res.json(allUsers);
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return notFound(res);
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ err: 'Ogiltigt ID-format' });
  }
});

app.post('/users', validateInput, async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.status(201).json(user);
});

app.put('/users/:id', validateInput, async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email },
    { returnDocument: 'after', runValidators: true }
  );
  res.status(200).json(user);
});

app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Något gick fel' });
});

await connectToDatabase();

app.listen(PORT, () => {
  console.log('Servern lyssnar');
});
