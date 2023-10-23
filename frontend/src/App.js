import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import About from './pages/About';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <ToastContainer position='top-center'/>
      <Routes>
        <Route exact path="/" Component={Home}/>
        <Route exact path="/add" Component={AddEdit}/>
        <Route exact path="/update/:id" Component={AddEdit}/>
        <Route exact path="/view/:id" Component={View}/>
        <Route exact path="/about" Component={About}/>
      </Routes>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
