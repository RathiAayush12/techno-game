import React, { useMemo, useState } from "react";
import { useGame } from "../context/GameContext";
import { DURATIONS, PLAYERS } from "../utils/constants";
import { cumulativePrice } from "../utils/pnl";

export default function RightPanel() {
  const { state, dispatch, cp, conf } = useGame();
  const [sellerId, setSellerId] = useState("A");
  const [sellPrice, setSellPrice] = useState("");
  const [buyerId, setBuyerId] = useState("B");

  const timeLabel =
    state.phase === "sell" ? "Sell Window" :
    state.phase === "turn" ? "Turn Window" :
    state.phase === "finished" ? "Finished" : state.phase;

  const canPlace = state.phase !== "finished" && state.phase !== "turn" ? true : true;
  const offers = state.offers.slice().sort((a,b)=>a.expiresAt-b.expiresAt);
  const now = Date.now();
  const boxesCum = cumulativePrice(state.boxes);

  const visiblePlayers = useMemo(() => {
    if (conf.showAllPnL) return Object.keys(state.players);
    return [sellerId]; // show only my P&L (pretend POV = selected)
  }, [conf.showAllPnL, sellerId, state.players]);

  const maxForSeller = state.players[sellerId]?.max ?? conf.maxStocks;
  const sellerHoldings = state.players[sellerId]?.holdings.length ?? 0;

  return (
    <div className="card">
      <h3 className="section-title">Round {state.round} • Box {Math.min(6, state.step)} / 6</h3>

      <div className="grid two" style={{marginBottom:8}}>
        <div>
          <div className="small">Phase</div>
          <div style={{fontWeight:700}}>{timeLabel}</div>
        </div>
        <div>
          <div className="small">Time Left</div>
          <div className="timer-bar"><div className="timer-fill" style={{
            width: `${(state.timers.phaseLeft / (state.phase==="sell" ? DURATIONS.SELL_WINDOW : state.phase==="turn" ? DURATIONS.TURN_WINDOW : 1))*100}%`
          }} /></div>
          <div className="small">{Math.ceil(state.timers.phaseLeft)}s</div>
        </div>
      </div>

      <div className="grid two" style={{marginBottom:12}}>
        <div>
          <div className="small">Act as Player</div>
          <select value={sellerId} onChange={e=>setSellerId(e.target.value)}>
            {PLAYERS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <div className="small" style={{marginTop:6}}>
            Holdings: {sellerHoldings}/{maxForSeller} • Max this round
          </div>
        </div>
        <div>
          <div className="small">Preview Buy as</div>
          <select value={buyerId} onChange={e=>setBuyerId(e.target.value)}>
            {PLAYERS.filter(p=>p!==sellerId).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="grid" style={{marginBottom:12}}>
        <div className="small">Sell a stock (any OR owned)</div>
        <div className="input-row">
          <input
            type="number"
            placeholder="Enter sell price"
            value={sellPrice}
            onChange={(e)=>setSellPrice(e.target.value)}
          />
          <button
            className="primary"
            disabled={!sellPrice || state.phase==="finished"}
            onClick={()=>{
              dispatch({
                type: "PLACE_OFFER",
                sellerId,
                price: Number(sellPrice),
                lifetime: DURATIONS.OFFER_LIFETIME
              });
              setSellPrice("");
            }}
          >
            Place Offer
          </button>
        </div>
      </div>

      <div className="grid" style={{marginBottom:12}}>
        <div className="section-title">Live Offers</div>
        {offers.length === 0 && <div className="small">No active offers.</div>}
        {offers.map((o)=> {
          const lifeLeft = Math.max(0, Math.ceil((o.expiresAt - now)/1000));
          const canBuy =
            buyerId !== o.sellerId &&
            state.players[buyerId].holdings.length < state.players[buyerId].max &&
            state.phase !== "finished";
          return (
            <div key={o.id} className="grid two card" style={{padding:8}}>
              <div>
                <div><span className="badge">Player {o.sellerId}</span> selling at <b>{o.price}</b></div>
                <div className="timer-bar" style={{marginTop:6}}>
                  <div className="timer-fill" style={{ width: `${(lifeLeft / DURATIONS.OFFER_LIFETIME) * 100}%` }} />
                </div>
                <div className="small">{lifeLeft}s</div>
              </div>
              <div style={{display:"flex", alignItems:"center", justifyContent:"end", gap:8}}>
                <button disabled={!canBuy}
                        onClick={()=>dispatch({ type:"BUY_OFFER", buyerId, offerId: o.id })}>
                  Buy as {buyerId}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid">
        <div className="section-title">My Holdings (Player {sellerId})</div>
        <table className="table">
          <thead>
            <tr><th>#</th><th>Entry</th><th>P&L vs {boxesCum}</th></tr>
          </thead>
          <tbody>
            {state.players[sellerId].holdings.map((h, idx)=> {
              const pnl = (cp - h.entry);
              return (
                <tr key={idx}>
                  <td>{idx+1}</td>
                  <td>{h.entry}</td>
                  <td className={pnl>=0?"profit":"loss"}>{pnl>=0?`+${pnl}`:pnl}</td>
                  <td>
              <input
                type="number"
                placeholder="Resell Price"
                value={h.resellPrice || ""}
                onChange={(e)=>{
                  const val = e.target.value;
                  // store temporary price in component state
                  state.players[sellerId].holdings[idx].resellPrice = val;
                  // force rerender if needed with local state
                }}
                style={{width:80}}
              />
              <button
                disabled={!h.resellPrice}
                onClick={()=>{
                  dispatch({
                    type:"SELL_STOCK",
                    payload:{ playerId: sellerId, holdingIndex: idx, sellPrice: Number(h.resellPrice) }
                  });
                }}
              >
                Sell
              </button>
            </td>
                </tr>
              );
            })}
            {state.players[sellerId].holdings.length===0 && (
              <tr><td colSpan={4} className="small">No holdings yet.</td></tr>
            )}
          </tbody>
        </table>
        <div style={{textAlign:"right", marginTop:6}}>
          <span className="badge">Total P&L: </span>{" "}
          <b className={state.players[sellerId].pnl>=0 ? "profit" : "loss"}>
            {state.players[sellerId].pnl>=0?`+${state.players[sellerId].pnl}`:state.players[sellerId].pnl}
          </b>
        </div>
      </div>

      <hr style={{borderColor:"#2b2b46", margin:"12px 0"}} />

      <div className="small">
        Cumulative Price this round: <b>{cp}</b> (sum of revealed numbers)
      </div>
    </div>
  );
}
