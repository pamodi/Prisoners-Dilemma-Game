import React from "react";
import "../styles/settingsStyles.css";
import { motion } from "framer-motion";
import { FaCogs, FaPlayCircle, FaRedoAlt, FaArrowLeft } from "react-icons/fa"; // Icons for UI
import { useNavigate } from "react-router-dom";

const Settings = ({
  player1Strategy,
  setPlayer1Strategy,
  player2Strategy,
  setPlayer2Strategy,
  rounds,
  setRounds,
  isGameRunning,
  setRandomRounds,
  strategies,
  startGame,
  resetGame,
  currentRound
}) => {
  const navigate = useNavigate();

  return (
    <div className="app">
      <section className="settings">
        <h2 className="section-title" style={{marginBottom: "40px"}}>
          <FaCogs size={32} style={{ marginRight: "10px" }} />
          Game Settings
        </h2>

        <div className="settings-container">
          {/* Player 1 Strategy */}
          <div className="settings-column">
            <label
              className="settings-label"
              title="Select a strategy for Player 1"
            >
              <strong style={{ color: "white" }}>Player 1 Strategy:</strong>
              <div className="dropdown-container">
                <select
                  value={player1Strategy}
                  onChange={e => setPlayer1Strategy(e.target.value)}
                  className="settings-select animated-dropdown"
                >
                  {Object.keys(strategies).map(key => (
                    <option key={key} value={key}>
                      {strategies[key].name}
                    </option>
                  ))}
                </select>
                <motion.div
                  className="dropdown-arrow"
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </label>
          </div>

          {/* Player 2 Strategy */}
          <div className="settings-column">
            <label
              className="settings-label"
              title="Select a strategy for Player 2"
            >
              <strong style={{ color: "white" }}>Player 2 Strategy:</strong>
              <div className="dropdown-container">
                <select
                  value={player2Strategy}
                  onChange={e => setPlayer2Strategy(e.target.value)}
                  className="settings-select animated-dropdown"
                >
                  {Object.keys(strategies).map(key => (
                    <option key={key} value={key}>
                      {strategies[key].name}
                    </option>
                  ))}
                </select>
                <motion.div
                  className="dropdown-arrow"
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </label>
          </div>

          {/* Number of Rounds */}
          <div className="settings-column">
            <label
              className="settings-label"
              title="Enter the number of rounds"
            >
              <strong style={{ color: "white" }}>Number of Rounds:</strong>
              <div className="input-container">
                <input
                  type="number"
                  value={rounds}
                  onChange={e => setRounds(parseInt(e.target.value, 10))}
                  min="1"
                  max="1000"
                  disabled={isGameRunning}
                  className="settings-input animated-input"
                  style={{width:"-webkit-fill-available" }}
                />
                <motion.div
                  className="dropdown-arrow"
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </label>
          </div>

          {/* Random Rounds Button */}
          <div className="settings-column">
            <motion.button
              className="random-rounds-btn animated-btn"
              onClick={setRandomRounds}
              disabled={isGameRunning}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              style={{ width: "fit-content", marginTop: "19px" }}
            >
              Random Rounds (100-1000)
            </motion.button>
          </div>
        </div>

        {/* Game Info and Buttons */}
        <div className="game-info">
          <p
            className="current-round"
            style={{ marginLeft: "8px", color: "black" }}
          >
            <strong style={{ color: "white" }}>Current Round:</strong>{" "}
            {currentRound} / {rounds}
          </p>
        </div>
        <div className="settings-column">
          <div className="button-group">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                navigate("/game");
                startGame();
              }}
              disabled={isGameRunning || rounds <= 0}
              className="start-game-btn"
            >
              <FaPlayCircle size={24} style={{ marginRight: "10px" }} />
              Start Game
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={resetGame}
              disabled={isGameRunning}
              className="reset-game-btn"
            >
              <FaRedoAlt size={20} style={{ marginRight: "10px" }} />
              Reset Game
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                navigate("/");
                resetGame();
              }}
              className="go-back-btn"
            >
              <FaArrowLeft size={20}  style={{marginRight: "8px"}}/>
              Go Back
            </motion.button>
          </div>
        </div>
        <br />
        <br />
        <br />
      </section>
    </div>
  );
};

export default Settings;
