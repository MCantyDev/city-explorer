import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

/* Pages for Routes */
import HomePage from "../views/HomePage"
import CityPage from "../views/CityPage"

function AppRouter() 
{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<CityPage />} /> 
            </Routes>
        </Router>
    );
}

export default AppRouter;