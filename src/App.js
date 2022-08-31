import "./styles.css";
import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState("");
  const [percentage, setPercentage] = useState("0");
  const [tip, setTip] = useState("tip");
  const [result, setResult] = useState(0);

  const handleBill = (selected) => {
    if (bill === "" || people === "" || percentage === 0) {
      alert("Invalid input");
    }

    const total = (bill * percentage) / 100 / people;

    setResult(total.toFixed(2));
    setBill("");
    setPeople("");
    setPercentage("0");
    setTip(tip);
  };

  return (
    <div className="App">
      <h2>TIP CALCULATOR</h2>
      <div className="container">
        <p>How much was your bill?</p>
        <label>$</label>
        <input
          type="number"
          placeholder="Bill Amount"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />

        <p>How was your service?</p>

        <select
          value={percentage}
          onChange={(e) => {
            const selected = Number(e.target.value);
            setPercentage(selected);
          }}
        >
          <option selected value="0">
            -- Choose an Option--
          </option>
          <option value="30"> 30% - Outstanding</option>
          <option value="20"> 20% - Good</option>
          <option value="15"> 15% - It was OK</option>
          <option value="10"> 10% - Bad</option>
          <option value="5"> 5% - Terrible</option>
        </select>

        <p>How many people are sharing the bill?</p>

        <input
          type="text"
          placeholder="Number of People"
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
        />

        <label>people</label>
        <div className="btn">
          <button onClick={() => handleBill()}>CALCULATE!</button>

          <div className={result ? "a" : "tip"}>
            <h3>TIP AMOUNT</h3>
            <h3>${result}</h3>
            <h3>each</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
