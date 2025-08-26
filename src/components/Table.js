import React from "react";
import { useGame } from "../context/GameContext";
import PlayerCircle from "./PlayerCircle";
import StockBox from "./StockBox";
import { PLAYERS } from "../utils/constants";

export default function Table() {
  const { state } = useGame();

  // Positions around the oval (clockwise, 4 spots)
   const positions = [
    { left: "50%", top: "90%", transform: "translate(-50%,-50%)" }, // Bottom center
    { left: "95%", top: "50%", transform: "translate(-50%,-50%)" }, // Right center
    { left: "50%", top: "8%", transform: "translate(-50%,-50%)" }, // Top center
    { left: "5%", top: "50%", transform: "translate(-50%,-50%)" }  // Left center
  ];

  return (
    <div className="table-wrap card">
      <div className="oval"></div>

      {/* Boxes (6) */}
      <div className="center-boxes">
        {state.boxes.map((v, i) => (
          <StockBox key={i} value={v} index={i} />
        ))}
      </div>

      {/* Players */}
      {PLAYERS.map((id, i) => (
        <PlayerCircle
          key={id}
          id={id}
          style={{ position: "absolute", ...positions[i] }}
        />
      ))}
    </div>
  );
}
