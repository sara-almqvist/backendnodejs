import { readFile, writeFile } from 'node:fs/promises';

try {
  const data = await readFile('text.txt', 'utf8');
  console.log(data);
  await writeFile('result.txt', `Innehållet från den andra filen: ${data}`);
  console.log('Klar med att skriva till fil');
} catch (err) {
  console.error('Något gick fel', err.message);
}
