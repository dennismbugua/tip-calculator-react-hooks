# tip-calculator-react-hooks
Created with CodeSandbox
## Tip Calculator — React Hooks, beautiful UX

Make splitting the bill effortless. This tiny app helps people agree on a fair tip and see exactly what each person owes—fast, clear, and friendly.

Why this matters (business impact)

- Reduce checkout friction: Faster decisions at the table or counter mean quicker turns and happier guests.
- Increase conversion for suggested tipping: Clear presets and transparent math nudge users toward a choice without pressure.
- Fewer disputes at group checkout: A shared understanding of “tip per person” and “total per person” keeps things calm and fair.
- Embed anywhere: POS add-on, restaurant website, QR menu, travel planner, events app, or personal finance tools.

Common use cases

- Restaurants and cafes: Add to digital menus, table QR codes, or kiosk checkout flows.
- Delivery and ride-share: Show suggested tips and split-by-passenger totals.
- Events and group outings: Quickly divide costs among friends or colleagues.
- Hospitality training: Teach staff and trainees how tip math works and what guests see.

How it works (the what and the why)

- Preset tip buttons plus a dropdown: Offers quick choices with a complete range (0–100%) for edge cases and accessibility.
- Inline validation and helpful feedback: No pop-up alerts; clear messages keep users in flow.
- Currency formatting with Intl: Consistent, locale-ready display (default USD) builds trust at payment time.
- Animated results: Reveals totals only when inputs are valid, so the UI feels responsive and intentional.

Tech and architecture at a glance

- Frontend: React function component with hooks for state and derived results.
- State: bill (string), people (string), percentage (number), error (string), result (object | null).
- Logic: Validate inputs, compute total tip, tip per person, and total per person.
- Styling: Modern CSS (Inter font, glass card, focus states, responsive layout).

File map

- `src/App.js` — UI, state, calculation logic, and interactions.
- `src/styles.css` — Visual design, components, animations, and responsive rules.

Key code snippets

Currency formatting (trustworthy, locale-ready):

```js
// src/App.js
const currency = (value) =>
	new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
```

Core calculation with validation:

```js
// src/App.js
const handleCalculate = () => {
	const b = parseFloat(bill);
	const p = parseInt(people, 10);
	const perc = Number(percentage);

	if (isNaN(b) || b <= 0) { setError("Please enter a valid bill amount."); setResult(null); return; }
	if (isNaN(p) || p <= 0) { setError("Please enter number of people (at least 1)."); setResult(null); return; }
	if (isNaN(perc) || perc <= 0) { setError("Please choose a tip percentage."); setResult(null); return; }

	setError("");
	const totalTip = (b * perc) / 100;
	const tipPerPerson = totalTip / p;
	const totalPerPerson = (b + totalTip) / p;
	setResult({ totalTip, tipPerPerson, totalPerPerson });
};
```

Delightful presets (0–100% range) and dropdown:

```jsx
// src/App.js
<div className="preset-buttons">
	{[0, 10, 15, 18, 20, 25, 30, 40, 50, 75, 100].map((p) => (
		<button
			key={p}
			type="button"
			className={`preset ${Number(percentage) === p ? "active" : ""}`}
			onClick={() => setPercentage(p)}
		>
			{p}%
		</button>
	))}
	<select value={percentage} onChange={(e) => setPercentage(Number(e.target.value))} className="select">
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
  
</div>
```

Result display (only when valid):

```jsx
// src/App.js
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
```

Design choices that drive UX

- Visibility of system status: Results animate in after valid input; buttons provide hover/active states.
- Recognition over recall: Common percentage presets are one tap away.
- Error prevention: Inputs have min values, and validation messages appear inline.
- Aesthetics and minimalism: A focused card and simple copy reduce cognitive load.

Getting started

```bash
npm install
npm start
```

Then open the dev server URL (typically http://localhost:3000).

Tech stack

- React (functional components + hooks)
- CSS only (no runtime UI libraries)

Extending the app

- Currency and locale selector (EUR, GBP, etc.) via Intl.
- Persist last-used settings in localStorage.
- Shareable summaries (copy to clipboard or deep links).
- POS/e-commerce integration as a widget or iframe.

Relevant studies & statistics (further reading)

These resources discuss tipping behaviors, averages, and consumer sentiment. Use them to tailor presets and defaults to your audience:

- Toast — Restaurant Tipping Trends (industry data on average tip rates and variations by service type):
	https://pos.toasttab.com/blog/on-the-line/restaurant-tipping-trends
- Bankrate — Americans and Tipping (annual consumer survey on tipping norms and “tipping fatigue”):
	https://www.bankrate.com/banking/consumer-surveys/
- Pew Research Center — What polling says about how people tip, why, and how much (attitudes and prevalence across contexts):
	https://www.pewresearch.org/short-reads/

Tip: Local norms vary. Many U.S. full-service settings commonly see tips in the high teens to low 20s, while counter-service and delivery often trend lower. Use analytics to tune your presets.

License

MIT — do whatever helps you and your customers, attribution appreciated.
