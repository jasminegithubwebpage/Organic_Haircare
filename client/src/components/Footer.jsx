function Footer() {
  return (
    <footer className="container-md">
      <div className="grid grid-cols-4 gap-20 p-10 bg-m500">
        {/* 1st col */}
        <div>
          <ul className="text-white foot">
            <li className="lr-16 head">Know About Us</li>
            <li>About Us</li>
            <li>Path we crossed</li>
            <li>Press Releases</li>
          </ul>
        </div>

        {/* 2nd col */}
        <div>
          <ul className="text-white foot">
            <li className="lr-16 head">Support</li>
            <li>Return Policy</li>
            <li>Transaction</li>
            <li>Help</li>
          </ul>
        </div>

        {/* 3rd col */}
        <div>
          <ul className="text-white foot">
            <li className="lr-16 head">Lets Get Connected</li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>

        {/* 4th col */}
        <div>
          <ul className="text-white foot">
            <li className="lr-16 head">Reach Us</li>
            <li>Contact: 9879879870</li>
            <li>Address:</li>
            <li>
            12, Eco Plaza,
Greenway Street,
Madurai, Tamil Nadu - 625001,
India.
            </li>
          </ul>
        </div>
      </div>

      <hr></hr>

    </footer>
  );
}

export default Footer;

