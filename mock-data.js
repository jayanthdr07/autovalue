/**
 * AutoValue AI - Mock Dataset
 * Contains realistic used car records across Indian cities and brands.
 */

const mockCars = [
  { id: 1, brand: "Maruti", model: "Swift", year: 2018, kmDriven: 45000, fuelType: "Petrol", transmission: "Manual", ownerCount: 1, sellerType: "Individual", engineCC: 1197, mileage: 20.4, city: "Bengaluru", resalePrice: 525000, image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80" },
  { id: 2, brand: "Hyundai", model: "i20", year: 2019, kmDriven: 38000, fuelType: "Petrol", transmission: "Manual", ownerCount: 1, sellerType: "Dealer", engineCC: 1197, mileage: 19.8, city: "Mumbai", resalePrice: 610000, image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80" },
  { id: 3, brand: "Tata", model: "Nexon", year: 2021, kmDriven: 25000, fuelType: "Diesel", transmission: "Automatic", ownerCount: 1, sellerType: "Individual", engineCC: 1497, mileage: 21.5, city: "Delhi", resalePrice: 890000, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80" },
  { id: 4, brand: "Honda", model: "City", year: 2017, kmDriven: 62000, fuelType: "Petrol", transmission: "Manual", ownerCount: 2, sellerType: "Dealer", engineCC: 1498, mileage: 17.8, city: "Bengaluru", resalePrice: 580000, image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80" },
  { id: 5, brand: "Toyota", model: "Innova Crysta", year: 2020, kmDriven: 50000, fuelType: "Diesel", transmission: "Automatic", ownerCount: 1, sellerType: "Trustmark Dealer", engineCC: 2393, mileage: 15.1, city: "Hyderabad", resalePrice: 1850000, image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80" },
  { id: 6, brand: "Kia", model: "Seltos", year: 2021, kmDriven: 28000, fuelType: "Petrol", transmission: "Automatic", ownerCount: 1, sellerType: "Dealer", engineCC: 1497, mileage: 16.5, city: "Chennai", resalePrice: 1180000, image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80" },
  { id: 7, brand: "Mahindra", model: "Thar", year: 2022, kmDriven: 18000, fuelType: "Diesel", transmission: "Automatic", ownerCount: 1, sellerType: "Individual", engineCC: 2184, mileage: 15.2, city: "Pune", resalePrice: 1420000, image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=600&q=80" },
  { id: 8, brand: "Renault", model: "Kwid", year: 2018, kmDriven: 35000, fuelType: "Petrol", transmission: "Manual", ownerCount: 1, sellerType: "Individual", engineCC: 999, mileage: 22.3, city: "Ahmedabad", resalePrice: 295000, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80" },
  { id: 9, brand: "Volkswagen", model: "Polo", year: 2016, kmDriven: 70000, fuelType: "Petrol", transmission: "Manual", ownerCount: 2, sellerType: "Dealer", engineCC: 1198, mileage: 16.4, city: "Kolkata", resalePrice: 380000, image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80" },
  { id: 10, brand: "Ford", model: "EcoSport", year: 2019, kmDriven: 42000, fuelType: "Diesel", transmission: "Manual", ownerCount: 1, sellerType: "Individual", engineCC: 1498, mileage: 21.7, city: "Jaipur", resalePrice: 675000, image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" },

  { id: 11, brand: "Maruti", model: "Baleno", year: 2020, kmDriven: 31000, fuelType: "Petrol", transmission: "Automatic", ownerCount: 1, sellerType: "Trustmark Dealer", engineCC: 1197, mileage: 22.35, city: "Bengaluru", resalePrice: 685000, image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80" },
  { id: 12, brand: "Hyundai", model: "Creta", year: 2020, kmDriven: 36000, fuelType: "Diesel", transmission: "Automatic", ownerCount: 1, sellerType: "Dealer", engineCC: 1493, mileage: 18.5, city: "Delhi", resalePrice: 1240000, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80" },
  { id: 13, brand: "Tata", model: "Harrier", year: 2021, kmDriven: 30000, fuelType: "Diesel", transmission: "Automatic", ownerCount: 1, sellerType: "Individual", engineCC: 1956, mileage: 16.3, city: "Chandigarh", resalePrice: 1580000, image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80" },
  { id: 14, brand: "Honda", model: "Amaze", year: 2019, kmDriven: 41000, fuelType: "Diesel", transmission: "Automatic", ownerCount: 1, sellerType: "Dealer", engineCC: 1498, mileage: 23.8, city: "Pune", resalePrice: 590000, image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80" },
  { id: 15, brand: "Toyota", model: "Fortuner", year: 2019, kmDriven: 65000, fuelType: "Diesel", transmission: "Automatic", ownerCount: 1, sellerType: "Trustmark Dealer", engineCC: 2755, mileage: 12.0, city: "Mumbai", resalePrice: 2850000, image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80" },
  { id: 16, brand: "Kia", model: "Sonet", year: 2022, kmDriven: 15000, fuelType: "Petrol", transmission: "Automatic", ownerCount: 1, sellerType: "Individual", engineCC: 998, mileage: 18.2, city: "Bengaluru", resalePrice: 945000, image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80" },
  { id: 17, brand: "Mahindra", model: "XUV700", year: 2022, kmDriven: 22000, fuelType: "Diesel", transmission: "Automatic", ownerCount: 1, sellerType: "Dealer", engineCC: 2184, mileage: 14.5, city: "Hyderabad", resalePrice: 1890000, image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80" },
  { id: 18, brand: "Renault", model: "Triber", year: 2020, kmDriven: 38000, fuelType: "Petrol", transmission: "Manual", ownerCount: 1, sellerType: "Individual", engineCC: 999, mileage: 19.0, city: "Ahmedabad", resalePrice: 480000, image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80" },
  { id: 19, brand: "Volkswagen", model: "Vento", year: 2017, kmDriven: 58000, fuelType: "Petrol", transmission: "Automatic", ownerCount: 2, sellerType: "Dealer", engineCC: 1197, mileage: 16.0, city: "Chennai", resalePrice: 490000, image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80" },
  { id: 20, brand: "Ford", model: "Endeavour", year: 2018, kmDriven: 72000, fuelType: "Diesel", transmission: "Automatic", ownerCount: 1, sellerType: "Dealer", engineCC: 3198, mileage: 12.6, city: "Delhi", resalePrice: 2150000, image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80" },

  { id: 21, brand: "Maruti", model: "Ertiga", year: 2019, kmDriven: 48000, fuelType: "CNG", transmission: "Manual", ownerCount: 1, sellerType: "Individual", engineCC: 1462, mileage: 26.1, city: "Delhi", resalePrice: 760000, image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80" },
  { id: 22, brand: "Hyundai", model: "Verna", year: 2018, kmDriven: 52000, fuelType: "Petrol", transmission: "Automatic", ownerCount: 2, sellerType: "Dealer", engineCC: 1591, mileage: 17.7, city: "Bengaluru", resalePrice: 690000, image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80" },
  { id: 23, brand: "Tata", model: "Tiago", year: 2020, kmDriven: 29000, fuelType: "Petrol", transmission: "Manual", ownerCount: 1, sellerType: "Individual", engineCC: 1199, mileage: 20.0, city: "Kolkata", resalePrice: 435000, image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80" },
  { id: 24, brand: "Honda", model: "WR-V", year: 2018, kmDriven: 54000, fuelType: "Diesel", transmission: "Manual", ownerCount: 1, sellerType: "Dealer", engineCC: 1498, mileage: 25.5, city: "Jaipur", resalePrice: 530000, image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" },
  { id: 25, brand: "Toyota", model: "Glanza", year: 2021, kmDriven: 21000, fuelType: "Petrol", transmission: "Automatic", ownerCount: 1, sellerType: "Trustmark Dealer", engineCC: 1197, mileage: 23.8, city: "Pune", resalePrice: 720000, image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80" },
  { id: 26, brand: "Kia", model: "Carens", year: 2023, kmDriven: 12000, fuelType: "Diesel", transmission: "Automatic", ownerCount: 1, sellerType: "Individual", engineCC: 1493, mileage: 18.0, city: "Chandigarh", resalePrice: 1350000, image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80" },
  { id: 27, brand: "Mahindra", model: "Scorpio-N", year: 2023, kmDriven: 16000, fuelType: "Diesel", transmission: "Manual", ownerCount: 1, sellerType: "Dealer", engineCC: 2184, mileage: 15.0, city: "Hyderabad", resalePrice: 1680000, image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=80" },
  { id: 28, brand: "Renault", model: "Kiger", year: 2021, kmDriven: 24000, fuelType: "Petrol", transmission: "Automatic", ownerCount: 1, sellerType: "Individual", engineCC: 999, mileage: 18.2, city: "Mumbai", resalePrice: 620000, image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" },
  { id: 29, brand: "Volkswagen", model: "Taigun", year: 2022, kmDriven: 19000, fuelType: "Petrol", transmission: "Automatic", ownerCount: 1, sellerType: "Trustmark Dealer", engineCC: 1498, mileage: 17.8, city: "Bengaluru", resalePrice: 1320000, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80" },
  { id: 30, brand: "Ford", model: "Figo", year: 2016, kmDriven: 68000, fuelType: "Petrol", transmission: "Manual", ownerCount: 2, sellerType: "Individual", engineCC: 1196, mileage: 18.1, city: "Chennai", resalePrice: 320000, image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80" },

  { id: 31, brand: "Maruti", model: "Brezza", year: 2021, kmDriven: 27000, fuelType: "Petrol", transmission: "Manual", ownerCount: 1, sellerType: "Trustmark Dealer", engineCC: 1462, mileage: 18.7, city: "Delhi", resalePrice: 790000, image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" },
  { id: 32, brand: "Hyundai", model: "Venue", year: 2021, kmDriven: 23000, fuelType: "Petrol", transmission: "Automatic", ownerCount: 1, sellerType: "Dealer", engineCC: 998, mileage: 18.0, city: "Pune", resalePrice: 830000, image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" },
  { id: 33, brand: "Tata", model: "Punch", year: 2022, kmDriven: 14000, fuelType: "Petrol", transmission: "Automatic", ownerCount: 1, sellerType: "Individual", engineCC: 1199, mileage: 18.8, city: "Bengaluru", resalePrice: 680000, image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" },
  { id: 34, brand: "Honda", model: "Jazz", year: 2017, kmDriven: 51000, fuelType: "Petrol", transmission: "Automatic", ownerCount: 2, sellerType: "Dealer", engineCC: 1199, mileage: 17.1, city: "Mumbai", resalePrice: 460000, image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80" },
  { id: 35, brand: "Toyota", model: "Camry", year: 2019, kmDriven: 44000, fuelType: "Hybrid", transmission: "Automatic", ownerCount: 1, sellerType: "Trustmark Dealer", engineCC: 2487, mileage: 19.1, city: "Delhi", resalePrice: 2450000, image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80" },
  { id: 36, brand: "Tata", model: "Nexon EV", year: 2022, kmDriven: 21000, fuelType: "Electric", transmission: "Automatic", ownerCount: 1, sellerType: "Individual", engineCC: null, mileage: null, city: "Bengaluru", resalePrice: 1150000, image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80" },
  { id: 37, brand: "MG", model: "ZS EV", year: 2021, kmDriven: 29000, fuelType: "Electric", transmission: "Automatic", ownerCount: 1, sellerType: "Dealer", engineCC: null, mileage: null, city: "Hyderabad", resalePrice: 1480000, image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80" },
  { id: 38, brand: "Maruti", model: "Alto K10", year: 2015, kmDriven: 75000, fuelType: "Petrol", transmission: "Manual", ownerCount: 2, sellerType: "Individual", engineCC: 998, mileage: 24.0, city: "Kolkata", resalePrice: 210000, image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80" },
  { id: 39, brand: "Hyundai", model: "Santro", year: 2019, kmDriven: 33000, fuelType: "CNG", transmission: "Manual", ownerCount: 1, sellerType: "Dealer", engineCC: 1086, mileage: 20.3, city: "Ahmedabad", resalePrice: 385000, image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80" },
  { id: 40, brand: "Mahindra", model: "XUV300", year: 2020, kmDriven: 39000, fuelType: "Diesel", transmission: "Manual", ownerCount: 1, sellerType: "Trustmark Dealer", engineCC: 1497, mileage: 20.0, city: "Jaipur", resalePrice: 740000, image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" },
  { id: 41, brand: "Kia", model: "EV6", year: 2023, kmDriven: 8000, fuelType: "Electric", transmission: "Automatic", ownerCount: 1, sellerType: "Trustmark Dealer", engineCC: null, mileage: null, city: "Mumbai", resalePrice: 5200000, image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80" },
  { id: 42, brand: "Toyota", model: "Urban Cruiser", year: 2021, kmDriven: 26000, fuelType: "Petrol", transmission: "Automatic", ownerCount: 1, sellerType: "Dealer", engineCC: 1462, mileage: 17.0, city: "Chennai", resalePrice: 810000, image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80" }
];

/**
 * Get image URL for any car or car summary object
 */
function getCarImageUrl(car) {
  if (car && car.image) return car.image;
  
  const brand = (car?.brand || car?.inputSummary?.brand || "").toLowerCase();
  const model = (car?.model || car?.inputSummary?.model || "").toLowerCase();
  const fuelType = (car?.fuelType || car?.inputSummary?.fuelType || "").toLowerCase();

  if (model.includes("swift") || model.includes("tiago") || model.includes("figo") || model.includes("alto") || model.includes("santro")) {
    return "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80";
  }
  if (model.includes("i20") || model.includes("baleno") || model.includes("glanza") || model.includes("jazz") || model.includes("polo")) {
    return "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80";
  }
  if (model.includes("nexon") || model.includes("creta") || model.includes("seltos") || model.includes("venue") || model.includes("punch") || model.includes("brezza") || model.includes("sonet") || model.includes("xuv300") || model.includes("kiger") || model.includes("taigun") || model.includes("ecosport") || model.includes("urban cruiser") || model.includes("wr-v")) {
    return "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80";
  }
  if (model.includes("thar") || model.includes("scorpio") || model.includes("fortuner") || model.includes("endeavour")) {
    return "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=600&q=80";
  }
  if (model.includes("harrier") || model.includes("xuv700")) {
    return "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80";
  }
  if (model.includes("innova") || model.includes("ertiga") || model.includes("carens") || model.includes("triber")) {
    return "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80";
  }
  if (model.includes("city") || model.includes("verna") || model.includes("vento") || model.includes("amaze")) {
    return "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80";
  }
  if (model.includes("camry")) {
    return "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80";
  }
  if (fuelType.includes("electric") || model.includes("ev")) {
    return "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80";
  }

  if (brand.includes("maruti") || brand.includes("hyundai") || brand.includes("renault")) {
    return "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80";
  }

  return "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80";
}

/**
 * Clean data and compute summary metrics.
 */
function getDatasetSummary(dataset = mockCars) {
  const validPrices = dataset.map(c => c.resalePrice).filter(p => typeof p === 'number' && !isNaN(p));
  const total = validPrices.reduce((acc, val) => acc + val, 0);
  const avg = validPrices.length ? Math.round(total / validPrices.length) : 0;
  const min = validPrices.length ? Math.min(...validPrices) : 0;
  const max = validPrices.length ? Math.max(...validPrices) : 0;

  const brands = [...new Set(dataset.map(c => c.brand))].sort();
  const fuelTypes = [...new Set(dataset.map(c => c.fuelType))].sort();
  const transmissions = [...new Set(dataset.map(c => c.transmission))].sort();
  const cities = [...new Set(dataset.map(c => c.city))].sort();

  return {
    totalRecords: dataset.length,
    averagePrice: avg,
    minimumPrice: min,
    maximumPrice: max,
    availableBrands: brands,
    availableFuelTypes: fuelTypes,
    availableTransmissions: transmissions,
    availableCities: cities,
    lastUpdated: "2026-08-10"
  };
}

const mockDatasetSummary = getDatasetSummary(mockCars);
