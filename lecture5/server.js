import express from 'express';
import { connectToDatabase } from './db.js';
import { User } from './models/User.js';
import { validateInput } from './middleware/validate.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { requireAuth, requireRole } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

function notFound(res) {
  return res.status(404).json({ error: 'Resursen finns inte' });
}

function isText(value) {
  return typeof value === 'string' && value.trim() !== '';
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
  } catch {
    res.status(400).json({ error: 'Ogiltigt ID-format' });
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

app.delete(
  '/users/:id',
  requireAuth,
  requireRole('admin'),
  async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  }
);

//Lektion 6 Säkerhet och autentisering

app.post('/auth/register', async (req, res) => {
  const { username, password, name, email } = req.body ?? {};
  if (!isText(username) || !isText(password)) {
    return res.status(400).json({ error: 'Fyll i namn och lösenord' });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hash, name, email });
  res.status(201).json({
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body ?? {};
  if (!isText(username) || !isText(password)) {
    return res.status(400).json({ error: 'Fyll i namn och lösenord' });
  }

  const user = await User.findOne({ username });
  const ok = user && (await bcrypt.compare(password, user.password));
  if (!ok) {
    return res.status(401).json({ error: 'Fel namn eller lösenord' });
  }

  const payload = { id: user.id, username: user.username, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/me', requireAuth, (req, res) => {
  res.json({ message: `Hej ${req.user.username}!` });
});

app.use((err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Avändarnamnet är upptaget' });
  }
  console.error(err.message);
  res.status(500).json({ error: 'Något gick fel' });
});

await connectToDatabase();

app.listen(PORT, () => {
  console.log('Servern lyssnar');
});
