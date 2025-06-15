import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Math.css';
import { math } from '../handlers/math.js';


export const Math = () => {
  const [current, setCurrent] = useState('0');
  const [previous, setPrevious] = useState('');

  const buttons = [
    '1', '2', '3', '+', 'sin', '^', '4', '5', '6', '-',
    'cos', '√', '7', '8', '9', '÷', 'tan', '!', '.', '0',
    'π', '*', 'log', '%', '=', 'C', 'AC', '(', ')',
  ];

  const HandleClick = (label) => {
    if (current.length >= 16) {
      setCurrent('!Large Input');
      setTimeout(() => {
        setCurrent('0');
      }, 500);
      return;
    }
    math(label, current, setCurrent, setPrevious); // Pass necessary state setters
  };

  return (
    <>
      {/* Navbar */}
      <Navbar name="Scientific Calculator" />

      {/* Calculator Layout */}
      <main className="Mathcalculator container">
        <div className="layout">
          {/* Screen */}
          <div className="screen border border-2 rounded p-1">
            <div className="previous p-1 text-muted">{previous}</div>
            <div className="current fs-1 p-1">{current}</div>
          </div>

          {/* Buttons */}
          <div className="buttons m-2">
            {buttons.map((label, index) => (
              <button
                key={index}
                className={`btn btn-${index}`}
                onClick={() => HandleClick(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
