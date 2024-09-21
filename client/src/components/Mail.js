function Mail() {
  return (
    <div className="flex flex-row bg-y100 p-20 justify-center">
      <div>
        <img src="\assets\images\specials\mail.png" alt="" />
      </div>
      <div className="flex flex-col h-full gap-10">
        <p>Get latest updates about launches, discounts, events</p>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="rounded-2xl w-full h-20 p-2"
        />
        <button
          title="Subscribe"
          className="bg-m500 flex items-center justify-center text-white p-5 w-40 h-10 rounded-2xl"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default Mail;
