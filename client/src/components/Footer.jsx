function Footer(){
    return (
        <footer className="container-md">
            <div className="grid grid-cols-4 gap-4 p-4 bg-m500">
                {/* 1st col */}
                <div>
                    <ul className="text-white">
                        <li>Know About Us</li>
                        <li>About Us</li>
                        <li>Path we crossed</li>
                        <li>Press Releases</li>
                    </ul>
                </div>

                 {/* 2nd col */}
                 <div>
                    <ul className="text-white">
                        <li>Support</li>
                        <li>Return Policy</li>
                        <li>Transaction</li>
                        <li>Help</li>
                    </ul>
                </div>

                 {/* 3rd col */}
                 <div>
                    <ul className="text-white">
                        <li>Lets Get Connected</li>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                    </ul>
                </div>

                 {/* 4th col */}
                 <div>
                    <ul className="text-white">
                        <li>Reach Us</li>
                        <li>Contact: 9879879870</li>
                        <li>Address:</li>
                        <li>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</li>
                    </ul>
                </div>
            </div>

            <hr></hr>

            {/* <div className="flex flex-row">
                <div className="basis-1/4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="facebook"><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M12.5 6h-3V4a1 1 0 0 1 1-1h1V.5h-2a3 3 0 0 0-3 3V6h-2v2.5h2v7h3v-7h2l1-2.5z" clip-rule="evenodd"></path></svg>
                </div>

            </div> */}


        </footer>
    );
}

export default Footer;

// import React from 'react';

// function Footer() {
//   return (
//     <footer className="bg-gray-800 text-white py-6">
//       <div className="container mx-auto text-center">
//         <p>© 2024 habitual. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

