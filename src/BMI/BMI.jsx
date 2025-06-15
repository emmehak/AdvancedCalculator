import React, { useState } from "react";
import "./BMI.css";
import Navbar from "../Navbar/Navbar";
import { bmicalculator } from "../handlers/math";

export const BMI = () => {

  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [wunit, setWUnit] = useState("kg");
  const [hunit, setHUnit] = useState("inches");
  const [result, setResult] = useState("");
  
  const Calculate=(e)=>{
    e.preventDefault();
    if (!height || !weight || height <= 0 || weight <= 0) {
      
      setResult(<span style={{ color: "red" }}>Please provide valid inputs for height and weight.</span>);     
      return;
    }

    const { bmi, status } = bmicalculator(age, parseFloat(height), parseFloat(weight), wunit, hunit);
    const statusColors = {
      "Underweight": "yellowgreen",
      "Normal Weight": "green",
      "Overweight": "orange",
      "Obesity": "red",
    };
  
    const resultColor = statusColors[status] || "black"; 
  
    setResult(
      bmi
        ? <span style={{ color: resultColor }}>
            Your BMI is <strong>{bmi}</strong>, indicating <strong>{status}</strong>.
          </span>
        : <span style={{ color: "red" }}>Error: Unable to calculate BMI.</span>
    );
  
  }
    
  return (
    <>
      <Navbar name="BMI Calculator" />
      <main className="container bmicontainer">
        <div className="layout">
          <form className="form-controls">
            {/* Age Input */}
            <div className="form-group form-floating mb-4">
              <input
                className="form-control"
                type="number"
                name="age"
                id="age"
                value={age}
                placeholder="Enter your Age"
                onChange={(e) => setAge(e.target.value)}
                required
              />
              <label className="text-muted" htmlFor="age">Age</label>
            </div>

            {/* Height Input */}
            <div className="form-group mb-4">
              <div className="form-floating">
                <input
                  className="form-control"
                  type="number"
                  name="height"
                  id="height"
                  value={height}
                  placeholder="Enter your Height"
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
                <label className="text-muted" htmlFor="height">Height</label>
              </div>
              <div className="d-flex align-items-center mt-2">
                <span className="me-3 p-1">Unit:</span>
                <div className="form-check me-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="hunit"
                    id="inches"
                    value="inches"
                    checked={hunit === "inches"}
                    onChange={(e) => setHUnit(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="inches">
                    Inches
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="hunit"
                    id="m"
                    value="m"
                    checked={hunit === "m"}
                    onChange={(e) => setHUnit(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="m">
                    Meters
                  </label>
                </div>
              </div>
            </div>

            {/* Weight Input */}
            <div className="form-group mb-4">
              <div className="form-floating">
                <input
                  className="form-control"
                  type="number"
                  name="weight"
                  id="weight"
                  value={weight}
                  placeholder="Enter your Weight"
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
                <label className="text-muted" htmlFor="weight">Weight</label>
              </div>
              <div className="d-flex align-items-center mt-2">
                <span className="me-3 p-1">Unit:</span>
                <div className="form-check me-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="wunit"
                    id="kg"
                    value="kg"
                    checked={wunit === "kg"}
                    onChange={(e) => setWUnit(e.target.value)}
                    
                  />
                  <label className="form-check-label" htmlFor="kg">
                    Kilograms
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="wunit"
                    id="lbs"
                    value="lbs"
                    checked={wunit === "lbs"}
                    onChange={(e) => setWUnit(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="lbs">
                    Pounds
                  </label>
                </div>
              </div>
            </div>

            <div className="resultcontainer">
              <button type="button" className="btn" onClick={Calculate}>Calculate</button>
              <div  className="result border-0 p-1" name="result" id="result" >{result}</div>
            </div>
          </form>
        </div>
      </main>
    </>
  );

  }



