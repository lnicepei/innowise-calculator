import { calculator } from "../calculator/calculator";
import { NumberButtonCommand } from "../buttons/numbers";
import { calculator } from "../calculator/calculator";
import { CubedCommand } from "../operations/advancedOperations/CubedCommand";
import { FactorialCommand } from "../operations/advancedOperations/FactorialCommand";
import { MemoryClearCommand } from "../operations/advancedOperations/MemoryClearCommand";
import { MemoryMinusCommand } from "../operations/advancedOperations/MemoryMinusCommand";
import { MemoryPlusCommand } from "../operations/advancedOperations/MemoryPlusCommand";
import { MemoryRecallCommand } from "../operations/advancedOperations/MemoryRecallCommand";
import { PercentCommand } from "../operations/advancedOperations/PercentCommand";
import { PowerOf10Command } from "../operations/advancedOperations/PowerOf10Command";
import { ReciprocateCommand } from "../operations/advancedOperations/ReciprocateCommand";
import { RevertCommand } from "../operations/advancedOperations/RevertCommand";
import { SquaredCommand } from "../operations/advancedOperations/SquaredCommand";
import { SquareRootCommand } from "../operations/advancedOperations/SquareRootCommand";
import { ThirdPowerRootCommand } from "../operations/advancedOperations/ThirdPowerRootCommand";
import { YRootCommand } from "../operations/advancedOperations/YRootCommand";
import { AddCommand } from "../operations/arithmeticOperations/AddCommand";
import { DivideCommand } from "../operations/arithmeticOperations/DivideCommand";
import { EqualsCommand } from "../operations/arithmeticOperations/EqualsCommand";
import { MultiplyCommand } from "../operations/arithmeticOperations/MultiplyCommand";
import { SubtractCommand } from "../operations/arithmeticOperations/SubtractCommand";
import { advancedCommandSelector } from "./advancedOperationSelector";

const arithmeticOperations = document.querySelectorAll(
  ".arithmetic-operations, .equals, .undo"
);

for (let element of arithmeticOperations) {
  element.addEventListener("click", arithmeticCommandSelector);
}

export function arithmeticCommandSelector(event) {
  const operation = event?.target?.textContent || event;
  const previousCommand = calculator.operations.at(-1);

  if (
    previousCommand instanceof NumberButtonCommand ||
    previousCommand instanceof EqualsCommand ||
    previousCommand instanceof ReciprocateCommand ||
    previousCommand instanceof RevertCommand ||
    previousCommand instanceof PercentCommand ||
    previousCommand instanceof SquareRootCommand ||
    previousCommand instanceof ThirdPowerRootCommand ||
    previousCommand instanceof MemoryRecallCommand ||
    previousCommand instanceof MemoryClearCommand ||
    previousCommand instanceof MemoryMinusCommand ||
    previousCommand instanceof MemoryPlusCommand ||
    previousCommand instanceof SquaredCommand ||
    previousCommand instanceof CubedCommand ||
    previousCommand instanceof YRootCommand ||
    previousCommand instanceof PowerOf10Command ||
    previousCommand instanceof FactorialCommand ||
    operation === "undo" ||
    operation === "y√x" ||
    operation === "AC" ||
    operation === "x^y"
  ) {
    switch (
      (operation !== "undo" &&
        calculator.operationSigns.at(-1) !== "=" &&
        calculator.operationSigns.at(-1)) ||
      operation
    ) {
      case "+":
        calculator.execute(new AddCommand());
        break;
      case "-":
        calculator.execute(new SubtractCommand());
        break;
      case "*":
        calculator.execute(new MultiplyCommand());
        break;
      case "/":
        calculator.execute(new DivideCommand());
        break;
      case "=":
        calculator.execute(new EqualsCommand());
        break;
      case "undo":
        calculator.undo();
        break;
      default:
        advancedCommandSelector(calculator.operationSigns.at(-1) || operation);
        break;
    }
    if (operation !== "y√x" && operation !== "x^y" && operation !== "undo")
      calculator.operationSigns.push(operation);
  } else {
    calculator.operationSigns.splice(-1, 1, operation);
  }
  console.log(calculator);
}
