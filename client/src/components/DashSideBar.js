import { Link } from "react-router-dom";

function DashSideBar() {
  return (
    <aside className="w-80 h-auto min-h-screen bg-m500 text-white flex flex-col">
      <div className="p-4 text-2xl flex items-center">
        <span className="mr-2">
          {/* Add a logo if needed */}
          👜
        </span>
        HairCare
      </div>
      <nav className="flex-grow mt-4">
        <ul>
          <Link to="/dashboard">
            <li className="px-4 py-2 text-lg hover:bg-m300">Dashboard</li>
          </Link>

          <Link to="/dashboard/product">
            <li className="px-4 py-2 text-lg hover:bg-m300">Product</li>
          </Link>

          <Link to="/dashboard/inventory">
            <li className="px-4 py-2 text-lg hover:bg-m300">Inventory</li>
          </Link>

          <Link to="/dashboard/product">
            <li className="px-4 py-2 text-lg hover:bg-m300">Reports</li>
          </Link>

          <Link to="/dashboard/messages">
            <li className="px-4 py-2 text-lg hover:bg-m300">Messages</li>
          </Link>

          <Link to="/dashboard/customer">
            <li className="px-4 py-2 text-lg hover:bg-m300">Customers</li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
}

export default DashSideBar;
