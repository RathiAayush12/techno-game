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
          <Table />
        </div>
        <div className="right">
          <RightPanel />
          <PnLTable />
        </div>
      </div>
    </GameProvider>
  );
}
