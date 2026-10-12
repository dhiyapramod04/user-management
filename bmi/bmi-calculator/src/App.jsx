
import { useState } from "react";
import "./App.css";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();

    const w = Number(weight);
    const h = Number(height);

    if (
      weight.trim() === "" ||
      height.trim() === "" ||
      !Number.isFinite(w) ||
      !Number.isFinite(h) ||
      w <= 0 ||
      h <= 0
    ) {
      setError("Please enter a valid weight and height.");
      setResult(null);
      return;
    }

    const bmi = w / (h * h);

    let category = "";
    let message = "";

    if (bmi < 18.5) {
      category = "Underweight";
      message = "Your BMI is below the standard adult range.";
    } else if (bmi < 25) {
      category = "Normal weight";
      message = "Your BMI is within the standard adult range.";
    } else if (bmi < 30) {
      category = "Overweight";
      message = "Your BMI is above the standard adult range.";
    } else {
      category = "Obese";
      message = "Your BMI is in the obesity range for adults.";
    }

    setResult({
      bmi: bmi.toFixed(2),
      category,
      message,
    });

    setError("");
  };

  const resetCalculator = () => {
    setWeight("");
    setHeight("");
    setResult(null);
    setError("");
  };

  return (
    <main className="page">
      <header className="header">
        <div className="brand-icon">♡</div>
        <h1>
          BMI <span>Calculator</span>
        </h1>
        <p>Know your body. Make healthier choices.</p>
        <div className="accent-line"></div>
      </header>

      <section className="calculator">
        <div className="input-panel">
          <div className="section-heading">
            <span className="heading-icon">♙</span>
            <h2>Enter Your Details</h2>
          </div>

          <p className="description">
            Enter your weight and height to calculate
            your Body Mass Index (BMI).
          </p>

          <form onSubmit={calculateBMI}>
            <div className="field">
              <label htmlFor="weight">Weight (kg)</label>
              <div className="input-wrap">
                <input
                  id="weight"
                  type="number"
                  min="0.1"
                  step="any"
                  placeholder="e.g. 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
                <span>kg</span>
              </div>
            </div>

            <div className="field">
              <label htmlFor="height">Height (m)</label>
              <div className="input-wrap">
                <input
                  id="height"
                  type="number"
                  min="0.1"
                  step="any"
                  placeholder="e.g. 1.75"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
                <span>m</span>
              </div>
            </div>

            {error && <p className="error">{error}</p>}

            <button className="calculate-btn" type="submit">
              <span>▦</span> Calculate BMI <span>→</span>
            </button>

            <button
              className="reset-btn"
              type="button"
              onClick={resetCalculator}
            >
              Reset Calculator
            </button>
          </form>
        </div>

        <div className="result-panel">
          <div className="section-heading">
            <span className="heading-icon">◉</span>
            <h2>Your Result</h2>
          </div>

          <div className="bmi-circle">
            <div className="circle-content">
              <span className="bmi-label">YOUR BMI</span>
              <strong>{result ? result.bmi : "--.--"}</strong>
              <span
                className={`category ${
                  result
                    ? result.category.toLowerCase().replace(" ", "-")
                    : ""
                }`}
              >
                {result ? result.category : "Awaiting result"}
              </span>
            </div>
          </div>

          <div className="result-message">
            <span>✦</span>
            <p>
              {result
                ? result.message
                : "Enter your details and calculate your BMI to see your result."}
            </p>
          </div>

          <h3 className="legend-title">BMI Categories</h3>

          <div className="legend-item under">
            <span className="dot"></span>
            <span>Underweight</span>
            <strong>&lt; 18.5</strong>
          </div>

          <div className="legend-item normal">
            <span className="dot"></span>
            <span>Normal weight</span>
            <strong>18.5 – 24.9</strong>
          </div>

          <div className="legend-item over">
            <span className="dot"></span>
            <span>Overweight</span>
            <strong>25 – 29.9</strong>
          </div>

          <div className="legend-item obese">
            <span className="dot"></span>
            <span>Obese</span>
            <strong>≥ 30</strong>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>♡</span>
        <p>A healthier you is a happier you.</p>
        <small>BMI Calculator · React Application</small>
      </footer>
    </main>
  );
}

export default App;
