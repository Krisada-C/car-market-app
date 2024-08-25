import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import carData from '../data/taladrod-cars.json'; 

function Dashboard() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    
    setCars(carData);
  }, []);


  const carsByBrand = cars.reduce((acc, car) => {
    if (!acc[car.brand]) {
      acc[car.brand] = { count: 0, models: {} };
    }
    acc[car.brand].count += 1;
    if (!acc[car.brand].models[car.model]) {
      acc[car.brand].models[car.model] = 0;
    }
    acc[car.brand].models[car.model] += 1;
    return acc;
  }, {});

  const brands = Object.keys(carsByBrand);
  const brandCounts = brands.map((brand) => carsByBrand[brand].count);

  
  const pieData = {
    labels: brands,
    datasets: [
      {
        data: brandCounts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  
  const barData = {
    labels: brands,
    datasets: brands.map((brand, index) => ({
      label: brand,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'][index],
      data: Object.values(carsByBrand[brand].models),
    })),
  };

  
  const addToHighlighted = (car) => {
    const highlightedCars = JSON.parse(localStorage.getItem('highlightedCars')) || [];
    highlightedCars.push(car);
    localStorage.setItem('highlightedCars', JSON.stringify(highlightedCars));
    alert(`${car.brand} ${car.model} has been added to highlighted cars.`);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Table showing the number of cars and values by brands and models */}
      <h2>Cars by Brand and Model</h2>
      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <React.Fragment key={brand}>
              <tr>
                <td>{brand}</td>
                <td></td>
                <td>{carsByBrand[brand].count}</td>
              </tr>
              {Object.keys(carsByBrand[brand].models).map((model) => (
                <tr key={model}>
                  <td></td>
                  <td>{model}</td>
                  <td>{carsByBrand[brand].models[model]}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Pie Chart for portion of cars by brand */}
      <h2>Cars by Brand (Pie Chart)</h2>
      <Pie data={pieData} />

      {/* Stacked Bar Chart for models of a brand */}
      <h2>Cars by Model (Stacked Bar Chart)</h2>
      <Bar data={barData} />

      {/* List of cars with the option to add to the highlighted list */}
      <h2>All Cars</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.brand} {car.model} - {car.price.toLocaleString()} Baht
            <button onClick={() => addToHighlighted(car)}>Highlight</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
