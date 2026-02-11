import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../../shared/layouts/PublicLayout';
import { DashboardLayout } from '../../shared/layouts/DashboardLayout';
import { ProtectedRoute, PublicRoute } from '../../modules/auth';
import { LoginPage } from '../../modules/auth/pages/LoginPage';
import { RegisterPage } from '../../modules/auth/pages/RegisterPage';
import { TransactionPage } from '@/modules/transactions/pages/TransactionPage';
import { ReportsPage } from '@/modules/reports/pages/ReportsPage';
import { HomePage } from '@/modules/home/pages/HomePage';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';

export const AppRouter = () => {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route element={<PublicRoute />}>
                        <Route element={<PublicLayout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Route>
                    </Route>

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<DashboardLayout />}>
                            <Route 
                                path="/dashboard" 
                                element={
                                    <ErrorBoundary>
                                        <ReportsPage />
                                    </ErrorBoundary>
                                } 
                            />
                            <Route 
                                path="/transactions" 
                                element={
                                    <ErrorBoundary>
                                        <TransactionPage />
                                    </ErrorBoundary>
                                } 
                            />
                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
};
