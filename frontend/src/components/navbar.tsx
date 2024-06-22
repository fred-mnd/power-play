import React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Navbar() {
  return (
    <div className="w-dvw bg-sky-200 flex justify-between items-center px-[10%] py-2">
      <Link className="mx-2 w-20 flex justify-center" to="/">
        <img
          srcSet="/src/assets/logo_shadow.png"
        />
      </Link>
      <div className="flex justify-center items-center gap-10">
        <Link className="mx-2 font-round text-sky-900 text-center hover:underline" to="/catalog">
          PRODUCTS
        </Link>
        <Link className="mx-2 font-round text-sky-900 text-center hover:underline" to="/detail">
          ABOUT US
        </Link>
        <Link className="mx-2 font-round text-sky-900 text-center hover:underline" to="/detail">
          SUPPORT
        </Link>
      </div>
      <div className="flex items-center">
        <Link to={"/cart"}>
          <ShoppingCartIcon className="text-sky-900" fontSize="large"></ShoppingCartIcon>
        </Link>
        <AccountCircleIcon className="text-sky-900" fontSize="large"></AccountCircleIcon>
      </div>
    </div>
  );
}
