import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout/layout';
import { Home, SignUp, Login, Map } from '@/pages';
import { AppPage, PetitionHub, TravelTogether, Settings, Restrooms, IncidentReports, Report,RelocatedShops } from './pages/App';
import AppLayout from './components/Layout/appLayout';
import Awareness from './pages/App/Awareness';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<AppPage />} />
          <Route path='home' element={<Navigate to='/app' />} />
          <Route path="petitions" element={<PetitionHub />} />
          <Route path="incidents" element={<IncidentReports />} />
          <Route path="travel" element={<TravelTogether />} />
          <Route path='restrooms' element={<Restrooms />} />
          <Route path="report" element={<Report />} />
          <Route path="awareness" element={<Awareness />} />
          <Route path="relocated" element={<RelocatedShops />} />
          <Route path="settings" element={<Settings />} />

        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/map' element={<Map />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;