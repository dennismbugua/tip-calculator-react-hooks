import "./styles.css";
import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const currency = (value) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

  const handleCalculate = () => {
    const b = parseFloat(bill);
    const p = parseInt(people, 10);
    const perc = Number(percentage);

    if (isNaN(b) || b <= 0) {
      setError("Please enter a valid bill amount.");
      setResult(null);
      return;
    }
    if (isNaN(p) || p <= 0) {
      setError("Please enter number of people (at least 1).");
      setResult(null);
      return;
    }
    if (isNaN(perc) || perc <= 0) {
      setError("Please choose a tip percentage.");
      setResult(null);
      return;
    }

    setError("");
    const totalTip = (b * perc) / 100;
    const tipPerPerson = totalTip / p;
    const totalPerPerson = (b + totalTip) / p;

    setResult({ totalTip, tipPerPerson, totalPerPerson });
  };

  const handleReset = () => {
    setBill("");
    setPeople("");
    setPercentage(0);
    setResult(null);
    setError("");
  };

  const quickPick = (val) => setPercentage(val);

  return (
    <div className="App">
      <div className="card">
        <header className="card-header">
          <h1>Tip Calculator</h1>
          <p className="subtitle">Split the bill, calculate tip, and keep it fair.</p>
        </header>

        <div className="card-body">
          <label className="label">Bill Amount</label>
          <div className="input-row">
            <span className="currency">$</span>
            <input
              type="number"
              placeholder="0.00"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <label className="label">Service Quality</label>
          <div className="preset-buttons">
            {[0, 10, 15, 18, 20, 25, 30, 40, 50, 75, 100].map((p) => (
              <button
                key={p}
                type="button"
                className={`preset ${Number(percentage) === p ? "active" : ""}`}
                onClick={() => quickPick(p)}
              >
                {p}%
              </button>
            ))}
          </div>

          <select
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            className="select"
          >
            <option value={0}>-- Choose an Option --</option>
            <option value={100}>100% - Exceptional (Double)</option>
            <option value={75}>75% - Above & Beyond</option>
            <option value={50}>50% - Outstanding</option>
            <option value={40}>40% - Excellent</option>
            <option value={30}>30% - Very Good</option>
            <option value={25}>25% - Great</option>
            <option value={20}>20% - Good</option>
            <option value={18}>18% - Standard</option>
            <option value={15}>15% - Acceptable</option>
            <option value={10}>10% - Below Average</option>
            <option value={5}>5% - Poor</option>
            <option value={0}>0% - Unacceptable</option>
          </select>

          <label className="label">Number of People</label>
          <input
            type="number"
            placeholder="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            min="1"
          />

          {error && <div className="error">{error}</div>}

          <div className="actions">
            <button className="primary" onClick={handleCalculate}>
              Calculate
            </button>
            <button className="secondary" onClick={handleReset}>
              Reset
            </button>
          </div>

          <div className={`result ${result ? "visible" : ""}`}>
            {result && (
              <>
                <div className="result-row">
                  <div className="result-block">
                    <div className="label">Tip Amount</div>
                    <div className="value">{currency(result.totalTip)}</div>
                  </div>

                  <div className="result-block">
                    <div className="label">Tip / person</div>
                    <div className="value">{currency(result.tipPerPerson)}</div>
                  </div>
                </div>

                <div className="total-row">
                  <div className="label">Total / person</div>
                  <div className="value large">{currency(result.totalPerPerson)}</div>
                </div>
              </>
            )}
          </div>
        </div>

        <footer className="card-footer">Built with care — great UI & UX</footer>
      </div>
    </div>
  );
}
