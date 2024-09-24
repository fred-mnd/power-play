import React from "react";
import Navbar from "../components/navbar";
import AdminNavbar from "../components/admin-navbar";

type ContentLayout = {
  children: JSX.Element;
};

export default function AdminLayout({ children }: ContentLayout) {
  return (
    <div className="container">
      {/* Navigation Bar VVV */}
      <AdminNavbar></AdminNavbar>
      {/* ---------------------------------- */}

      {/* All Content will be inside this div (chidren) VVV */}

      <div className="content">{children}</div>

      {/* ----------------------------------- */}
    </div>
  );
}
