const fs = require('fs').promises;

async function lasFil() {
  try {
    const innehall = await fs.readFile('textfil.txt', 'utf8');

    console.log(innehall);
  } catch (err) {
    console.error('Kunde inte läsa filen:', err.message);
  }
}

lasFil();
