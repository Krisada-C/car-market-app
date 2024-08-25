import React, { useState, useEffect } from 'react';

function HighlightedCars() {
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('highlightedCars')) || [];
    setHighlightedCars(savedCars);
  }, []);

  const removeCar = (id) => {
    const updatedCars = highlightedCars.filter(car => car.id !== id);
    setHighlightedCars(updatedCars);
    localStorage.setItem('highlightedCars', JSON.stringify(updatedCars));
  };

  return (
    <div>
      <h1>Highlighted Cars</h1>
      <ul>
        {highlightedCars.map(car => (
          <li key={car.id}>
            {car.brand} {car.model}
            <button onClick={() => removeCar(car.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HighlightedCars;
