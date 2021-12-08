import React from 'react';
import Logo from '../../assets/img/logoHenry.png';
import SearchBar from '../SearchBar/SearchBar';
import './Nav.css';


function Nav({onSearch}) {
  return (
    <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand">
          Weather App
        </span>
        <SearchBar
          onSearch={onSearch}
        />
    </nav>
  );
};

export default Nav;
