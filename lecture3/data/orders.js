import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ordersFile = path.join(import.meta.dirname, 'orders.json');

export async function readOrders() {
  const text = await readFile(ordersFile, 'utf8');
  return JSON.parse(text);
}

export async function addOrder(order) {
  const orders = await readOrders();
  const updated = [...orders, order];
  // null, 2 = snygg indentering i filen
  await writeFile(ordersFile, JSON.stringify(updated, null, 2));
}
