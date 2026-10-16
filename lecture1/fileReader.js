import fs from 'fs';

export function hamtaText() {
  try {
    return fs.readFileSync('text.txt', 'utf8');
  } catch (error) {
    return 'Kunde inte läsa filen:' + error.message;
  }
}
