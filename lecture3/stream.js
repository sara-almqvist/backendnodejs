import { createReadStream, createWriteStream } from 'node:fs';

const stream = createReadStream('stortext.txt', 'utf8');
const log = createWriteStream('nytxt.txt', { flags: 'a' });
let totalBytes = 0;
let chunkCount = 0;

log.on('finish', () =>
  console.log(
    `Skrivning klar. Läste totalt ${chunkCount} chunks. Totalt: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`
  )
);
log.on('error', (err) => console.error(err.message));

stream.on('data', (chunk) => {
  chunkCount++;
  const chunkSizeInBytes = chunk.length;
  const chunkSizeInKB = (chunkSizeInBytes / 1024).toFixed(2);
  totalBytes += chunkSizeInBytes;
  console.log(`Chunk #${chunkCount}: Storlek = ${chunkSizeInKB} KB`);
  log.write(`Inköpslista: ${chunk} \n`);
});
stream.on('end', () => {
  console.log('Allt är läst');
  log.end('Slut\n\n');
});
stream.on('error', (err) => console.error(err.message));
