import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import './App.css';

const Home = () => "Home";
const AllCountries = () => "All Countries";
const Game = () => "Game";
const ErrorPage = () => "Error 404";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<AllCountries />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
