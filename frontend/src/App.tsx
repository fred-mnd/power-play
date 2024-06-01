import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/user-context';
import MainLayout from './layouts/layout';
import MiddlewareRoutes from './middlewares/middleware-route';
import Home from './pages/home-page';
import Login from './pages/login-page';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <MainLayout>
          <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Home></Home>}></Route>

            <Route
              path="/*"
              element={<MiddlewareRoutes></MiddlewareRoutes>}
            ></Route>

          </Routes>
        </MainLayout>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
