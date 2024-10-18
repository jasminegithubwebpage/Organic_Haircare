import { Link } from "react-router-dom";

function DashAvatar() {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl">Welcome</h1>
      <Link to="/superadmin-dashboard">
        <p>Back to Home</p>
      </Link>
      <div>
        {/* Add an avatar image */}
        <img
          src="/assets/images/specials/47.jpg"
          alt=""
          className="rounded-full h-10 w-10"
          name="avatar"
        />
      </div>
    </header>
  );
}

export default DashAvatar;
