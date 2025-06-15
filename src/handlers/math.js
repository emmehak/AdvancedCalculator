import { evaluate } from "mathjs";

// Scientific Calculator

export const math = (label, current, setCurrent, setPrevious) => {
  let result = 0;

  if (label === "C") {
    setCurrent(current.slice(0, -1) || "0");
  } 
  
  else if (label === "AC") {
    setCurrent("0");
    setPrevious("");
  } 
  
  else if (label === "sin") {
    const value = parseFloat(current);
    if (isNaN(value)) return setCurrent("Error");
    result = Math.sin((value * Math.PI) / 180);
    setCurrent(result.toFixed(4).toString());
  } 
  
  else if (label === "tan") {
    const value = parseFloat(current);
    if (isNaN(value)) return setCurrent("Error");
    result = Math.tan((value * Math.PI) / 180);
    setCurrent(result.toFixed(4).toString());
  } 
  
  else if (label === "cos") {
    const value = parseFloat(current);
    if (isNaN(value)) return setCurrent("Error");
    result = Math.cos((value * Math.PI) / 180);
    setCurrent(result.toFixed(4).toString());
  } 
  
  else if (label === "log") {
    const value = parseFloat(current);
    if (value <= 0 || isNaN(value)) return setCurrent("Error");
    result = Math.log10(value); // Base 10 log
    setCurrent(result.toFixed(4).toString());
  } 
  
  else if (label === "√") {
    const value = parseFloat(current);
    if (value < 0 || isNaN(value)) return setCurrent("Error");
    result = Math.sqrt(value);
    setCurrent(result.toFixed(4).toString());
  } 
  
  else if (label === "π") {
    setCurrent(Math.PI.toFixed(4).toString());
  } 
  
  else if (label === "^") {
    const [base, exponent] = current.split("^").map(Number);
    if (isNaN(base) || isNaN(exponent)) return setCurrent("Error");
    result = Math.pow(base, exponent);
    setCurrent(result.toFixed(4).toString());
  } 
  
  else if (label === "!") {
    const value = parseInt(current);
    if (isNaN(value) || value < 0 || value > 170) return setCurrent("Error");
    let factorial = 1;
    for (let i = 1; i <= value; i++) factorial *= i;
    setCurrent(factorial.toString());
  } 
  
  else if (label === ".") {
    if (!current.includes(".")) setCurrent((prev) => prev + ".");
  } 
  
  else if (label === "(" || label === ")") {
    setCurrent((prev) => (prev === "0" ? label : prev + label));
  } 
  
  else if (label === "=") {
    try {
      let calcResult;
      calcResult = evaluate(current.replace("÷", "/"));
      setCurrent(calcResult.toFixed(4).toString());
      setPrevious(current);
    } catch (error) {
      setCurrent("Error");
    }
  } 
  
  else {
    setCurrent((prev) => (prev === "0" ? label : prev + label));
  }
};

// BMI Calculator
export const bmicalculator = (age, height, weight, wunit, hunit) => {
  let bmi = 0.0;
  let bmiStatus = "";

  // BMI Calculation Logic
  if (wunit === "lbs" && hunit === "inches") {
    bmi = (weight * 703) / (height * height);
  } else if (wunit === "kg" && hunit === "m") {
    bmi = weight / (height * height);
  } else if (wunit === "kg" && hunit === "inches") {
    height *= 0.0254;
    bmi = weight / (height * height);
  } else if (wunit === "lbs" && hunit === "m") {
    weight /= 2.20462;
    bmi = weight / (height * height);
  } else {
    return null;
  }

  if (bmi <= 18.4) {
    bmiStatus = "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    bmiStatus = "Normal Weight";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    bmiStatus = "Overweight";
  } else {
    bmiStatus = "Obesity";
  }

  return { bmi: bmi.toFixed(2), status: bmiStatus };
};


