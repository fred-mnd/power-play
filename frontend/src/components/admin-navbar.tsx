import { Link } from "react-router-dom";
import './navbar.css';

export default function AdminNavbar() {
  return (
    <div className="sticky">
      <div className="navbar fixed w-dvw bg-sky-200 flex justify-between items-center px-[10%] py-2">
        <Link className="mx-2 w-20 flex justify-center" to="/">
          <img srcSet="/src/assets/logo_shadow.png" alt="Logo" />
        </Link>
        <div className="navbar-links">
          <Link className="navbar-link" to="/login">LOGOUT</Link>
        </div>
      </div>
    </div>
  );
}
