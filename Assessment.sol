import React, { useState } from 'react';

function App() {
  const [fuelType, setFuelType] = useState('');
  const [budgetPrice, setBudgetPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [liters, setLiters] = useState('');
  const [defaultPrice, setDefaultPrice] = useState('');

  // Default prices for each fuel type
  const defaultPrices = {
    Diesel: 50,
    Unleaded: 55,
    Premium: 60
  };

  // Update default price when fuel type changes
  const handleFuelTypeChange = (selectedFuelType) => {
    setFuelType(selectedFuelType);
    if (selectedFuelType && defaultPrices[selectedFuelType]) {
      setDefaultPrice(defaultPrices[selectedFuelType].toString());
    } else {
      setDefaultPrice('');
    }
  };

  // Calculate liters based on budget price
  const calculateLiters = () => {
    if (!budgetPrice) {
      setErrorMessage('Please enter your budget price.');
      return;
    }

    const price = parseFloat(budgetPrice);
    if (isNaN(price) || price <= 0) {
      setErrorMessage('Invalid budget price.');
      return;
    }

    let calculatedLiters = 0;
    if (fuelType === 'Diesel') {
      calculatedLiters = price / defaultPrices['Diesel'];
    } else if (fuelType === 'Unleaded') {
      calculatedLiters = price / defaultPrices['Unleaded'];
    } else if (fuelType === 'Premium') {
      calculatedLiters = price / defaultPrices['Premium'];
    }

    setLiters(calculatedLiters.toFixed(2));
    setErrorMessage('');
  };

  return (
    <div className='container'>
    <div>
      <div>
        <label htmlFor="fuelType">Choose fuel type:</label>
        <select id="fuelType" value={fuelType} onChange={(e) => handleFuelTypeChange(e.target.value)}>
          <option value="">Select fuel type</option>
          <option value="Diesel">Diesel</option>
          <option value="Unleaded">Unleaded</option>
          <option value="Premium">Premium</option>
        </select>
        {defaultPrice && <p>Default price: {defaultPrice} per liter</p>}
      </div>
      <div>
        <label htmlFor="budgetPrice">Enter your budget price:</label>
        <input
          type="text"
          id="budgetPrice"
          value={budgetPrice}
          onChange={(e) => setBudgetPrice(e.target.value)}
        />
      </div>
      <button onClick={calculateLiters}>Calculate Liters</button>
      {errorMessage && <p>{errorMessage}</p>}
      {liters && <p>With a budget of {budgetPrice}, you can get {liters} liters of {fuelType}.</p>}
    </div>
    <style jsx>{` 
    .container{ 
      margin-left: auto; 
      margin-right: auto; 
      width: fit-content; 
      text-align: center; 
      margin-top: 150pt; } 
      `}</style>
    </div>
    
  );
}

export default App;
