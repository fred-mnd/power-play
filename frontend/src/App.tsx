import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/user-context';
import MainLayout from './layouts/layout';
import MiddlewareRoutes from './middlewares/middleware-route';
import Home from './pages/catalog-page';
import Login from './pages/login-page';
import Register from './pages/register-page';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
          <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>

            <Route
              path="/*"
              element={<MiddlewareRoutes></MiddlewareRoutes>}
            ></Route>

          </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
