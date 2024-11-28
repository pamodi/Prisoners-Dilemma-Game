import { render, screen } from "@testing-library/react";
import App from "./App";

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
