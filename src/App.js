import React, { useState } from "react";
import Header from "./components/Header";
import Settings from "./components/Settings";
import GameSection from "./components/GameSection";
import "./styles/styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const strategies = {
  TitForTat: {
    name: "Tit-for-Tat",
    logic: (history, opponentHistory) => {
      return opponentHistory.length === 0
        ? "Cooperate"
        : opponentHistory[opponentHistory.length - 1];
    }
  },
  GrimTrigger: {
    name: "Grim Trigger",
    logic: (history, opponentHistory) => {
      return opponentHistory.includes("Defect") ? "Defect" : "Cooperate";
    }
  },
  AlwaysCooperate: {
    name: "Always Cooperate",
    logic: () => "Cooperate"
  },
  AlwaysDefect: {
    name: "Always Defect",
    logic: () => "Defect"
  },
  Random: {
    name: "Random",
    logic: () => (Math.random() > 0.5 ? "Cooperate" : "Defect")
  }
};

const payoffs = {
  "Cooperate-Cooperate": [3, 3],
  "Cooperate-Defect": [0, 5],
  "Defect-Cooperate": [5, 0],
  "Defect-Defect": [1, 1]
};

const App = () => {
  const [player1Strategy, setPlayer1Strategy] = useState("TitForTat");
  const [player2Strategy, setPlayer2Strategy] = useState("TitForTat");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [rounds, setRounds] = useState(1);
  const [player1History, setPlayer1History] = useState([]);
  const [player2History, setPlayer2History] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [cooperations1, setCooperations1] = useState(0);
  const [cooperations2, setCooperations2] = useState(0);
  const [defections1, setDefections1] = useState(0);
  const [defections2, setDefections2] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);

  const playRound = () => {
    const strategy1 = strategies[player1Strategy];
    const strategy2 = strategies[player2Strategy];

    const player1Choice = strategy1.logic(player1History, player2History);
    const player2Choice = strategy2.logic(player2History, player1History);

    setPlayer1History(prev => [...prev, player1Choice]);
    setPlayer2History(prev => [...prev, player2Choice]);

    const resultKey = `${player1Choice}-${player2Choice}`;
    const [score1, score2] = payoffs[resultKey];

    setPlayer1Score(prev => prev + score1);
    setPlayer2Score(prev => prev + score2);
    setCurrentRound(prev => prev + 1);

    if (player1Choice === "Cooperate") setCooperations1(prev => prev + 1);
    if (player1Choice === "Defect") setDefections1(prev => prev + 1);
    if (player2Choice === "Cooperate") setCooperations2(prev => prev + 1);
    if (player2Choice === "Defect") setDefections2(prev => prev + 1);
  };

  const startGame = () => {
    setIsGameRunning(true);
    let roundsPlayed = 0;

    const interval = setInterval(() => {
      if (roundsPlayed >= rounds) {
        clearInterval(interval);
        setIsGameRunning(false);
        return;
      }
      playRound();
      roundsPlayed += 1;
    }, 100);
  };

  const resetGame = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayer1History([]);
    setPlayer2History([]);
    setCurrentRound(0);
    setCooperations1(0);
    setCooperations2(0);
    setDefections1(0);
    setDefections2(0);
    setIsGameRunning(false);
    setRounds(1);
    setPlayer1Strategy("TitForTat");
    setPlayer2Strategy("TitForTat");
  };

  const setRandomRounds = () => {
    const randomRounds = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    setRounds(randomRounds);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route
          path="/settings"
          element={
            <Settings
              player1Strategy={player1Strategy}
              setPlayer1Strategy={setPlayer1Strategy}
              player2Strategy={player2Strategy}
              setPlayer2Strategy={setPlayer2Strategy}
              rounds={rounds}
              setRounds={setRounds}
              isGameRunning={isGameRunning}
              setRandomRounds={setRandomRounds}
              strategies={strategies}
              startGame={startGame}
              resetGame={resetGame}
              currentRound={currentRound}
            />
          }
        />
        <Route
          path="/game"
          element={
            <GameSection
              currentRound={currentRound}
              rounds={rounds}
              player1Score={player1Score}
              player2Score={player2Score}
              player1History={player1History}
              player2History={player2History}
              cooperations1={cooperations1}
              cooperations2={cooperations2}
              defections1={defections1}
              defections2={defections2}
              isGameRunning={isGameRunning}
              strategies={strategies}
              player1Strategy={player1Strategy}
              player2Strategy={player2Strategy}
              resetGame={resetGame}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
