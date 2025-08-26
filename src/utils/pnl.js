/**
 * Current cumulative price = sum of revealed numbers so far in this round.
 * We value both open and closed positions against the current cumulative.
 * This mirrors the example symmetry (seller at price P, buyer at price P).
 */
export function cumulativePrice(revealed) {
  return revealed.filter((v) => v !== null).reduce((a, b) => a + b, 0);
}

export function calcPlayerPnL(player, currentCum) {
  const open = player.holdings.reduce((acc, h) => acc + (currentCum - h.entry), 0);
  const closed = player.closed.reduce((acc, c) => acc + (c.exitVsFinal ?? 0), 0);
  return open + closed;
}
