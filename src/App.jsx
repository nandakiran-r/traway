import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/layout';
import { Home } from '@/pages';
import AppLayout from './components/Layout/appLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<div>Hello</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;