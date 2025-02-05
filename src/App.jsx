import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/layout';
import { Home, SignUp, Login, Map } from '@/pages';
import { AppPage } from './pages/App';
import AppLayout from './components/Layout/appLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<AppPage />} />
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