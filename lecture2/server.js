import express from 'express';

const server = express();

const port = process.env.PORT || 3001;

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

server.use(logger);
server.use(express.json());
server.use(express.static('public'));

const contact = {
  name: 'Test AB',
  address: { road: 'Testgatan 3', zipcode: 12345, city: 'Stockholm' },
  phone: 12456789,
  email: 'test@test.se',
};

server.get('/', (req, res) => {
  res.send('Express är igång!');
});

server.get('/about', (req, res) => {
  res.send('Detta är en enkel EXPRESS-server');
});

server.get('/contact', (req, res) => {
  res.json(contact);
});

server.get('/test', (req, res) => {
  res.send(
    '<h1 style="color:blue; text-align:center">Välkommen till detta test!</h1><p style= "color:green; text-align:left">Detta är en paragraf</p>'
  );
});

server.listen(port, () => console.log(`Lyssnar på port ${port}`));
