import http from 'http';
import { hamtaText } from './fileReader.js';
import chalk from 'chalk';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

  const svarsData = {
    status: 'sucess',
    content: hamtaText(),
  };

  res.end(JSON.stringify(svarsData));
});

server.listen(3000, () => {
  console.log(chalk.yellow('Servern körs på http://localhost:3000'));
});
