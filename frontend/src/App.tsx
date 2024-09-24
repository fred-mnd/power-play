import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { UserProvider } from './contexts/user-context';
import MiddlewareRoutes from './middlewares/middleware-route';
import Login from './pages/login-page';
import Register from './pages/register-page';
import Home from './pages/home-page';
import Catalog from './pages/catalog-page';
import Navbar from './components/navbar';

const MainLayout: React.FC = () => (
  <div>
    <Navbar />
    <Outlet />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />  
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<MiddlewareRoutes />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
