// src/components/Layout.js
import React from "react";
import DashAvatar from "./DashAvatar copy";
import DashSideBarCopy from "./DashSideBar copy";

function SuperAdminLayout({ children }) {
  return (
    <div className="flex">
      <DashSideBarCopy />
      <main className="flex-grow bg-n100 p-6">
        <DashAvatar />
        <section className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <main>{children}</main>
        </section>
      </main>
    </div>
  );
}

export default SuperAdminLayout;
