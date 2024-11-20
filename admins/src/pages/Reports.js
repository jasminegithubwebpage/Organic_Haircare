import React, { useState } from "react";
import VisualAdmin from "./../components/VisualAdmin";
import VisualOrder from "../components/VisualOrder";
import VisualSales from "../components/VisualSales";

function Reports() {
  const [activeTab, setActiveTab] = useState("admin");

  return (
    <div className="p-4">
      <ul className="flex gap-4 mb-6">
        <li
          className={`px-4 py-2 border rounded cursor-pointer transition ${
            activeTab === "admin"
              ? "bg-m500 text-white border-m500 font-bold"
              : "hover:bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("admin")}
        >
          Admin Report
        </li>
        <li
          className={`px-4 py-2 border rounded cursor-pointer transition ${
            activeTab === "order"
              ? "bg-m500 text-white border-m500 font-bold"
              : "hover:bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("order")}
        >
          Order Report
        </li>
        <li
          className={`px-4 py-2 border rounded cursor-pointer transition ${
            activeTab === "sales"
              ? "bg-m500 text-white border-m500 font-bold"
              : "hover:bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("sales")}
        >
          Sales Report
        </li>
      </ul>

      {/* Conditional Rendering of Components */}
      {activeTab === "admin" && <VisualAdmin />}
      {activeTab === "order" && <VisualOrder />}
      {activeTab === "sales" && <VisualSales />}
    </div>
  );
}

export default Reports;
