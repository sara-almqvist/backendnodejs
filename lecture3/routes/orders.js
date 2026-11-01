import { readOrders, addOrder } from '../data/orders.js';

router.get('/', async (req, res) => {
  res.json(await readOrders());
});

router.post('/', async (req, res) => {
  const order = { ...req.body, id: Date.now() };
  await addOrder(order);
  res.status(201).json(order);
});
