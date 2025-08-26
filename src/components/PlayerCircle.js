import React from "react";
import { useGame } from "../context/GameContext";

export default function PlayerCircle({ id, style }) {
  const { state } = useGame();

  // A player shows a green ring when they have an active offer (time remaining)
  const now = Date.now();
  const offer = state.offers.find((o) => o.sellerId === id);
  const pct =
    offer && offer.expiresAt > now
      ? ((offer.expiresAt - now) / 1000 / 15) * 100
      : 0;

  return (
    <div className="player-dot" style={style}>
      {offer && (
        <div
          className="player-ring"
          style={{ borderColor: "rgba(80,255,180,.7)", clipPath: `inset(${100 - pct}% 0 0 0)` }}
        />
      )}
      <div className="player-id">{id}</div>
    </div>
  );
}
