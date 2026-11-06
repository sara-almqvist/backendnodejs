import { query } from '../db.js';

//Hämta alla användare (GET)
export const getUsers = async (req, res) => {
  try {
    const result = await query('SELECT name FROM users');
    console.log(result.rowCount);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Serverfel vid hämtning av användare' });
  }
};

//Hämta en användare (ID) (GET)
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

//Skapa en ny användare (POST)
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

//Uppdatera en användare (PATCH)
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

//Ta bort en användare (DELETE)
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
