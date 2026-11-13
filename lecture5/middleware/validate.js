export function validateInput(req, res, next) {
  const { name, email } = req.body ?? {};
  const errors = [];

  if (typeof name !== 'string' || name.trim() === '') {
    errors.push('namn måste vara text');
  }

  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('email måste vara en giltig epostadress');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}
