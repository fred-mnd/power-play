import { Route, Routes } from 'react-router-dom';
import Catalog from '../pages/catalog-page';
import MainLayout from '../layouts/layout';
import Home from '../pages/home-page';
import DetailsPage from '../pages/detail-page';
import { CartPage } from '../pages/cart-page';
import ProfilePage from '../pages/profile-page';
import Protected from './protected';

export default function MiddlewareRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/catalog" element={<MainLayout><Catalog /></MainLayout>} />
        <Route path="/details/:id" element={<MainLayout><DetailsPage /></MainLayout>} />
        <Route path="/cart" element={<Protected><MainLayout><CartPage /></MainLayout></Protected>} />
        <Route path="/profile" element={<Protected><MainLayout><ProfilePage /></MainLayout></Protected>} />
      </Routes>
    </>
  );
}
