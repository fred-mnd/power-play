import { Route, Routes } from 'react-router-dom';
import Catalog from '../pages/catalog-page';
import MainLayout from '../layouts/layout';
import Home from '../pages/home-page';
import DetailsPage from '../pages/detail-page';
import { CartPage } from '../pages/cart-page';
import ProfilePage from '../pages/profile-page';
import Protected from './protected';
import AdminLayout from '../layouts/admin-layout';
import { AdminPage } from '../pages/admin/admin-home';
import AboutUs from '../pages/about-page';
import Support from '../pages/support-page';
import OrderPage from '../pages/order-page';

export default function MiddlewareRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutUs /></MainLayout>} />
        <Route path="/support" element={<MainLayout><Support /></MainLayout>} />
        <Route path="/catalog" element={<MainLayout><Catalog /></MainLayout>} />
        <Route path="/details/:id" element={<MainLayout><DetailsPage /></MainLayout>} />
        <Route path="/cart" element={<Protected><MainLayout><CartPage /></MainLayout></Protected>} />
        <Route path="/orders" element={<Protected><MainLayout><OrderPage /></MainLayout></Protected>} />
        <Route path="/profile" element={<Protected><MainLayout><ProfilePage /></MainLayout></Protected>} />
        <Route path="/admin/home" element={<AdminLayout><AdminPage></AdminPage></AdminLayout>} />

      </Routes>
    </>
  );
}
