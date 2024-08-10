import React, { useState, useEffect } from 'react';
// import './Filters.css'; // Make sure to include this for the styles

const Filters = () => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000000);

  useEffect(() => {
    setMinValue(priceRange[0]);
    setMaxValue(priceRange[1]);
  }, [priceRange]);

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxValue - 1000);
    setMinValue(value);
    setPriceRange([value, maxValue]);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minValue + 1000);
    setMaxValue(value);
    setPriceRange([minValue, value]);
  };

  return (
    <aside className="filters">
      <h2>Filters</h2>
      <div className="filter-price">
        <h3>Price</h3>
        <div className="price-slider">
          <div className="slider">
            <input
              type="range"
              min="0"
              max="1000000"
              step="1000"
              value={minValue}
              onChange={handleMinChange}
              className="range-min"
            />
            <input
              type="range"
              min="0"
              max="1000000"
              step="1000"
              value={maxValue}
              onChange={handleMaxChange}
              className="range-max"
            />
            <div className="progress" style={{
              left: `${((minValue - 0) / (1000000 - 0)) * 100}%`,
              right: `${100 - ((maxValue - 0) / (1000000 - 0)) * 100}%`
            }}></div>
          </div>
          <div className="price-labels">
            <span>₹{minValue}</span> - <span>₹{maxValue}</span>
          </div>
        </div>
      </div>
              <div className="filter-category">
                <h3>Categories</h3>
                <ul>
                  <li><input type="checkbox" /> Labrador (2821)</li>
                  <li><input type="checkbox" /> German Shepherd (1921)</li>
                  <li><input type="checkbox" /> Bulldog (1420)</li>
                  <li><input type="checkbox" /> Beagle (1020)</li>
                  <li><input type="checkbox" /> Poodle (897)</li>
                  <li><input type="checkbox" /> Rottweiler (650)</li>
                  <li><input type="checkbox" /> Dachshund (410)</li>
                  <li><input type="checkbox" /> Boxer (320)</li>
                  <li><input type="checkbox" /> Shih Tzu (210)</li>
                </ul>
              </div>
      <div className="filter-brand">
        <h3>Brand</h3>
        <ul>
          <li><input type="checkbox" /> Anouk (8921)</li>
          <li><input type="checkbox" /> Sangria (9071)</li>
          <li><input type="checkbox" /> W (1599)</li>
          <li><input type="checkbox" /> Biba (1440)</li>
          <li><input type="checkbox" /> West (2345)</li>
          <li><input type="checkbox" /> Aries (23443)</li>
          <li><input type="checkbox" /> Kushal (23421)</li>
          <li><input type="checkbox" /> Lorem (5674)</li>
          <li><input type="checkbox" /> Ipsum (9087)</li>
        </ul>
      </div>
    </aside>
  );
};

export default Filters;
