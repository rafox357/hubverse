import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import MainDashboard from '../Dashboard/MainDashboard';

// Lazy load components
const Profile = React.lazy(() => import('../Profile'));
const Security = React.lazy(() => import('../Security'));
const Analytics = React.lazy(() => import('../Analytics'));
const Marketing = React.lazy(() => import('../Marketing'));
const Communications = React.lazy(() => import('../Communications'));
const Development = React.lazy(() => import('../Development'));
const Operations = React.lazy(() => import('../Operations'));
const Database = React.lazy(() => import('../Database'));
const Arbiter = React.lazy(() => import('../Arbiter'));
const Integrations = React.lazy(() => import('../Integrations'));

// Styling
import 'tailwindcss/tailwind.css';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<MainDashboard />} />
        <Route path="profile" element={
          <Suspense fallback={<LoadingFallback />}>
            <Profile />
          </Suspense>
        } />
        <Route path="security" element={
          <Suspense fallback={<LoadingFallback />}>
            <Security />
          </Suspense>
        } />
        <Route path="analytics" element={
          <Suspense fallback={<LoadingFallback />}>
            <Analytics />
          </Suspense>
        } />
        <Route path="marketing" element={
          <Suspense fallback={<LoadingFallback />}>
            <Marketing />
          </Suspense>
        } />
        <Route path="communications" element={
          <Suspense fallback={<LoadingFallback />}>
            <Communications />
          </Suspense>
        } />
        <Route path="development" element={
          <Suspense fallback={<LoadingFallback />}>
            <Development />
          </Suspense>
        } />
        <Route path="operations" element={
          <Suspense fallback={<LoadingFallback />}>
            <Operations />
          </Suspense>
        } />
        <Route path="database" element={
          <Suspense fallback={<LoadingFallback />}>
            <Database />
          </Suspense>
        } />
        <Route path="arbiter" element={
          <Suspense fallback={<LoadingFallback />}>
            <Arbiter />
          </Suspense>
        } />
        <Route path="integrations" element={
          <Suspense fallback={<LoadingFallback />}>
            <Integrations />
          </Suspense>
        } />
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-2xl font-bold text-gray-800">Page not found</h2>
            <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
          </div>
        } />
      </Route>
    </Routes>
  );
};

export default Dashboard;