import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/layout';
import { Home, SignUp, Login } from '@/pages';
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
      </Routes>
    </Router>
  );
}

export default App;