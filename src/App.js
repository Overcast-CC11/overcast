import React from 'react';
import Header from './components/Header';
import GenreList from './components/GenreList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
      <GenreList />
      </div>
    </div>
  );


}

export default App;
