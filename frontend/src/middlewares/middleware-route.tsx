import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/user-context';
import Catalog from '../pages/catalog-page';
import MainLayout from '../layouts/layout';
import Home from '../pages/home-page';
import DetailsPage from '../pages/detail-page';
import { CartPage } from '../pages/cart-page';

export default function MiddlewareRoutes() {
  const navigate = useNavigate();

  // Passing User Auth From (UserContext.tsx)
  const { isAuth } = useUserAuth();

  // useEffect(() => {
  //   if (!isAuth()) {
  //     // If not auth then go to '/' (login page at routes)
  //     navigate('/');
  //   }

  //   // --------------------------------
  // }, []);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/catalog" element={<Catalog></Catalog>} />
        <Route path="/details/:id" element={<DetailsPage></DetailsPage>} />
        <Route path="/cart" element={<CartPage></CartPage>} />
      </Routes>
    </MainLayout>
  );
}
