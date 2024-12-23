# Prisoner's Dilemma Game

A simple implementation of the Prisoner's Dilemma game, where two players can choose from different strategies and compete over multiple rounds. The strategies include Tit-for-Tat, Grim Trigger, Always Cooperate, Always Defect, and Random. The game keeps track of scores, choices, and various statistics across rounds.

## Features

- **Multiple Strategies**: Select from different strategies for both players.
- **Game Rounds**: Play a custom number of rounds or generate random rounds.
- **Statistics Tracking**: Tracks cooperations and defections for both players.
- **Interactive UI**: A user-friendly interface with controls to start and reset the game.
- **Payoff Matrix**: Implements a basic payoff matrix for the game.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pamodi/prisoners-dilemma-game.git

2. **Navigate to the project folder**:
   ```bash
   cd prisoners-dilemma-game

3. **Install dependencies: Make sure you have Node.js installed. Then run**:
   ```bash
   npm install

4. **Start the development server**:
   ```bash
   npm start

5. **Open your browser and navigate to http://localhost:3000 to see the app in action.**

## Usage

### Game Settings
- **Choose Strategies**: You can select the strategy for both Player 1 and Player 2.
- **Rounds**: Set the number of rounds you want to play. The game will automatically generate a random number of rounds if you prefer.
- **Start Game**: After setting your preferences, hit the **Start Game** button to begin the game.

### During the Game
- **Round Progress**: The game progresses one round at a time, and each round displays the players' choices and their scores.
- **Statistics**: The game tracks cooperations and defections for each player, which you can view after each round.

### Resetting the Game
To start over, click the **Reset Game** button to clear the results and set the default values.

### Chart.js 
- **Charts for Statistics**: Chart.js is used to visually display the statistics for Player 1 and Player 2, such as the number of cooperations and defections in each round.
- **Graph Types**: The game uses line charts to show the cooperative vs. defected moves of each player throughout the rounds.
- **Dynamic Updates**: The chart updates dynamically after each round, providing a real-time view of the progress.

### Game Strategies

1. **Tit-for-Tat**
- **Description**: This strategy starts by cooperating in the first round. In subsequent rounds, it mirrors the opponent's previous move. If the opponent cooperated in the previous round, Tit-for-Tat cooperates; if the opponent defected, Tit-for-Tat defects.
- **Key Characteristic**: Encourages cooperation but retaliates against defection immediately.

2. **Grim Trigger**
- **Description**: This strategy starts by cooperating and continues to cooperate as long as the opponent also cooperates. However, if the opponent defects even once, Grim Trigger will defect for all remaining rounds.
- **Key Characteristic**: Forgives no defection, enforcing long-term cooperation or punishment.

3. **Always Cooperate**
- **Description**: This strategy always chooses to cooperate regardless of the opponent’s moves.
- **Key Characteristic**: Simple and optimistic, but vulnerable to exploitation by defectors.

4. **Always Defect**
- **Description**: This strategy always chooses to defect, regardless of the opponent’s moves.
- **Key Characteristic**: Opportunistic and aggressive, but may not perform well against cooperative strategies.

5. **Random**
- **Description**: This strategy makes a random choice between cooperating and defecting in each round.
- **Key Characteristic**: Unpredictable, making it difficult for opponents to plan their responses.

## Technologies Used
- **React.js** for the frontend.
- **React Router** for navigation.
- **CSS** for basic styling.
- **Chart.js** for displaying statistics in graphical form.
- **Jest** for testing the application.

