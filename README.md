# AutoValue AI - Used Car Price Predictor

A modern, responsive, frontend-only web application designed to estimate used car resale prices based on vehicle parameters and simulated machine learning algorithms.

---

## 📌 Project Overview
**AutoValue AI** provides car buyers and sellers with instant estimated resale prices. The application is built entirely using vanilla HTML5, CSS3, and JavaScript, leveraging a mock dataset of over 40 detailed Indian used car records to simulate a Random Forest regression model.

- It runs standalone in any browser without needing a build step or backend server, and is pre-configured for direct static deployment on **Vercel**.

---

## ✨ Features
- 🚗 **Instant Resale Price Estimation**: Calculates estimated price, range (low-high), confidence percentage, and comparison metrics.
- 🎯 **Simulated Machine Learning Algorithm**: Uses multi-parameter weighted scoring across brand, model, manufacturing year, kilometres driven, fuel type, transmission, owner count, and city location.
- 🔍 **Similar Cars Comparison**: Displays matching vehicles from the mock dataset that influenced the prediction.
- 📊 **Dataset Explorer**: Searchable, filterable, and sortable table with instant pagination ("Load More Records") and key summary stats.
- 📈 **Model Performance Dashboard**: Interactive Chart.js analytics comparing simulated metrics for Random Forest vs. Linear Regression.
- 🌗 **Dark / Light Theme Toggle**: Persistent user preferences with automatic local storage saving.
- 💾 **Local State Persistence**: Restores user's last form entry and prediction results on page reload.
- 📱 **Fully Responsive Design**: Optimized for mobile phones, tablets, laptops, and large desktop screens.

---

## 📁 Folder Structure

```text
used-car-price-predictor/
├── index.html        # Main HTML entry point
├── style.css         # Modern CSS styles (Dark Navy / Light themes)
├── script.js        # Core app logic, form validation, ML simulator, DOM controller
├── mock-data.js      # Mock dataset of 40+ car records & summary statistics
├── README.md         # Documentation & deployment guide
└── vercel.json       # Vercel static deployment configuration
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Opening
Simply double-click `index.html` or drag it into any web browser.

### Option 2: Local Static Server
Run a quick Python static server from the project root directory:

```bash
# Python 3
python -m http.server 5500
```
Then navigate to: `http://localhost:5500`

---

## 🌐 How to Deploy to Vercel

1. Create a GitHub repository and push `index.html`, `style.css`, `script.js`, `mock-data.js`, `vercel.json`, and `README.md`.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Framework Preset: Choose **Other** / **Static**.
5. Root Directory: `./`
6. Click **Deploy**.
7. Open the generated Vercel live URL!

---

## 🤖 How Mock Prediction Works

The function `predictCarPrice(carDetails)` in `script.js` performs the following steps:
1. **Match Detection**: Finds similar cars from `mockCars` by scoring brand, model, year proximity, fuel type, transmission, and km driven.
2. **Base Price Calculation**: Calculates a weighted average price of similar vehicles.
3. **Depreciation & Premiums**:
   - Adjusts price based on age difference (+6.5% per newer year, -6.5% per older year).
   - Adjusts price for kilometres driven (+/- 2.5% per 10,000 km variance).
   - Deducts value for multiple owners (-4.5% per owner beyond 1st).
   - Applies premiums for Automatic transmission (+5%) and Electric/Diesel fuels (+10%/+3%).
4. **Deterministic Jitter**: Adds a tiny pseudo-random variation (-4% to +4%) for realism.
5. **Confidence & Range**: Generates an estimated range (±10%) and a confidence rating (68%–94%).

---

## 📄 File Breakdown
- `index.html`: Contains full structural markup, navigation, hero banner, valuation form, result cards, explorer table, model dashboard, and about modal.
- `style.css`: Defines responsive CSS grid/flexbox layouts, CSS custom properties for dark/light themes, animations, badges, and form styles.
- `mock-data.js`: Holds array of 40+ realistic used car objects with attributes like brand, model, year, kmDriven, fuelType, transmission, owners, city, engineCC, mileage, and resalePrice.
- `script.js`: Implements form validation, option population, ML simulation, dataset search/filtering, Chart.js chart rendering, toast notifications, and local storage state persistence.
- `vercel.json`: Route configuration for static deployment.

---

## 🔌 Replacing Mock Prediction with a Real Python API Later

To connect a real machine learning model (e.g. Scikit-Learn Random Forest trained in Python with FastAPI or Flask):

Replace `predictCarPrice` in `script.js` with an asynchronous API fetch call:

```javascript
async function predictCarPrice(carDetails) {
  try {
    const response = await fetch("https://your-python-backend.com/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carDetails)
    });
    if (!response.ok) throw new Error("API request failed");
    return await response.json();
  } catch (err) {
    console.error("Falling back to client-side simulator:", err);
    return predictCarPriceMockFallback(carDetails);
  }
}
```

---

## ⚠️ Known Limitations
- Current predictions are based on mock dataset calculations and simulated heuristics.
- Does not connect to live market valuation APIs or a live Scikit-Learn server.
- Sample dataset contains 42 car records.

---

## 🔮 Future Improvements
- [ ] Connect to FastAPI / Flask backend with a trained `.pkl` Scikit-Learn model.
- [ ] Add PDF valuation report download option.
- [ ] Implement image upload and AI visual damage inspection.
