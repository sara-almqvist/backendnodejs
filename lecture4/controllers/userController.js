import { query } from '../db.js';
import User from '../models/User.js';

//Hämta alla användare (GET)

//pg
export const getUsers = async (req, res) => {
  try {
    const result = await query('SELECT * FROM users');
    console.log(result.rowCount);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Serverfel vid hämtning av användare' });
  }
};
/*Mongo
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Serverfel vid hämtning av användare' });
  }
};*/

//Hämta en användare (ID) (GET)
// pg
export const getUserById = async (req, res) => {
  try {
    const result = await query('SELECT name FROM users WHERE userID = $1', [
      req.params.id,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Serverfel vid hämtning av en användare' });
  }
};

/*Mongo
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Serverfel vid hämtning av en användare' });
  }
};*/

//Skapa en ny användare (POST)
//pg
export const createUser = async (req, res) => {
  const { name } = req.body;

  try {
    const result = await query(
      'INSERT INTO users(name) VALUES($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Serverfel vid skapande av användare' });
  }
};
/*Mongo
export const createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte skapa användare' });
  }
};*/

//Uppdatera en användare (PATCH)
//pg
export const updateUser = async (req, res) => {
  const { name } = req.body;

  try {
    const result = await query('UPDATE users SET name = $1 WHERE userID = $2', [
      name,
      req.params.id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Fel vid uppdatering av användare' });
  }
};

/*Mongo
export const updateUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name: name, email: email },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Fel vid uppdatering av användare' });
  }
};*/

//Ta bort en användare (DELETE)
//pg
export const deleteUser = async (req, res) => {
  try {
    const result = await query('DELETE FROM users WHERE userID = $1', [
      req.params.id,
    ]);
    res.status(204).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Fel vid borttagande av användare' });
  }
};

/*Mongo
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    const result = await User.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Fel vid radering av användare' });
  }
};*/
