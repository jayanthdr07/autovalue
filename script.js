/**
 * AutoValue AI - Main Application Logic
 * Pure Vanilla JavaScript for Used Car Price Prediction & Dataset Exploration
 */

// Application State
let currentDataset = [...mockCars];
let filteredDataset = [...mockCars];
let datasetDisplayLimit = 20;
let lastPredictionResult = null;
let performanceChart = null;

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

/**
 * Initialize all application modules, form controls, event listeners, and saved state
 */
function initializeApp() {
  initTheme();
  populateBrandOptions();
  populateFuelOptions();
  populateTransmissionOptions();
  populateCityOptions();
  renderDatasetSummary();
  renderDatasetTable();
  initModelPerformanceChart();
  setupEventListeners();
  restoreSavedFormValues();
  renderSavedComparisons();
}

/**
 * Theme Toggle Handler
 */
function initTheme() {
  const savedTheme = localStorage.getItem("autovalue_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeToggleUI(savedTheme);
}

function updateThemeToggleUI(theme) {
  const iconEl = document.getElementById("themeIcon");
  const textEl = document.getElementById("themeText");
  if (iconEl && textEl) {
    if (theme === "light") {
      iconEl.textContent = "☀️";
      textEl.textContent = "Light Mode";
    } else {
      iconEl.textContent = "🌙";
      textEl.textContent = "Dark Mode";
    }
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("autovalue_theme", newTheme);
  updateThemeToggleUI(newTheme);
  showToast(`Switched to ${newTheme} theme`, "info");
}

/**
 * Populate Form Dropdowns from Mock Dataset
 */
function populateBrandOptions() {
  const brandSelect = document.getElementById("brandSelect");
  if (!brandSelect) return;

  const brands = mockDatasetSummary.availableBrands;
  brandSelect.innerHTML = `<option value="">Select Brand *</option>`;
  brands.forEach(brand => {
    const opt = document.createElement("option");
    opt.value = brand;
    opt.textContent = brand;
    brandSelect.appendChild(opt);
  });
}

function populateModelOptions(selectedBrand) {
  const modelSelect = document.getElementById("modelSelect");
  if (!modelSelect) return;

  modelSelect.innerHTML = `<option value="">Select Model *</option>`;
  if (!selectedBrand) {
    modelSelect.disabled = true;
    return;
  }

  // Filter models for selected brand from mock dataset
  const models = [...new Set(
    mockCars
      .filter(car => car.brand.toLowerCase() === selectedBrand.toLowerCase())
      .map(car => car.model)
  )].sort();

  models.forEach(model => {
    const opt = document.createElement("option");
    opt.value = model;
    opt.textContent = model;
    modelSelect.appendChild(opt);
  });

  modelSelect.disabled = false;
}

function populateFuelOptions() {
  const fuelSelect = document.getElementById("fuelSelect");
  const filterFuel = document.getElementById("filterFuel");
  const fuels = mockDatasetSummary.availableFuelTypes;

  const optionsHTML = fuels.map(f => `<option value="${f}">${f}</option>`).join("");
  if (fuelSelect) fuelSelect.innerHTML = `<option value="">Select Fuel Type *</option>` + optionsHTML;
  if (filterFuel) filterFuel.innerHTML = `<option value="">All Fuel Types</option>` + optionsHTML;
}

function populateTransmissionOptions() {
  const transSelect = document.getElementById("transmissionSelect");
  const filterTrans = document.getElementById("filterTransmission");
  const transmissions = mockDatasetSummary.availableTransmissions;

  const optionsHTML = transmissions.map(t => `<option value="${t}">${t}</option>`).join("");
  if (transSelect) transSelect.innerHTML = `<option value="">Select Transmission *</option>` + optionsHTML;
  if (filterTrans) filterTrans.innerHTML = `<option value="">All Transmissions</option>` + optionsHTML;
}

function populateCityOptions() {
  const citySelect = document.getElementById("citySelect");
  const filterCity = document.getElementById("filterCity");
  const cities = mockDatasetSummary.availableCities;

  const optionsHTML = cities.map(c => `<option value="${c}">${c}</option>`).join("");
  if (citySelect) citySelect.innerHTML = `<option value="">Select City (Optional)</option>` + optionsHTML;
  if (filterCity) filterCity.innerHTML = `<option value="">All Cities</option>` + optionsHTML;
}

/**
 * Event Listeners Setup
 */
function setupEventListeners() {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("hidden");
    });
  }

  // Smooth Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
          if (mobileNav && !mobileNav.classList.contains("hidden")) {
            mobileNav.classList.add("hidden");
          }
        }
      }
    });
  });

  // Theme Toggle Button
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // Brand selection change -> update models
  const brandSelect = document.getElementById("brandSelect");
  if (brandSelect) {
    brandSelect.addEventListener("change", (e) => {
      populateModelOptions(e.target.value);
      validateField("brandSelect");
    });
  }

  // Form Field Blur Validation
  const formFields = ["brandSelect", "modelSelect", "yearInput", "kmInput", "fuelSelect", "transmissionSelect", "ownerInput", "engineInput", "mileageInput"];
  formFields.forEach(fieldId => {
    const el = document.getElementById(fieldId);
    if (el) {
      el.addEventListener("change", () => validateField(fieldId));
      el.addEventListener("input", () => validateField(fieldId));
    }
  });

  // Form Submit
  const predictionForm = document.getElementById("predictionForm");
  if (predictionForm) {
    predictionForm.addEventListener("submit", handlePredictionSubmit);
  }

  // Prediction Reset Button
  const resetBtn = document.getElementById("resetFormBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetPredictionForm);
  }

  // Predict Again Button
  const predictAgainBtn = document.getElementById("predictAgainBtn");
  if (predictAgainBtn) {
    predictAgainBtn.addEventListener("click", () => {
      document.getElementById("predict")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Dataset Search & Filters
  const datasetSearch = document.getElementById("datasetSearch");
  const filterFuel = document.getElementById("filterFuel");
  const filterTransmission = document.getElementById("filterTransmission");
  const filterCity = document.getElementById("filterCity");
  const sortSelect = document.getElementById("sortSelect");

  if (datasetSearch) datasetSearch.addEventListener("input", filterDataset);
  if (filterFuel) filterFuel.addEventListener("change", filterDataset);
  if (filterTransmission) filterTransmission.addEventListener("change", filterDataset);
  if (filterCity) filterCity.addEventListener("change", filterDataset);
  if (sortSelect) sortSelect.addEventListener("change", sortDataset);

  // Load More Dataset Records
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      datasetDisplayLimit += 20;
      renderDatasetTable();
    });
  }
}

/**
 * Form Field Validation Helper
 */
function validateField(fieldId) {
  const el = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}Error`);
  if (!el || !errorEl) return true;

  let isValid = true;
  let message = "";

  const val = el.value.trim();

  switch (fieldId) {
    case "brandSelect":
      if (!val) { isValid = false; message = "Please select a vehicle brand."; }
      break;
    case "modelSelect":
      if (!val) { isValid = false; message = "Please select a car model."; }
      break;
    case "yearInput":
      const year = parseInt(val, 10);
      const currentYear = new Date().getFullYear();
      if (!val || isNaN(year) || year < 1980 || year > currentYear) {
        isValid = false;
        message = `Year must be between 1980 and ${currentYear}.`;
      }
      break;
    case "kmInput":
      const km = parseInt(val, 10);
      if (val === "" || isNaN(km) || km < 0) {
        isValid = false;
        message = "Kilometres driven must be 0 or greater.";
      }
      break;
    case "fuelSelect":
      if (!val) { isValid = false; message = "Please select a fuel type."; }
      break;
    case "transmissionSelect":
      if (!val) { isValid = false; message = "Please select a transmission type."; }
      break;
    case "ownerInput":
      if (val !== "") {
        const owner = parseInt(val, 10);
        if (isNaN(owner) || owner < 0 || owner > 10) {
          isValid = false;
          message = "Owner count must be between 0 and 10.";
        }
      }
      break;
    case "engineInput":
      if (val !== "") {
        const engine = parseInt(val, 10);
        if (isNaN(engine) || engine <= 0) {
          isValid = false;
          message = "Engine capacity must be greater than 0 CC.";
        }
      }
      break;
    case "mileageInput":
      if (val !== "") {
        const mileage = parseFloat(val);
        if (isNaN(mileage) || mileage <= 0) {
          isValid = false;
          message = "Mileage must be greater than 0.";
        }
      }
      break;
  }

  if (!isValid) {
    el.classList.add("input-error");
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
  } else {
    el.classList.remove("input-error");
    errorEl.textContent = "";
    errorEl.classList.add("hidden");
  }

  return isValid;
}

/**
 * Validate Complete Form
 */
function validateForm() {
  const fields = ["brandSelect", "modelSelect", "yearInput", "kmInput", "fuelSelect", "transmissionSelect", "ownerInput", "engineInput", "mileageInput"];
  let allValid = true;

  fields.forEach(f => {
    const fieldValid = validateField(f);
    if (!fieldValid) allValid = false;
  });

  return allValid;
}

/**
 * Get Structured Form Data
 */
function getFormData() {
  return {
    brand: document.getElementById("brandSelect").value,
    model: document.getElementById("modelSelect").value,
    year: parseInt(document.getElementById("yearInput").value, 10),
    kmDriven: parseInt(document.getElementById("kmInput").value, 10),
    fuelType: document.getElementById("fuelSelect").value,
    transmission: document.getElementById("transmissionSelect").value,
    ownerCount: document.getElementById("ownerInput").value !== "" ? parseInt(document.getElementById("ownerInput").value, 10) : 1,
    sellerType: document.getElementById("sellerSelect").value || "Individual",
    engineCC: document.getElementById("engineInput").value !== "" ? parseInt(document.getElementById("engineInput").value, 10) : null,
    mileage: document.getElementById("mileageInput").value !== "" ? parseFloat(document.getElementById("mileageInput").value) : null,
    city: document.getElementById("citySelect").value || "Bengaluru"
  };
}

/**
 * Handle Prediction Form Submission
 */
function handlePredictionSubmit(e) {
  e.preventDefault();

  if (!validateForm()) {
    showToast("Please correct the errors in the form before proceeding.", "error");
    return;
  }

  const formData = getFormData();
  saveFormData(formData);

  showLoading();

  // Simulate ML processing time (~800ms)
  setTimeout(() => {
    hideLoading();
    const result = predictCarPrice(formData);
    lastPredictionResult = result;
    saveLastPrediction(result);

    renderPredictionResult(result);
    renderSimilarCars(result.similarCarList);

    showToast("Resale value calculated successfully!", "success");

    // Scroll smoothly to prediction result card
    const resultSection = document.getElementById("predictionResultCard");
    if (resultSection) {
      resultSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 800);
}

/**
 * SIMULATED ML PREDICTION LOGIC
 */
function findSimilarCars(carDetails) {
  const scores = mockCars.map(car => {
    let score = 0;

    // Brand match
    if (car.brand.toLowerCase() === carDetails.brand.toLowerCase()) score += 35;

    // Model match
    if (car.model.toLowerCase() === carDetails.model.toLowerCase()) score += 40;

    // Year proximity
    const yearDiff = Math.abs(car.year - carDetails.year);
    if (yearDiff === 0) score += 20;
    else if (yearDiff <= 2) score += 15;
    else if (yearDiff <= 4) score += 8;

    // Fuel match
    if (car.fuelType.toLowerCase() === carDetails.fuelType.toLowerCase()) score += 15;

    // Transmission match
    if (car.transmission.toLowerCase() === carDetails.transmission.toLowerCase()) score += 15;

    // KM driven proximity
    const kmDiff = Math.abs(car.kmDriven - carDetails.kmDriven);
    if (kmDiff <= 15000) score += 10;
    else if (kmDiff <= 35000) score += 5;

    return { car, score };
  });

  scores.sort((a, b) => b.score - a.score);

  // Filter top matches (score >= 25), or return top 5
  let similar = scores.filter(s => s.score >= 25).map(s => s.car);
  if (similar.length === 0) {
    similar = scores.slice(0, 5).map(s => s.car);
  } else if (similar.length > 8) {
    similar = similar.slice(0, 8);
  }

  return similar;
}

function calculateMockPrice(carDetails, similarCars) {
  let basePrice = 0;

  if (similarCars.length > 0) {
    const total = similarCars.reduce((sum, c) => sum + c.resalePrice, 0);
    basePrice = total / similarCars.length;
  } else {
    // Fallback base price based on brand tier
    const brandLower = carDetails.brand.toLowerCase();
    if (["toyota", "kia", "mahindra", "volkswagen"].includes(brandLower)) {
      basePrice = 1100000;
    } else if (["maruti", "hyundai", "tata", "honda", "ford", "renault"].includes(brandLower)) {
      basePrice = 650000;
    } else {
      basePrice = 800000;
    }
  }

  // Adjustments
  const currentYear = new Date().getFullYear(); // 2026
  const carAge = currentYear - carDetails.year;
  
  // Calculate average age of similar cars
  const avgSimilarYear = similarCars.length > 0 
    ? similarCars.reduce((s, c) => s + c.year, 0) / similarCars.length 
    : 2020;
  
  const ageDifference = carDetails.year - avgSimilarYear;
  
  // Year adjustment: Newer cars increase value by 6.5% per year diff, older decrease
  let priceAdjusted = basePrice * (1 + (ageDifference * 0.065));

  // Kilometres adjustment
  const avgSimilarKm = similarCars.length > 0
    ? similarCars.reduce((s, c) => s + c.kmDriven, 0) / similarCars.length
    : 45000;
  
  const kmDifference = carDetails.kmDriven - avgSimilarKm;
  // Reduce ~2.5% for every 10,000 km above similar cars, boost for lower km
  priceAdjusted *= (1 - (kmDifference / 10000) * 0.025);

  // Owner Count adjustment
  if (carDetails.ownerCount > 1) {
    priceAdjusted *= (1 - (carDetails.ownerCount - 1) * 0.045);
  }

  // Transmission adjustment
  if (carDetails.transmission === "Automatic") {
    priceAdjusted *= 1.05; // 5% premium for automatic
  }

  // Fuel type adjustment
  if (carDetails.fuelType === "Electric") {
    priceAdjusted *= 1.10;
  } else if (carDetails.fuelType === "Diesel") {
    priceAdjusted *= 1.03;
  }

  // Seller type
  if (carDetails.sellerType === "Trustmark Dealer") {
    priceAdjusted *= 1.04;
  } else if (carDetails.sellerType === "Dealer") {
    priceAdjusted *= 1.02;
  }

  // Deterministic + slight pseudo-random variation (-4% to +4%)
  // Seeded variation based on model name length + km driven so same inputs give consistent realistic output
  const seed = (carDetails.brand.length * 3 + carDetails.model.length * 7 + carDetails.kmDriven) % 8 - 4;
  const variationFactor = 1 + (seed / 100);
  priceAdjusted *= variationFactor;

  // Rounding and bounds clamping
  let finalPredictedPrice = Math.round(priceAdjusted / 5000) * 5000;
  finalPredictedPrice = Math.max(120000, Math.min(8000000, finalPredictedPrice));

  const lowEstimate = Math.round((finalPredictedPrice * 0.90) / 5000) * 5000;
  const highEstimate = Math.round((finalPredictedPrice * 1.10) / 5000) * 5000;

  // Calculate confidence score based on similarity match strength
  let confidence = 75 + Math.min(18, similarCars.length * 2.5);
  if (carDetails.engineCC && carDetails.mileage) confidence += 3;
  confidence = Math.min(94, Math.max(68, Math.round(confidence)));

  return {
    predictedPrice: finalPredictedPrice,
    lowEstimate: lowEstimate,
    highEstimate: highEstimate,
    confidence: confidence
  };
}

/**
 * Predict Car Price - Main Function
 */
function predictCarPrice(carDetails) {
  const similarCars = findSimilarCars(carDetails);
  const priceMetrics = calculateMockPrice(carDetails, similarCars);

  return {
    predictedPrice: priceMetrics.predictedPrice,
    lowEstimate: priceMetrics.lowEstimate,
    highEstimate: priceMetrics.highEstimate,
    confidence: priceMetrics.confidence,
    similarCars: similarCars.length,
    modelUsed: "Random Forest Simulator",
    isMockPrediction: true,
    inputSummary: carDetails,
    similarCarList: similarCars
  };
}

/**
 * Currency Formatters
 */
function formatINR(amount) {
  if (isNaN(amount) || amount === null) return "₹0";
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Crore`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  } else {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
}

function formatExactINR(amount) {
  if (isNaN(amount) || amount === null) return "₹0";
  return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Render Prediction Result Card
 */
function renderPredictionResult(result) {
  const container = document.getElementById("predictionResultCard");
  if (!container) return;

  container.classList.remove("hidden");

  const input = result.inputSummary;
  const imageUrl = getCarImageUrl(input);

  container.innerHTML = `
    <div class="result-header">
      <div class="badge badge-primary">✨ Prediction Result</div>
      <span class="badge badge-outline">Mock Data Simulation</span>
    </div>

    <div class="result-car-banner">
      <img src="${imageUrl}" alt="${input.brand} ${input.model}" class="result-car-img" loading="lazy" />
      <div class="result-car-overlay">
        <div class="result-car-title">${input.brand} ${input.model} (${input.year})</div>
        <div class="result-car-tags">
          <span class="badge badge-subtle">⛽ ${input.fuelType}</span>
          <span class="badge badge-subtle">⚙️ ${input.transmission}</span>
          <span class="badge badge-subtle">📍 ${input.city}</span>
        </div>
      </div>
    </div>

    <div class="result-main">
      <div class="result-price-box">
        <span class="result-label">Estimated Resale Value</span>
        <div class="result-price-primary">${formatINR(result.predictedPrice)}</div>
        <div class="result-price-exact">${formatExactINR(result.predictedPrice)}</div>
        <div class="result-range">
          Likely Range: <strong>${formatINR(result.lowEstimate)}</strong> – <strong>${formatINR(result.highEstimate)}</strong>
        </div>
      </div>

      <div class="result-stats-grid">
        <div class="stat-box">
          <span class="stat-label">Confidence Rating</span>
          <div class="stat-value text-accent">${result.confidence}%</div>
          <div class="confidence-bar">
            <div class="confidence-fill" style="width: ${result.confidence}%"></div>
          </div>
        </div>

        <div class="stat-box">
          <span class="stat-label">Similar Cars Analyzed</span>
          <div class="stat-value">${result.similarCars} Records</div>
        </div>

        <div class="stat-box">
          <span class="stat-label">Algorithm Method</span>
          <div class="stat-value text-sm">${result.modelUsed}</div>
        </div>
      </div>
    </div>

    <div class="result-summary-box">
      <h4>Vehicle Parameters Evaluated:</h4>
      <div class="summary-pills">
        <span class="pill">🚗 ${input.brand} ${input.model}</span>
        <span class="pill">📅 Year: ${input.year}</span>
        <span class="pill">🛣️ ${input.kmDriven.toLocaleString("en-IN")} km</span>
        <span class="pill">⛽ ${input.fuelType}</span>
        <span class="pill">⚙️ ${input.transmission}</span>
        <span class="pill">👤 ${input.ownerCount} Owner(s)</span>
        <span class="pill">📍 ${input.city}</span>
      </div>
    </div>

    <div class="result-disclaimer">
      <p>⚠️ <strong>Disclaimer:</strong> This is a demo estimate calculated using simulated Random Forest logic on mock market data. It is for illustrative purposes only and does not represent a guaranteed market offer.</p>
    </div>

    <div class="result-actions">
      <button type="button" class="btn btn-primary" id="saveToComparisonBtnCard">
        📌 Save to Comparison
      </button>
      <button type="button" class="btn btn-secondary" id="viewSimilarCarsBtn">
        🔍 View Similar Cars (${result.similarCars})
      </button>
      <button type="button" class="btn btn-secondary" id="predictAgainBtnCard">
        🔄 New Prediction
      </button>
      <button type="button" class="btn btn-ghost" id="resetFormBtnCard">
        ❌ Reset Form
      </button>
    </div>
  `;

  // Attach inner event listeners
  document.getElementById("saveToComparisonBtnCard")?.addEventListener("click", () => {
    handleSaveToComparison(result);
  });

  document.getElementById("viewSimilarCarsBtn")?.addEventListener("click", () => {
    document.getElementById("similarCarsSection")?.scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("predictAgainBtnCard")?.addEventListener("click", () => {
    document.getElementById("predict")?.scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("resetFormBtnCard")?.addEventListener("click", resetPredictionForm);
}

/**
 * Render Similar Cars Comparison Grid with Images
 */
function renderSimilarCars(cars) {
  const container = document.getElementById("similarCarsSection");
  const listEl = document.getElementById("similarCarsContainer");

  if (!container || !listEl) return;

  if (!cars || cars.length === 0) {
    container.classList.add("hidden");
    return;
  }

  container.classList.remove("hidden");

  let html = `
    <div class="similar-header">
      <h3>Similar Cars Analyzed in Market Comparison</h3>
      <p>Found ${cars.length} matching vehicles in our mock database used for estimation</p>
    </div>
    <div class="similar-cars-grid">
  `;

  cars.forEach(car => {
    const carImg = getCarImageUrl(car);
    html += `
      <div class="similar-car-card">
        <div class="similar-car-img-wrapper">
          <img src="${carImg}" alt="${car.brand} ${car.model}" class="similar-car-img" loading="lazy" />
          <span class="similar-price-badge">${formatINR(car.resalePrice)}</span>
        </div>
        <div class="similar-car-body">
          <div class="similar-car-title">${car.brand} ${car.model}</div>
          <div class="similar-car-specs">
            <span class="badge badge-subtle">📅 ${car.year}</span>
            <span class="badge badge-subtle">🛣️ ${car.kmDriven.toLocaleString("en-IN")} km</span>
            <span class="badge badge-subtle">⛽ ${car.fuelType}</span>
            <span class="badge badge-subtle">⚙️ ${car.transmission}</span>
            <span class="badge badge-subtle">📍 ${car.city}</span>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;

  listEl.innerHTML = html;
}

/**
 * Render Dataset Summary Cards
 */
function renderDatasetSummary() {
  const summary = mockDatasetSummary;

  const totalRec = document.getElementById("summaryTotalRecords");
  const avgPrice = document.getElementById("summaryAvgPrice");
  const minPrice = document.getElementById("summaryMinPrice");
  const maxPrice = document.getElementById("summaryMaxPrice");
  const brandCount = document.getElementById("summaryBrandsCount");
  const fuelCount = document.getElementById("summaryFuelCount");

  if (totalRec) totalRec.textContent = summary.totalRecords;
  if (avgPrice) avgPrice.textContent = formatINR(summary.averagePrice);
  if (minPrice) minPrice.textContent = formatINR(summary.minimumPrice);
  if (maxPrice) maxPrice.textContent = formatINR(summary.maximumPrice);
  if (brandCount) brandCount.textContent = summary.availableBrands.length;
  if (fuelCount) fuelCount.textContent = summary.availableFuelTypes.length;
}

/**
 * Filter Dataset in Explorer
 */
function filterDataset() {
  const searchQuery = (document.getElementById("datasetSearch")?.value || "").toLowerCase().trim();
  const fuel = document.getElementById("filterFuel")?.value || "";
  const transmission = document.getElementById("filterTransmission")?.value || "";
  const city = document.getElementById("filterCity")?.value || "";

  filteredDataset = mockCars.filter(car => {
    const matchesSearch = !searchQuery || 
      car.brand.toLowerCase().includes(searchQuery) || 
      car.model.toLowerCase().includes(searchQuery);

    const matchesFuel = !fuel || car.fuelType === fuel;
    const matchesTrans = !transmission || car.transmission === transmission;
    const matchesCity = !city || car.city === city;

    return matchesSearch && matchesFuel && matchesTrans && matchesCity;
  });

  sortDataset(false);
  datasetDisplayLimit = 20;
  renderDatasetTable();
}

/**
 * Sort Dataset
 */
function sortDataset(shouldRender = true) {
  const sortValue = document.getElementById("sortSelect")?.value || "price-desc";

  filteredDataset.sort((a, b) => {
    switch (sortValue) {
      case "price-asc": return a.resalePrice - b.resalePrice;
      case "price-desc": return b.resalePrice - a.resalePrice;
      case "year-desc": return b.year - a.year;
      case "year-asc": return a.year - b.year;
      case "km-asc": return a.kmDriven - b.kmDriven;
      default: return 0;
    }
  });

  if (shouldRender) {
    datasetDisplayLimit = 20;
    renderDatasetTable();
  }
}

/**
 * Render Dataset Explorer Table
 */
function renderDatasetTable() {
  const tbody = document.getElementById("datasetTbody");
  const countEl = document.getElementById("datasetRecordCount");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (!tbody) return;

  const visibleRecords = filteredDataset.slice(0, datasetDisplayLimit);

  if (countEl) {
    countEl.textContent = `Showing ${visibleRecords.length} of ${filteredDataset.length} records`;
  }

  if (visibleRecords.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="text-center py-8 text-muted">
          🚫 No car records found matching your filters.
        </td>
      </tr>
    `;
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
    return;
  }

  tbody.innerHTML = visibleRecords.map(car => `
    <tr>
      <td>#${car.id}</td>
      <td>
        <div class="table-car-cell">
          <img src="${getCarImageUrl(car)}" alt="${car.brand} ${car.model}" class="table-car-thumb" loading="lazy" />
          <span><strong>${car.brand} ${car.model}</strong></span>
        </div>
      </td>
      <td>${car.year}</td>
      <td>${car.kmDriven.toLocaleString("en-IN")} km</td>
      <td><span class="badge badge-subtle">${car.fuelType}</span></td>
      <td>${car.transmission}</td>
      <td>${car.ownerCount} Owner</td>
      <td>${car.city}</td>
      <td><strong class="text-primary">${formatINR(car.resalePrice)}</strong></td>
    </tr>
  `).join("");

  if (loadMoreBtn) {
    if (datasetDisplayLimit >= filteredDataset.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-flex";
    }
  }
}

/**
 * Chart.js Model Performance Visualization
 */
function initModelPerformanceChart() {
  const ctx = document.getElementById("performanceChart");
  if (!ctx) return;

  // Check if Chart.js is loaded from CDN
  if (typeof Chart === "undefined") {
    console.warn("Chart.js CDN not available, skipping chart rendering.");
    return;
  }

  if (performanceChart) {
    performanceChart.destroy();
  }

  performanceChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Linear Regression", "Random Forest (Active)"],
      datasets: [
        {
          label: "MAE (₹ - Lower is Better)",
          data: [82500, 54300],
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderColor: "#3b82f6",
          borderWidth: 1
        },
        {
          label: "RMSE (₹ - Lower is Better)",
          data: [118400, 79600],
          backgroundColor: "rgba(245, 158, 11, 0.8)",
          borderColor: "#f59e0b",
          borderWidth: 1
        },
        {
          label: "R² Accuracy Score (% x 10k)",
          data: [78000, 89000],
          backgroundColor: "rgba(16, 185, 129, 0.8)",
          borderColor: "#10b981",
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: { color: "var(--text-color)" }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              if (context.datasetIndex < 2) {
                return `${context.dataset.label}: ₹${context.raw.toLocaleString("en-IN")}`;
              } else {
                return `R² Score: ${(context.raw / 100000).toFixed(2)}`;
              }
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: "var(--text-color)" },
          grid: { color: "var(--border-color)" }
        },
        y: {
          ticks: {
            color: "var(--text-color)",
            callback: function(val) {
              return "₹" + (val / 1000).toFixed(0) + "k";
            }
          },
          grid: { color: "var(--border-color)" }
        }
      }
    }
  });
}

/**
 * Reset Prediction Form
 */
function resetPredictionForm() {
  const form = document.getElementById("predictionForm");
  if (form) form.reset();

  const modelSelect = document.getElementById("modelSelect");
  if (modelSelect) {
    modelSelect.innerHTML = `<option value="">Select Model *</option>`;
    modelSelect.disabled = true;
  }

  // Clear validation errors
  document.querySelectorAll(".error-message").forEach(el => {
    el.textContent = "";
    el.classList.add("hidden");
  });
  document.querySelectorAll(".input-error").forEach(el => {
    el.classList.remove("input-error");
  });

  // Hide results
  document.getElementById("predictionResultCard")?.classList.add("hidden");
  document.getElementById("similarCarsSection")?.classList.add("hidden");

  localStorage.removeItem("autovalue_last_form");
  localStorage.removeItem("autovalue_last_prediction");

  showToast("Form reset to default values", "info");
}

/**
 * Loading Animation Handlers
 */
function showLoading() {
  const loader = document.getElementById("loadingOverlay");
  if (loader) loader.classList.remove("hidden");
}

function hideLoading() {
  const loader = document.getElementById("loadingOverlay");
  if (loader) loader.classList.add("hidden");
}

/**
 * Toast Notification System
 */
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const iconMap = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️"
  };

  toast.innerHTML = `
    <span class="toast-icon">${iconMap[type] || "ℹ️"}</span>
    <span class="toast-msg">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("toast-show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

/**
 * LocalStorage Helpers
 */
function saveFormData(data) {
  try {
    localStorage.setItem("autovalue_last_form", JSON.stringify(data));
  } catch (e) {
    console.warn("Could not save form data to localStorage", e);
  }
}

function saveLastPrediction(result) {
  try {
    localStorage.setItem("autovalue_last_prediction", JSON.stringify(result));
  } catch (e) {
    console.warn("Could not save prediction result to localStorage", e);
  }
}

function restoreSavedFormValues() {
  try {
    const savedForm = localStorage.getItem("autovalue_last_form");
    if (savedForm) {
      const data = JSON.parse(savedForm);
      if (data.brand) {
        document.getElementById("brandSelect").value = data.brand;
        populateModelOptions(data.brand);
        if (data.model) document.getElementById("modelSelect").value = data.model;
      }
      if (data.year) document.getElementById("yearInput").value = data.year;
      if (data.kmDriven !== undefined) document.getElementById("kmInput").value = data.kmDriven;
      if (data.fuelType) document.getElementById("fuelSelect").value = data.fuelType;
      if (data.transmission) document.getElementById("transmissionSelect").value = data.transmission;
      if (data.ownerCount !== undefined) document.getElementById("ownerInput").value = data.ownerCount;
      if (data.sellerType) document.getElementById("sellerSelect").value = data.sellerType;
      if (data.engineCC) document.getElementById("engineInput").value = data.engineCC;
      if (data.mileage) document.getElementById("mileageInput").value = data.mileage;
      if (data.city) document.getElementById("citySelect").value = data.city;
    }

    const savedPrediction = localStorage.getItem("autovalue_last_prediction");
    if (savedPrediction) {
      const result = JSON.parse(savedPrediction);
      renderPredictionResult(result);
      if (result.similarCarList) {
        renderSimilarCars(result.similarCarList);
      }
    }
  } catch (e) {
    console.warn("Could not restore state from localStorage", e);
  }
}

/**
 * SAVED COMPARISONS & SCENARIO MATRIX ENGINE
 */
let comparisonIndexA = 0;
let comparisonIndexB = 1;

function getSavedComparisons() {
  try {
    const raw = localStorage.getItem("autovalue_saved_comparisons");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("Could not load saved comparisons from localStorage", e);
    return [];
  }
}

function saveSavedComparisons(list) {
  try {
    localStorage.setItem("autovalue_saved_comparisons", JSON.stringify(list));
  } catch (e) {
    console.warn("Could not save comparisons to localStorage", e);
  }
}

function handleSaveToComparison(result) {
  if (!result || !result.inputSummary) {
    showToast("No active prediction result available to save.", "warning");
    return;
  }

  const list = getSavedComparisons();
  const input = result.inputSummary;

  // Check for duplicate parameters
  const isDuplicate = list.some(item =>
    item.inputSummary.brand === input.brand &&
    item.inputSummary.model === input.model &&
    item.inputSummary.year === input.year &&
    item.inputSummary.kmDriven === input.kmDriven &&
    item.inputSummary.fuelType === input.fuelType &&
    item.inputSummary.transmission === input.transmission
  );

  if (isDuplicate) {
    showToast(`${input.brand} ${input.model} is already saved in your comparisons!`, "info");
    document.getElementById("comparison")?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const newItem = {
    id: "comp_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    timestamp: new Date().toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' }),
    predictedPrice: result.predictedPrice,
    lowEstimate: result.lowEstimate,
    highEstimate: result.highEstimate,
    confidence: result.confidence,
    similarCars: result.similarCars,
    modelUsed: result.modelUsed,
    inputSummary: { ...input }
  };

  list.unshift(newItem);
  saveSavedComparisons(list);

  // Auto select newly saved item as Scenario A
  comparisonIndexA = 0;
  comparisonIndexB = list.length > 1 ? 1 : 0;

  renderSavedComparisons();

  showToast(`Saved ${input.brand} ${input.model} (${input.year}) to Comparisons!`, "success");

  document.getElementById("comparison")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteSavedComparison(id) {
  let list = getSavedComparisons();
  const deletedItem = list.find(item => item.id === id);
  list = list.filter(item => item.id !== id);
  saveSavedComparisons(list);

  if (comparisonIndexA >= list.length) comparisonIndexA = Math.max(0, list.length - 1);
  if (comparisonIndexB >= list.length) comparisonIndexB = Math.max(0, list.length - 1);
  if (comparisonIndexA === comparisonIndexB && list.length > 1) {
    comparisonIndexB = (comparisonIndexA + 1) % list.length;
  }

  renderSavedComparisons();
  if (deletedItem) {
    showToast(`Removed ${deletedItem.inputSummary.brand} ${deletedItem.inputSummary.model} from saved list.`, "info");
  }
}

function clearAllSavedComparisons() {
  localStorage.removeItem("autovalue_saved_comparisons");
  comparisonIndexA = 0;
  comparisonIndexB = 1;
  renderSavedComparisons();
  showToast("Cleared all saved car comparisons.", "info");
}

function seedSampleComparisons() {
  const sample1 = {
    brand: "Hyundai",
    model: "i20",
    year: 2022,
    kmDriven: 25000,
    fuelType: "Petrol",
    transmission: "Automatic",
    ownerCount: 1,
    sellerType: "Individual",
    engineCC: 1197,
    mileage: 19.6,
    city: "Bengaluru"
  };

  const sample2 = {
    brand: "Maruti",
    model: "Swift",
    year: 2019,
    kmDriven: 58000,
    fuelType: "Petrol",
    transmission: "Manual",
    ownerCount: 2,
    sellerType: "Individual",
    engineCC: 1197,
    mileage: 21.2,
    city: "Bengaluru"
  };

  const pred1 = predictCarPrice(sample1);
  const pred2 = predictCarPrice(sample2);

  const item1 = {
    id: "sample_1_" + Date.now(),
    timestamp: "Sample Scenario A",
    predictedPrice: pred1.predictedPrice,
    lowEstimate: pred1.lowEstimate,
    highEstimate: pred1.highEstimate,
    confidence: pred1.confidence,
    similarCars: pred1.similarCars,
    modelUsed: pred1.modelUsed,
    inputSummary: sample1
  };

  const item2 = {
    id: "sample_2_" + Date.now(),
    timestamp: "Sample Scenario B",
    predictedPrice: pred2.predictedPrice,
    lowEstimate: pred2.lowEstimate,
    highEstimate: pred2.highEstimate,
    confidence: pred2.confidence,
    similarCars: pred2.similarCars,
    modelUsed: pred2.modelUsed,
    inputSummary: sample2
  };

  saveSavedComparisons([item1, item2]);
  comparisonIndexA = 0;
  comparisonIndexB = 1;
  renderSavedComparisons();
  showToast("Loaded 2 sample car scenarios into Saved Comparisons!", "success");
}

function loadSavedIntoForm(item) {
  if (!item || !item.inputSummary) return;
  const input = item.inputSummary;

  const brandSelect = document.getElementById("brandSelect");
  if (brandSelect) {
    brandSelect.value = input.brand;
    populateModelOptions(input.brand);
    const modelSelect = document.getElementById("modelSelect");
    if (modelSelect) modelSelect.value = input.model;
  }

  if (input.year) document.getElementById("yearInput").value = input.year;
  if (input.kmDriven !== undefined) document.getElementById("kmInput").value = input.kmDriven;
  if (input.fuelType) document.getElementById("fuelSelect").value = input.fuelType;
  if (input.transmission) document.getElementById("transmissionSelect").value = input.transmission;
  if (input.ownerCount !== undefined) document.getElementById("ownerInput").value = input.ownerCount;
  if (input.sellerType) document.getElementById("sellerSelect").value = input.sellerType;
  if (input.engineCC) document.getElementById("engineInput").value = input.engineCC;
  if (input.mileage) document.getElementById("mileageInput").value = input.mileage;
  if (input.city) document.getElementById("citySelect").value = input.city;

  showToast(`Loaded ${input.brand} ${input.model} parameters into form.`, "info");
  document.getElementById("predict")?.scrollIntoView({ behavior: "smooth" });
}

function renderSavedComparisons() {
  const container = document.getElementById("comparisonContainer");
  if (!container) return;

  const list = getSavedComparisons();

  if (list.length === 0) {
    container.innerHTML = `
      <div class="comparison-empty-box">
        <div class="comparison-empty-icon">🚗💡</div>
        <h3>No Saved Car Valuations Yet</h3>
        <p class="text-muted" style="max-width: 520px; font-size: 0.95rem;">
          Predict car prices using the valuation form above and click <strong>"📌 Save to Comparison"</strong> to compare different vehicle configurations side-by-side.
        </p>
        <div style="margin-top: 0.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center;">
          <button type="button" class="btn btn-primary" id="seedSampleBtn">
            ⚡ Load 2 Sample Scenarios for Demo
          </button>
          <a href="#predict" class="btn btn-secondary">
            🚀 Predict First Car
          </a>
        </div>
      </div>
    `;

    document.getElementById("seedSampleBtn")?.addEventListener("click", seedSampleComparisons);
    return;
  }

  if (list.length === 1) {
    const single = list[0];
    const input = single.inputSummary;
    const imgUrl = getCarImageUrl(input);

    container.innerHTML = `
      <div class="comparison-toolbar">
        <div class="comparison-select-group">
          <span>📌 <strong>1 Saved Valuation</strong> (${input.brand} ${input.model})</span>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button type="button" class="btn btn-secondary btn-sm" id="seedSampleBtn1">
            ⚡ Add 2nd Sample Car
          </button>
          <button type="button" class="btn btn-ghost btn-sm" id="clearSavedBtn">
            🗑️ Clear Saved
          </button>
        </div>
      </div>

      <div class="comparison-grid">
        <!-- Card 1 -->
        <div class="comparison-card card-scenario-a">
          <div class="comparison-card-image-wrapper">
            <img src="${imgUrl}" alt="${input.brand} ${input.model}" class="comparison-card-img" loading="lazy" />
          </div>

          <div class="comparison-card-header">
            <div>
              <span class="badge badge-primary">Scenario 1</span>
              <div class="comparison-car-title">${input.brand} ${input.model}</div>
              <div class="comparison-car-subtitle">Saved at ${single.timestamp}</div>
            </div>
            <button type="button" class="btn btn-ghost btn-sm delete-single-btn" data-id="${single.id}" title="Remove">❌</button>
          </div>

          <div class="comparison-price-container">
            <span class="stat-label">Estimated Price</span>
            <div class="comparison-price-main">${formatINR(single.predictedPrice)}</div>
            <div class="comparison-price-range">Range: ${formatINR(single.lowEstimate)} – ${formatINR(single.highEstimate)}</div>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600;">
              <span>Confidence Rating</span>
              <span class="text-accent">${single.confidence}%</span>
            </div>
            <div class="confidence-bar">
              <div class="confidence-fill" style="width: ${single.confidence}%"></div>
            </div>
          </div>

          <table class="comparison-params-table">
            <tbody>
              <tr><td>Year</td><td>${input.year}</td></tr>
              <tr><td>Kilometres</td><td>${input.kmDriven.toLocaleString("en-IN")} km</td></tr>
              <tr><td>Fuel Type</td><td>${input.fuelType}</td></tr>
              <tr><td>Transmission</td><td>${input.transmission}</td></tr>
              <tr><td>Owners</td><td>${input.ownerCount} Owner(s)</td></tr>
              <tr><td>City</td><td>${input.city}</td></tr>
            </tbody>
          </table>

          <div class="comparison-actions">
            <button type="button" class="btn btn-secondary btn-block load-saved-btn" data-id="${single.id}">
              🔄 Load into Form
            </button>
          </div>
        </div>

        <!-- Card 2 Placeholder -->
        <div class="comparison-empty-box" style="padding: 2rem;">
          <div style="font-size: 2.2rem;">➕</div>
          <h4 style="margin: 0.4rem 0;">Save 1 More Scenario</h4>
          <p class="text-muted" style="font-size: 0.88rem;">
            Fill out the valuation form above with a different car model or year and click "Save to Comparison" to render side-by-side differences!
          </p>
          <button type="button" class="btn btn-primary" id="seedSampleBtn2" style="margin-top: 0.5rem;">
            ⚡ Quick Load 2nd Sample Car
          </button>
        </div>
      </div>
    `;

    document.getElementById("seedSampleBtn1")?.addEventListener("click", seedSampleComparisons);
    document.getElementById("seedSampleBtn2")?.addEventListener("click", seedSampleComparisons);
    document.getElementById("clearSavedBtn")?.addEventListener("click", clearAllSavedComparisons);

    document.querySelectorAll(".delete-single-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        deleteSavedComparison(id);
      });
    });

    document.querySelectorAll(".load-saved-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        const item = list.find(i => i.id === id);
        if (item) loadSavedIntoForm(item);
      });
    });

    return;
  }

  // list.length >= 2
  if (comparisonIndexA >= list.length) comparisonIndexA = 0;
  if (comparisonIndexB >= list.length) comparisonIndexB = 1;
  if (comparisonIndexA === comparisonIndexB) {
    comparisonIndexB = (comparisonIndexA + 1) % list.length;
  }

  const carA = list[comparisonIndexA];
  const carB = list[comparisonIndexB];

  const inputA = carA.inputSummary;
  const inputB = carB.inputSummary;
  const imgUrlA = getCarImageUrl(inputA);
  const imgUrlB = getCarImageUrl(inputB);

  // Calculate Price Difference
  const priceDiff = carA.predictedPrice - carB.predictedPrice;
  const priceDiffAbs = Math.abs(priceDiff);
  const priceDiffPct = carB.predictedPrice > 0 ? ((priceDiff / carB.predictedPrice) * 100).toFixed(1) : "0.0";

  // Calculate Confidence Difference
  const confDiff = carA.confidence - carB.confidence;

  let toolbarHTML = `
    <div class="comparison-toolbar">
      <div class="comparison-select-group">
        <label for="selectCompareA">Scenario A:</label>
        <select id="selectCompareA" class="form-control" style="width: auto; display: inline-block;">
          ${list.map((item, idx) => `
            <option value="${idx}" ${idx === comparisonIndexA ? "selected" : ""}>
              ${item.inputSummary.brand} ${item.inputSummary.model} (${item.inputSummary.year}) - ${formatINR(item.predictedPrice)}
            </option>
          `).join("")}
        </select>

        <span style="font-weight: 700; color: var(--text-muted); padding: 0 0.3rem;">VS</span>

        <label for="selectCompareB">Scenario B:</label>
        <select id="selectCompareB" class="form-control" style="width: auto; display: inline-block;">
          ${list.map((item, idx) => `
            <option value="${idx}" ${idx === comparisonIndexB ? "selected" : ""}>
              ${item.inputSummary.brand} ${item.inputSummary.model} (${item.inputSummary.year}) - ${formatINR(item.predictedPrice)}
            </option>
          `).join("")}
        </select>
      </div>

      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <span class="badge badge-subtle">${list.length} Saved</span>
        <button type="button" class="btn btn-ghost btn-sm" id="clearAllSavedBtn">
          🗑️ Clear All
        </button>
      </div>
    </div>
  `;

  // Delta Summary Banner
  let priceDeltaText = "";
  if (priceDiff > 0) {
    priceDeltaText = `<span class="text-accent">Scenario A is ${formatINR(priceDiffAbs)} (+${priceDiffPct}%) higher</span> than Scenario B`;
  } else if (priceDiff < 0) {
    priceDeltaText = `<span style="color: var(--accent-orange)">Scenario A is ${formatINR(priceDiffAbs)} (${priceDiffPct}%) lower</span> than Scenario B`;
  } else {
    priceDeltaText = `<span>Scenario A and Scenario B have identical estimated values</span>`;
  }

  let confDeltaText = "";
  if (confDiff > 0) {
    confDeltaText = `<span class="text-accent">Scenario A has +${confDiff}% higher confidence</span> (${carA.confidence}% vs ${carB.confidence}%)`;
  } else if (confDiff < 0) {
    confDeltaText = `<span style="color: var(--accent-orange)">Scenario B has +${Math.abs(confDiff)}% higher confidence</span> (${carB.confidence}% vs ${carA.confidence}%)`;
  } else {
    confDeltaText = `<span>Both scenarios have equal ${carA.confidence}% confidence score</span>`;
  }

  let deltaBannerHTML = `
    <div class="comparison-delta-banner">
      <div class="delta-stat">
        <span class="delta-stat-label">💰 Valuation Price Delta</span>
        <div class="delta-stat-value">${priceDeltaText}</div>
      </div>
      <div class="delta-stat">
        <span class="delta-stat-label">📊 Model Confidence Analysis</span>
        <div class="delta-stat-value">${confDeltaText}</div>
      </div>
    </div>
  `;

  // Parameter difference checks for table row highlighting
  const isYearDiff = inputA.year !== inputB.year;
  const isKmDiff = inputA.kmDriven !== inputB.kmDriven;
  const isFuelDiff = inputA.fuelType !== inputB.fuelType;
  const isTransDiff = inputA.transmission !== inputB.transmission;
  const isOwnerDiff = inputA.ownerCount !== inputB.ownerCount;
  const isCityDiff = inputA.city !== inputB.city;

  // Card A Delta Badges
  const priceDeltaBadgeA = priceDiff > 0
    ? `<span class="comparison-delta-tag delta-tag-green">▲ +${formatINR(priceDiffAbs)} (+${priceDiffPct}%) vs Scenario B</span>`
    : priceDiff < 0
    ? `<span class="comparison-delta-tag delta-tag-orange">▼ -${formatINR(priceDiffAbs)} (${priceDiffPct}%) vs Scenario B</span>`
    : `<span class="comparison-delta-tag delta-tag-neutral">Equal Price</span>`;

  // Card B Delta Badges
  const priceDeltaBadgeB = priceDiff < 0
    ? `<span class="comparison-delta-tag delta-tag-green">▲ +${formatINR(priceDiffAbs)} (+${Math.abs(priceDiffPct)}%) vs Scenario A</span>`
    : priceDiff > 0
    ? `<span class="comparison-delta-tag delta-tag-orange">▼ -${formatINR(priceDiffAbs)} (-${priceDiffPct}%) vs Scenario A</span>`
    : `<span class="comparison-delta-tag delta-tag-neutral">Equal Price</span>`;

  const confBadgeA = confDiff > 0
    ? `<span class="diff-tag diff-green">+${confDiff}% higher</span>`
    : confDiff < 0
    ? `<span class="diff-tag diff-orange">-${Math.abs(confDiff)}% lower</span>`
    : ``;

  const confBadgeB = confDiff < 0
    ? `<span class="diff-tag diff-green">+${Math.abs(confDiff)}% higher</span>`
    : confDiff > 0
    ? `<span class="diff-tag diff-orange">-${confDiff}% lower</span>`
    : ``;

  // Explicit winner indicators
  const winnerBadgeA = `
    ${priceDiff > 0 ? `<span class="indicator-badge badge-higher-price">🏆 Higher Valuation</span>` : ''}
    ${confDiff > 0 ? `<span class="indicator-badge badge-higher-conf">⭐ Better Confidence</span>` : ''}
  `;

  const winnerBadgeB = `
    ${priceDiff < 0 ? `<span class="indicator-badge badge-higher-price">🏆 Higher Valuation</span>` : ''}
    ${confDiff < 0 ? `<span class="indicator-badge badge-higher-conf">⭐ Better Confidence</span>` : ''}
  `;

  let gridHTML = `
    <div class="comparison-grid">
      <!-- Card Scenario A -->
      <div class="comparison-card card-scenario-a">
        <div class="comparison-card-image-wrapper">
          <img src="${imgUrlA}" alt="${inputA.brand} ${inputA.model}" class="comparison-card-img" loading="lazy" />
          <div class="comparison-image-badges">
            ${winnerBadgeA}
          </div>
        </div>

        <div class="comparison-card-header">
          <div>
            <span class="badge badge-primary">Scenario A</span>
            <div class="comparison-car-title">${inputA.brand} ${inputA.model}</div>
            <div class="comparison-car-subtitle">Year ${inputA.year} • ${inputA.fuelType}</div>
          </div>
          <button type="button" class="btn btn-ghost btn-sm delete-saved-btn" data-id="${carA.id}" title="Remove Car A">❌</button>
        </div>

        <div class="comparison-price-container">
          <span class="stat-label">Estimated Resale Price</span>
          <div class="comparison-price-main">${formatINR(carA.predictedPrice)}</div>
          <div class="comparison-price-range">Range: ${formatINR(carA.lowEstimate)} – ${formatINR(carA.highEstimate)}</div>
          <div>${priceDeltaBadgeA}</div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600;">
            <span>Confidence Rating ${confBadgeA}</span>
            <span class="text-accent">${carA.confidence}%</span>
          </div>
          <div class="confidence-bar">
            <div class="confidence-fill" style="width: ${carA.confidence}%"></div>
          </div>
        </div>

        <table class="comparison-params-table">
          <tbody>
            <tr class="${isYearDiff ? 'param-differ' : ''}">
              <td>Manufacturing Year</td>
              <td>
                ${inputA.year}
                ${isYearDiff ? (inputA.year > inputB.year ? `<span class="diff-tag diff-green">+${inputA.year - inputB.year} yrs newer</span>` : `<span class="diff-tag diff-orange">${inputB.year - inputA.year} yrs older</span>`) : ''}
              </td>
            </tr>
            <tr class="${isKmDiff ? 'param-differ' : ''}">
              <td>Kilometres Driven</td>
              <td>
                ${inputA.kmDriven.toLocaleString("en-IN")} km
                ${isKmDiff ? (inputA.kmDriven < inputB.kmDriven ? `<span class="diff-tag diff-green">${(inputB.kmDriven - inputA.kmDriven).toLocaleString("en-IN")} km less</span>` : `<span class="diff-tag diff-orange">${(inputA.kmDriven - inputB.kmDriven).toLocaleString("en-IN")} km more</span>`) : ''}
              </td>
            </tr>
            <tr class="${isFuelDiff ? 'param-differ' : ''}">
              <td>Fuel Variant</td>
              <td>${inputA.fuelType} ${isFuelDiff ? `<span class="diff-tag diff-blue">Differs</span>` : ''}</td>
            </tr>
            <tr class="${isTransDiff ? 'param-differ' : ''}">
              <td>Transmission</td>
              <td>${inputA.transmission} ${isTransDiff ? `<span class="diff-tag diff-blue">Differs</span>` : ''}</td>
            </tr>
            <tr class="${isOwnerDiff ? 'param-differ' : ''}">
              <td>Owner Count</td>
              <td>${inputA.ownerCount} Owner(s) ${isOwnerDiff ? `<span class="diff-tag diff-blue">Differs</span>` : ''}</td>
            </tr>
            <tr class="${isCityDiff ? 'param-differ' : ''}">
              <td>City Location</td>
              <td>${inputA.city} ${isCityDiff ? `<span class="diff-tag diff-blue">Differs</span>` : ''}</td>
            </tr>
          </tbody>
        </table>

        <div class="comparison-actions">
          <button type="button" class="btn btn-secondary btn-block load-saved-btn" data-id="${carA.id}">
            🔄 Load into Form to Modify
          </button>
        </div>
      </div>

      <!-- Card Scenario B -->
      <div class="comparison-card card-scenario-b">
        <div class="comparison-card-image-wrapper">
          <img src="${imgUrlB}" alt="${inputB.brand} ${inputB.model}" class="comparison-card-img" loading="lazy" />
          <div class="comparison-image-badges">
            ${winnerBadgeB}
          </div>
        </div>

        <div class="comparison-card-header">
          <div>
            <span class="badge badge-outline" style="border-color: #8b5cf6; color: #a78bfa;">Scenario B</span>
            <div class="comparison-car-title">${inputB.brand} ${inputB.model}</div>
            <div class="comparison-car-subtitle">Year ${inputB.year} • ${inputB.fuelType}</div>
          </div>
          <button type="button" class="btn btn-ghost btn-sm delete-saved-btn" data-id="${carB.id}" title="Remove Car B">❌</button>
        </div>

        <div class="comparison-price-container">
          <span class="stat-label">Estimated Resale Price</span>
          <div class="comparison-price-main">${formatINR(carB.predictedPrice)}</div>
          <div class="comparison-price-range">Range: ${formatINR(carB.lowEstimate)} – ${formatINR(carB.highEstimate)}</div>
          <div>${priceDeltaBadgeB}</div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600;">
            <span>Confidence Rating ${confBadgeB}</span>
            <span class="text-accent">${carB.confidence}%</span>
          </div>
          <div class="confidence-bar">
            <div class="confidence-fill" style="width: ${carB.confidence}%"></div>
          </div>
        </div>

        <table class="comparison-params-table">
          <tbody>
            <tr class="${isYearDiff ? 'param-differ' : ''}">
              <td>Manufacturing Year</td>
              <td>
                ${inputB.year}
                ${isYearDiff ? (inputB.year > inputA.year ? `<span class="diff-tag diff-green">+${inputB.year - inputA.year} yrs newer</span>` : `<span class="diff-tag diff-orange">${inputA.year - inputB.year} yrs older</span>`) : ''}
              </td>
            </tr>
            <tr class="${isKmDiff ? 'param-differ' : ''}">
              <td>Kilometres Driven</td>
              <td>
                ${inputB.kmDriven.toLocaleString("en-IN")} km
                ${isKmDiff ? (inputB.kmDriven < inputA.kmDriven ? `<span class="diff-tag diff-green">${(inputA.kmDriven - inputB.kmDriven).toLocaleString("en-IN")} km less</span>` : `<span class="diff-tag diff-orange">${(inputB.kmDriven - inputA.kmDriven).toLocaleString("en-IN")} km more</span>`) : ''}
              </td>
            </tr>
            <tr class="${isFuelDiff ? 'param-differ' : ''}">
              <td>Fuel Variant</td>
              <td>${inputB.fuelType} ${isFuelDiff ? `<span class="diff-tag diff-blue">Differs</span>` : ''}</td>
            </tr>
            <tr class="${isTransDiff ? 'param-differ' : ''}">
              <td>Transmission</td>
              <td>${inputB.transmission} ${isTransDiff ? `<span class="diff-tag diff-blue">Differs</span>` : ''}</td>
            </tr>
            <tr class="${isOwnerDiff ? 'param-differ' : ''}">
              <td>Owner Count</td>
              <td>${inputB.ownerCount} Owner(s) ${isOwnerDiff ? `<span class="diff-tag diff-blue">Differs</span>` : ''}</td>
            </tr>
            <tr class="${isCityDiff ? 'param-differ' : ''}">
              <td>City Location</td>
              <td>${inputB.city} ${isCityDiff ? `<span class="diff-tag diff-blue">Differs</span>` : ''}</td>
            </tr>
          </tbody>
        </table>

        <div class="comparison-actions">
          <button type="button" class="btn btn-secondary btn-block load-saved-btn" data-id="${carB.id}">
            🔄 Load into Form to Modify
          </button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = toolbarHTML + deltaBannerHTML + gridHTML;

  document.getElementById("selectCompareA")?.addEventListener("change", (e) => {
    comparisonIndexA = parseInt(e.target.value, 10);
    renderSavedComparisons();
  });

  document.getElementById("selectCompareB")?.addEventListener("change", (e) => {
    comparisonIndexB = parseInt(e.target.value, 10);
    renderSavedComparisons();
  });

  document.getElementById("clearAllSavedBtn")?.addEventListener("click", clearAllSavedComparisons);

  document.querySelectorAll(".delete-saved-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");
      deleteSavedComparison(id);
    });
  });

  document.querySelectorAll(".load-saved-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");
      const item = list.find(i => i.id === id);
      if (item) loadSavedIntoForm(item);
    });
  });
}
