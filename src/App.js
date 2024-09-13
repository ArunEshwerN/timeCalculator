import React from 'react';
import './App.css';
import TimeCalculator from './TimeCalculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Flight Preparation Time Calculator</h1>
      </header>
      <main>
        <TimeCalculator />
      </main>
    </div>
  );
}

export default App;
