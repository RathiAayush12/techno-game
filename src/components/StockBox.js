import React from "react";
import { useGame } from "../context/GameContext";

export default function StockBox({ value, index }) {
  const { state } = useGame();
  const revealed = value !== null;
  return (
    <div className={`box ${revealed ? "revealed" : ""}`} title={`Box ${index + 1}`}>
      {revealed ? value : ""}
    </div>
  );
}
