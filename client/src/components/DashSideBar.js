import { Link } from "react-router-dom";

function DashSideBar() {
  return (
    <aside className="w-1/5 h-auto bg-m500 text-white flex flex-col">
      <div className="p-4 text-2xl font-semibold flex items-center">
        <span className="mr-2">
          {/* Add a logo if needed */}
          👜
        </span>
        HairCare
      </div>
      <nav className="flex-grow mt-4">
        <ul>
          <li className="px-4 py-2 text-lg hover:bg-m300">
            <Link path="/dashboard">Dashboard</Link>
          </li>
          <li className="px-4 py-2 text-lg hover:bg-m300">
            <Link to="/dashboard/product">Product</Link>
          </li>
          <li className="px-4 py-2 text-lg hover:bg-m300">
            <Link to="/dashboard/inventory">Inventory</Link>
          </li>
          <li className="px-4 py-2 text-lg hover:bg-m300">
            <Link to="/dashboard/product">Reports</Link>
          </li>
          <li className="px-4 py-2 text-lg hover:bg-m300">Messages</li>
          <li className="px-4 py-2 text-lg hover:bg-m300">Customers</li>
        </ul>
      </nav>
    </aside>
  );
}

export default DashSideBar;
