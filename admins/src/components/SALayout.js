// src/components/Layout.js
import React from "react";
import SASidebar from "./SASidebar";
import SAAvatar from './SAAvatar';

function SALayout({ children }) {
  return (
    <div className="flex">
      <SASidebar />
      <main className="flex-grow bg-n100 p-6">
        <SAAvatar />
        <section className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <main>{children}</main>
        </section>
      </main>
    </div>
  );
}

export default SALayout;
