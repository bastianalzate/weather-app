import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Swal from 'sweetalert2'
import Nav from '../Navbar/Nav';
import Cards from '../Cards/Cards';


function App() {
  const [cities, setCities] = useState([]);
  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id !== id));
  }
  function onSearch(ciudad) {
    //Llamado a la API del clima
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${process.env.REACT_APP_API}`)
      .then((response) => {
        console.log(response)
        if(response.data.main !== undefined){
          const ciudad = {
            min: Math.round(response.data.main.temp_min),
            max: Math.round(response.data.main.temp_max),
            img: response.data.weather[0].icon,
            id: response.data.id,
            wind: response.data.wind.speed,
            temp: response.data.main.temp,
            name: response.data.name,
            weather: response.data.weather[0].main,
            clouds: response.data.clouds.all,
            latitud: response.data.coord.lat,
            longitud: response.data.coord.lon
          };
          setCities(oldCities => [...oldCities, ciudad]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La ciudad no se encontro!',
          })
        }
      })
      .catch(err => 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La ciudad no se encontro!',
        }))
    
  }
  function onFilter(ciudadId) {
    let ciudad = cities.filter(c => c.id === parseInt(ciudadId));
    if(ciudad.length > 0) {
        return ciudad[0];
    } else {
        return null;
    }
  }
  return (
    <div className="App">
      <Nav onSearch={onSearch}/>
      <div>
        <Cards
          cities={cities}
          onClose={onClose}
        />
      </div>
      <hr />
    </div>
  );
}

export default App;
