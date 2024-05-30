import React, { useState } from 'react';

function App() {
  const [fuelType, setFuelType] = useState('');
  const [budgetPrice, setBudgetPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [liters, setLiters] = useState('');
  const [defaultPrice, setDefaultPrice] = useState('');

  const defaultPrices = {
    Diesel: 50,
    Unleaded: 55,
    Premium: 60
  };

  const handleFuelTypeChange = (selectedFuelType) => {
    setFuelType(selectedFuelType);
    if (selectedFuelType && defaultPrices[selectedFuelType]) {
      setDefaultPrice(defaultPrices[selectedFuelType].toString());
    } else {
      setDefaultPrice('');
    }
  };

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
      <div className="box">
        <label htmlFor="fuelType">Choose fuel type:</label>
        <select id="fuelType" value={fuelType} onChange={(e) => handleFuelTypeChange(e.target.value)}>
          <option value="">Select fuel type</option>
          <option value="Diesel">Diesel</option>
          <option value="Unleaded">Unleaded</option>
          <option value="Premium">Premium</option>
        </select>
        {defaultPrice && <p>Default price: {defaultPrice} per liter</p>}
        <label htmlFor="budgetPrice">Enter your budget price:</label>
        <input
          type="text"
          id="budgetPrice"
          value={budgetPrice}
          onChange={(e) => setBudgetPrice(e.target.value)}
        />
        <button className="calculate-button" onClick={calculateLiters}>Calculate Liters</button>
        {errorMessage && <p>{errorMessage}</p>}
        {liters && <p>With a budget of {budgetPrice}, you can get {liters} liters of {fuelType}.</p>}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .box {
          background-color: #f0f0f0;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .box label {
          margin-bottom: 10px;
        }

        .box input {
          margin-bottom: 20px;
          padding: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: 100%;
        }

        .calculate-button {
          background-color: #4CAF50;
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 10px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default App;
