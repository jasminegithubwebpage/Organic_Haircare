function DashAvatar() {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl">Welcome, Admin!</h1>
      <div>
        {/* Add an avatar image */}
          <img src="/assets/images/specials/47.jpg" alt="" className="rounded-full h-10 w-10" name="avatar"/>
      </div>
    </header>
  );
}

export default DashAvatar;