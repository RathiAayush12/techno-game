import React from "react";
import { GameProvider } from "./context/GameContext";
import Table from "./components/Table";
import RightPanel from "./components/RightPanel";
import PnLTable from "./components/PnLTable";

export default function App() {
  return (
    <GameProvider>
      <div className="app">
        <div className="left">
          {/* <Table /> */}
            <div className="left-inner">
            <div className="brand" role="banner" aria-label="Stock Trading">
              <div className="brand-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 17L9 12L13 16L20 9" stroke="#7ad0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 9H15" stroke="#7ad0ff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="brand-text">
                <div className="brand-title">TICKER</div>
                <div className="brand-sub">TYCOON</div>
              </div>
            </div>

            <Table />

            <div style={{ marginTop: 12 }}>
              <PnLTable />
            </div>
          </div>
        </div>
        <div className="right">
          <RightPanel />
          {/* <PnLTable /> */}
        </div>
      </div>
    </GameProvider>
  );
}