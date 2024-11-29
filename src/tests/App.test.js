const strategies = {
  TitForTat: {
    name: "Tit-for-Tat",
    logic: (history, opponentHistory) => {
      return opponentHistory.length === 0
        ? "Cooperate"
        : opponentHistory[opponentHistory.length - 1];
    },
  },
  GrimTrigger: {
    name: "Grim Trigger",
    logic: (history, opponentHistory) => {
      return opponentHistory.includes("Defect") ? "Defect" : "Cooperate";
    },
  },
  AlwaysCooperate: {
    name: "Always Cooperate",
    logic: () => "Cooperate",
  },
  AlwaysDefect: {
    name: "Always Defect",
    logic: () => "Defect",
  },
  Random: {
    name: "Random",
    logic: () => (Math.random() > 0.5 ? "Cooperate" : "Defect"),
  },
};

const payoffs = {
  "Cooperate-Cooperate": [3, 3],
  "Cooperate-Defect": [0, 5],
  "Defect-Cooperate": [5, 0],
  "Defect-Defect": [1, 1],
};

describe("Prisoner's Dilemma Strategies", () => {
  test("Calculates correct payoff for Cooperate-Cooperate", () => {
    const result = payoffs["Cooperate-Cooperate"];
    expect(result).toEqual([3, 3]);
  });

  test("Tit-for-Tat strategy cooperates on the first move", () => {
    const logic = strategies.TitForTat.logic([], []);
    expect(logic).toBe("Cooperate");
  });

  test("Tit-for-Tat strategy mimics the last move", () => {
    const logic = strategies.TitForTat.logic([], ["Defect"]);
    expect(logic).toBe("Defect");
  });

  test("calculates correct scores for 'Defect-Cooperate'", () => {
    const result = payoffs["Defect-Cooperate"];
    expect(result).toEqual([5, 0]);
  });

  test("Grim Trigger defects after first defect", () => {
    const history1 = ["Cooperate", "Cooperate"];
    const history2 = ["Cooperate", "Defect"];

    const strategy = strategies["GrimTrigger"];
    const nextMoveByGrimTrigger = strategy.logic(history1, history2);

    expect(nextMoveByGrimTrigger).toBe("Defect");
  });

  test("Grim Trigger: Cooperates initially", () => {
    const result = strategies.GrimTrigger.logic([], []);
    expect(result).toBe("Cooperate");
  });

  test("Random: Returns either 'Cooperate' or 'Defect'", () => {
    const result = strategies.Random.logic();
    expect(["Cooperate", "Defect"]).toContain(result);
  });

  test("Always Cooperate: Always chooses 'Cooperate'", () => {
    const result = strategies.AlwaysCooperate.logic([], []);
    expect(result).toBe("Cooperate");
  });

  test("Always Defect: Always chooses 'Defect'", () => {
    const result = strategies.AlwaysDefect.logic([], []);
    expect(result).toBe("Defect");
  });

  test("Tit-for-Tat strategy cooperates if opponent cooperated last", () => {
    const logic = strategies.TitForTat.logic([], ["Cooperate"]);
    expect(logic).toBe("Cooperate");
  });

  test("Grim Trigger cooperates if no defect in history", () => {
    const history1 = ["Cooperate", "Cooperate"];
    const history2 = ["Cooperate", "Cooperate"];
    const strategy = strategies["GrimTrigger"];
    const nextMoveByGrimTrigger = strategy.logic(history1, history2);
    expect(nextMoveByGrimTrigger).toBe("Cooperate");
  });

  test("Random strategy does not always return the same result", () => {
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(strategies.Random.logic());
    }
    expect(results.size).toBe(2);
  });
});

describe("Payoff Logic", () => {
  test("Cooperate-Cooperate: Both players receive 3 points", () => {
    expect(payoffs["Cooperate-Cooperate"]).toEqual([3, 3]);
  });

  test("Cooperate-Defect: Player 1 gets 0, Player 2 gets 5", () => {
    expect(payoffs["Cooperate-Defect"]).toEqual([0, 5]);
  });

  test("Defect-Cooperate: Player 1 gets 5, Player 2 gets 0", () => {
    expect(payoffs["Defect-Cooperate"]).toEqual([5, 0]);
  });

  test("Defect-Defect: Both players receive 1 point", () => {
    expect(payoffs["Defect-Defect"]).toEqual([1, 1]);
  });
});
