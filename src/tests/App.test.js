
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

describe('App Component', () => {
  
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
});

