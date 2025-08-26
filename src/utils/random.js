export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function uniqueSequence(from, to, length) {
  const pool = [];
  for (let i = from; i <= to; i++) pool.push(i);
  const res = [];
  while (res.length < length && pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    res.push(pool.splice(idx, 1)[0]);
  }
  return res;
}

export function repeatingSequence(from, to, length) {
  const res = [];
  for (let i = 0; i < length; i++) res.push(randomInt(from, to));
  return res;
}
