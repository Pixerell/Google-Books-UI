import React from 'react';
import './App.css';
import MainPage from "./views/main-page/MainPage";
import BookPage from "./views/book-page/BookPage";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/header/Header";
import FloatingButton from "./components/floating-button/FloatingButton";

function App() {
  return (
    <div className="App">
        <div className="mainBg">
            <Header/>
            <Router>
                <FloatingButton/>
                <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/book/:id" element={<BookPage/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
              </Routes>
            </Router>
        </div>
    </div>
  );
}

export default App;
