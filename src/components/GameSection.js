import React from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { FaTrophy, FaHistory, FaArrowLeft, FaChartLine, FaChartArea } from "react-icons/fa"; // Icons
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import "../styles/settingsStyles.css";
import { useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const GameSection = ({
  currentRound,
  player1Score,
  player2Score,
  player1History,
  player2History,
  cooperations1,
  cooperations2,
  defections1,
  defections2,
  strategies,
  player1Strategy,
  player2Strategy,
  resetGame
}) => {
    // Count cooperations and defections for Player 1
  const player1Cooperations = player1History.filter(move => move === "Cooperate").length;
  const player1Defections = player1History.filter(move => move === "Defect").length;

  // Count cooperations and defections for Player 2
  const player2Cooperations = player2History.filter(move => move === "Cooperate").length;
  const player2Defections = player2History.filter(move => move === "Defect").length;

  const chartData = {
    labels: Array.from({ length: currentRound }, (_, i) => `Round ${i + 1}`),
    datasets: [
      {
        label: `${strategies[player1Strategy].name} Cooperations`,
        data: Array.from({ length: currentRound }, (_, i) => cooperations1),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true
      },
      {
        label: `${strategies[player1Strategy].name} Defections`,
        data: Array.from({ length: currentRound }, (_, i) => defections1),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true
      },
      {
        label: `${strategies[player2Strategy].name} Cooperations`,
        data: Array.from({ length: currentRound }, (_, i) => cooperations2),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true
      },
      {
        label: `${strategies[player2Strategy].name} Defections`,
        data: Array.from({ length: currentRound }, (_, i) => defections2),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white", // Change legend text color
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        bodyFont: {
          size: 14,
          weight: "bold"
        },
        titleFont: {
          size: 16,
          weight: "bold",
          color: "white" // Tooltip title text color
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "white" // Change X-axis label text color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)" // X-axis grid line color
        }
      },
      y: {
        ticks: {
          color: "white" // Change Y-axis label text color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)" // Y-axis grid line color
        }
      }
    }
  };

  const navigate = useNavigate();

  return (
    <div className="game-app">
      <section className="game-section">
        <div className="game-columns">
          <div>
            <h2 className="section-title"><FaChartLine size={30} style={{ marginRight: "10px" }} />Game Progress</h2>
          </div>
          <div>
            {/* Back Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                navigate("/settings");
                resetGame();
              }}
              className="go-back-btn"
            >
              <FaArrowLeft size={20} style={{marginRight: "8px"}} />
              Go Back
            </motion.button>
          </div>
        </div>

        <div className="game-columns">
          {/* Scores Section */}
          <div className="scores">
            <h3 className="subsection-title" style={{ color: "white" }}>
              <FaTrophy style={{ marginRight: "10px", color: "white" }} />{" "}
              Scores
            </h3>
            <motion.div whileHover={{ scale: 1.05 }} className="score-box">
              <p>
                <strong>Player 1:</strong> {player1Score}
              </p>
              <p>
                <strong>Player 2:</strong> {player2Score}
              </p>
            </motion.div>
          </div>

          {/* History Section */}
          <div className="history">
            <h3 className="subsection-title" style={{ color: "white" }}>
              <FaHistory style={{ marginRight: "10px", color: "white" }} />{" "}
              History
            </h3>
            <motion.div whileHover={{ scale: 1.05 }} className="history-box">
                <p>
                    <strong>Player 1:</strong> {player1Cooperations} Cooperations, {player1Defections} Defections
                </p>
                <p>
                    <strong>Player 2:</strong> {player2Cooperations} Cooperations, {player2Defections} Defections
                </p>
            </motion.div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="chart-section">
          <h3 className="subsection-title" style={{ color: "white" }}>
          <FaChartArea size={32} style={{ marginRight: "10px" }} />Game Results
          </h3>
          <motion.div whileHover={{ scale: 1.03 }} className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GameSection;
