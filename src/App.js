import React from "react";
import "./App.css";
import Forecast from "./components/Forecast/forecast";

function App() {
  return (
    <div className="App container">
      <header className="masthead mb-auto">
        <h3>Weather report</h3>
      </header>

      <main role="main" className="inner cover">
        <Forecast />
      </main>
      <footer className="footer">
        <div className="container">
          <span className="text-muted">Developed by Fahad </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
