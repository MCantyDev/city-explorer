import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

/* Views for Routes */
import HomePage from "../views/HomePage"
import CityPage from "../views/CityPage"

// Need to make it so the route for city page is like /search/GB/Manchester
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