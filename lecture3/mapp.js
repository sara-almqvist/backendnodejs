import {
  mkdir,
  readdir,
  stat,
  rename,
  rm,
  writeFile,
  appendFile,
} from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sokVag = join(__dirname, 'test-mapp', 'test1');
const filSokVag = join(sokVag, 'hund.txt');

async function skapaMapp() {
  try {
    await mkdir(sokVag, { recursive: true });
    console.log(`Mappen har skapats på: ${sokVag}`);
  } catch (err) {
    console.error('Något gick fel', err.message);
  }
}

async function skapaFil() {
  try {
    const fileContent = 'Bruce heter en gullig hund som är 5 år gammal\n';
    await writeFile(filSokVag, fileContent, 'utf8');
    console.log('Filen skapad');
  } catch (err) {
    console.error('Det blev fel', err.message);
  }
}

async function addText() {
  try {
    await appendFile(
      filSokVag,
      'Detta ska läggas till och inte ersätta texten\n',
      'utf8'
    );
    console.log('Klart!');
  } catch (err) {
    console.error('Nytt fel', err.message);
  }
}

async function readMapp() {
  try {
    const filer = await readdir(sokVag);
    console.log(`Innehållet i mappen (${filer.length} st objekt)`);
    console.log(filer);
  } catch (err) {
    console.error('Kan inte läsa mappen', err.message);
  }
}

async function kollaFilData() {
  try {
    const info = await stat(filSokVag);
    console.log('--- Filinformation ---');
    console.log(`Är det en vanlig fil?: ${info.isFile()}`);
    console.log(`Är det en mapp?: ${info.isDirectory()}`);
    console.log(`Storlek: ${info.size} bytes`);
    console.log(`Skapad den: ${info.birthtime}`);
    console.log(`Senast ändrad: ${info.mtime}`);
  } catch (error) {
    console.error('Fel vid kontroll av fil', error.message);
  }
}

//skapaMapp();
//skapaFil();
//addText();
//readMapp();
//kollaFilData();
