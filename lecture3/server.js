import express from 'express';

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Server är igång');
});

server.listen(3000, () => console.log('Servern lyssnar på port 3000'));
