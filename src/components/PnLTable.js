import React from "react";
import { useGame } from "../context/GameContext";
import { PLAYERS } from "../utils/constants";

export default function PnLTable() {
  const { state, conf } = useGame();

  const visible = conf.showAllPnL ? PLAYERS : []; // in R2–R4, we hide here (panel shows self)

  return (
    <div className="card">
      <h3 className="section-title">Round P&L</h3>

      {visible.length === 0 ? (
        <div className="small">Hidden in this round (only personal P&L visible above).</div>
      ) : (
        <table className="table">
          <thead>
            <tr><th>Player</th><th>P&L</th><th>Holdings</th></tr>
          </thead>
          <tbody>
            {visible.map((id)=>(
              <tr key={id}>
                <td>{id}</td>
                <td className={state.players[id].pnl>=0?"profit":"loss"}>
                  {state.players[id].pnl>=0?`+${state.players[id].pnl}`:state.players[id].pnl}
                </td>
                <td className="small">{state.players[id].holdings.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
