import { readFile } from 'node:fs';

readFile('text.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log(`Läst från fil: ${data}`);
});
