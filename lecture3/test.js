import { readFile, writeFile } from 'node:fs/promises';

try {
  const dish = await readFile('order.txt', 'utf8');
  const price = await readFile(`${dish}.txt`, 'utf8');
  await writeFile('kvitto.txt', `${dish}: ${price} kr`);
  console.log('Kvittot är klart!');
} catch (err) {
  console.error('Något gick fel:', err.message);
}
