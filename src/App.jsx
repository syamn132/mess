import React from 'react';
import { Helmet } from 'react-helmet';
import Dashboard from '@/components/Dashboard';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Helmet>
        <title>Super Admin Dashboard - Mess Management System</title>
        <meta name="description" content="Comprehensive admin dashboard for managing mess accounts, subscription plans, billing, and monitoring live statistics across the platform." />
      </Helmet>
      <Dashboard />
      <Toaster />
    </>
  );
}

export default App;