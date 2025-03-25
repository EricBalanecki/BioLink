import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthContext

import Home from './pages/Home';
import BrochureDetails from './pages/BrochureDetails';
import BrochureLists from './pages/BrochureLists';
import Share from './pages/Share';
import Categories from './pages/Categories';
import Import from './pages/Import';
import Link from './pages/Link';
import Login from './pages/Login';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:type" element={<Categories />} />
            <Route path="/brochureDetails/:category/:subcategory/:index" element={<BrochureDetails />} />
            <Route path="/brochureDetails/:category/:subcategory/:index/:id" element={<Link />} />
            <Route path="/brochureLists/:category" element={<BrochureLists />} />
            <Route path="/shareBrochure" element={<Share />} />
            <Route path="/import" element={<Import />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default App;
