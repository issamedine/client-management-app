import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import HomePage from '../features/home/page/HomePage';

// Lazy-loaded components
const AdminPage = React.lazy(() => import('../features/admin/pages/AdminPage'));
const ClientsPage = React.lazy(() => import('../features/clients/pages/ClientsPage'));
const EditClientForm = React.lazy(() => import('../features/clients/components/EditClientForm'));
const LoginPage = React.lazy(() => import('../features/auth/pages/LoginPage'));
const SignupPage = React.lazy(() => import('../features/auth/pages/SignupPage'));

/**
 * Composant de repli pendant le chargement
 * @component
 * @returns {JSX.Element} Élément de chargement simple
 */
const LoadingFallback = () => <div>Loading...</div>;

/**
 * Configuration principale des routes de l'application avec optimisation
 * 
 * @component
 * @example
 * return (
 *   <AppRoutes />
 * )
 * 
 * @description
 * Cette configuration inclut :
 * - Chargement asynchrone des composants de route
 * - Gestion des états de chargement avec Suspense
 * - Protection des routes privées
 * - Application des layouts spécifiques
 * 
 * @returns {JSX.Element} Configuration complète des routes optimisées
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />

      <Route element={<PrivateRoute />}>
        <Route
          path="/admin"
          element={
            <MainLayout>
              <Suspense fallback={<LoadingFallback />}>
                <AdminPage />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/clients"
          element={
            <MainLayout>
              <Suspense fallback={<LoadingFallback />}>
                <ClientsPage />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/edit-client/:id"
          element={
            <MainLayout>
              <Suspense fallback={<LoadingFallback />}>
                <EditClientForm />
              </Suspense>
            </MainLayout>
          }
        />
      </Route>

      <Route
        path="/login"
        element={
          <AuthLayout>
            <Suspense fallback={<LoadingFallback />}>
              <LoginPage />
            </Suspense>
          </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout>
            <Suspense fallback={<LoadingFallback />}>
              <SignupPage />
            </Suspense>
          </AuthLayout>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;