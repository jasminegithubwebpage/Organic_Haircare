import { Link } from "react-router-dom";

function SASidebar() {
  return (
    <aside className="w-60 h-auto min-h-screen bg-m500 text-white flex flex-col">
      <div className="p-4 text-2xl items-center">
        <div className="flex">
          <span className="mr-2">👜</span>
          <h1>HairCare</h1>
        </div>
        <div>
          <Link to="/sapage">
            <p className="r16"><span><i class="fa-solid fa-right-from-bracket"></i></span> Back to home</p>
          </Link>
        </div>
      </div>
      <nav className="flex-grow mt-4">
        <ul>
          <Link to="/superdashboard">
            <li className="px-4 py-2 text-lg hover:bg-m300">Dashboard</li>
          </Link>

          <Link to="/sa/product">
            <li className="px-4 py-2 text-lg hover:bg-m300">Product</li>
          </Link>

          <Link to="/sa/inventory">
            <li className="px-4 py-2 text-lg hover:bg-m300">Inventory</li>
          </Link>

          <Link to="/sa/reports">
            <li className="px-4 py-2 text-lg hover:bg-m300">Reports</li>
          </Link>

          <Link to="/sa/messages">
            <li className="px-4 py-2 text-lg hover:bg-m300">Messages</li>
          </Link>

          <Link to="/sa/customer">
            <li className="px-4 py-2 text-lg hover:bg-m300">Customers</li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
}

export default SASidebar;
