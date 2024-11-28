import React from "react";
import {
  FaHandshake,
  FaUsers,
  FaRegFrownOpen,
  FaPlayCircle
} from "react-icons/fa"; // Using FontAwesome icons for animations
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

const Header = () => {
  const navigate = useNavigate();

  const handleGoToGame = () => {
    navigate("/settings");
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="main-title">
            Prisoner's Dilemma
          </h1>
          <div className="how-to-play-content">
            <h2 className="subtitle">How To Play?</h2>
            <p className="intro-text">
                The Prisoner's Dilemma is a strategic game where two players must
              independently decide whether to <strong>Cooperate</strong> or{" "}
              <strong>Defect</strong>. The outcome of their choices determines
              their payoffs. The goal is to maximize your score across multiple
              rounds.
            </p>
            <ul className="instructions">
              <li className="instruction-item">
                <FaHandshake className="instruction-icon cooperative" />
                If both cooperate, they both receive a moderate reward{" "}(3, 3).
              </li>
              <li className="instruction-item">
                <FaUsers className="instruction-icon defect" />
                If one defects while the other cooperates, the defector gets a high reward (5) while the cooperator gets
                nothing (0).
              </li>
              <li className="instruction-item">
                <FaRegFrownOpen className="instruction-icon mutual-defect" />
                If both defect, they both receive a low reward (1, 1).
              </li>
            </ul>
            <button className="go-to-game-btn" onClick={handleGoToGame}>
              <FaPlayCircle size={24} style={{ marginRight: "10px" }} />
              Go to Game
            </button>
          </div>
        </div>
        <br/>
      </header>
    </div>
  );
};

export default Header;
