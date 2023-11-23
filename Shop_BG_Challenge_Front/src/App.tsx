import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, CartProvider } from './context';
import AuthPage from './pages/AuthPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import PurchasePage from './pages/PurchasePage';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path='*' element={<Navigate to='/products' />} />

            {/* Public Routes */}
            <Route element={<PublicRoute redirectTo='/products' />}>
              <Route path='/login' element={<AuthPage isLoginPage />} />
              <Route path='/register' element={<AuthPage />} />
            </Route>

            <Route path='/products' element={<ProductsPage />} />
            <Route path='/products/:id' element={<ProductDetail />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='/purchase' element={<PurchasePage />} />
            </Route>

          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
