import { BrowserRouter,Routes, Route } from "react-router-dom";

import "./App.css"
import { Math } from "./MathCalculator/Math";
import { BMI } from "./BMI/BMI";
import {Currency} from "./Currency/Currency"
function App() {
  return (
    <div className="routes">
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Math/>} />
    <Route path="/bmi" element={<BMI/>} />
    <Route path="/currency" element={<Currency />} />
  </Routes>
  </BrowserRouter>
    </div>
  
    
  );
}

export default App;
