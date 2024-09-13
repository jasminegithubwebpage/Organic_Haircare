import React from "react";

const OrderTrack = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Order Tracking Section */}
      <div className="container mx-auto py-12 p-4">
        <h2 className="text-3xl text-primary mb-8">Your Orders</h2>

        <div className="flex flex-col items-center">
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-6 trackSection">
              {/* Progress Tracker */}
              <div className="flex flex-col items-start bg-pink-100 p-6 rounded-lg stages">
                <div className="flex flex-col items-center space-y-8">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    <span className="ml-2 text-primary">Stage 1</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    <span className="ml-2 text-primary">Stage 1</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    <span className="ml-2 text-primary">Stage 1</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="ml-2 text-gray-400">Stage 1</span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-pink-50 p-8 rounded-lg shadow-md orderDetail">
                <div className="flex flex-col p-4">
                  <img
                    src="/assets/images/products/p (17).jpg"
                    alt="Product"
                    className="rounded-lg proImg"
                  />
                  <h3 className="text-xl font-bold mt-4">Product Title</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet consectetur. Porta malesuada urna
                    phasellus tristique nec morbi quis.Lorem ipsum dolor sit
                    amet consectetur. Porta malesuada urna phasellus tristique
                    nec morbi quis. Lorem ipsum dolor sit amet consectetur.
                    Porta malesuada urna phasellus tristique nec morbi quis.
                  </p>
                  <div className="flex space-x-2 mt-4">
                    <span className="text-yellow-500">★★★★☆</span>
                    <span className="text-gray-500 text-sm">
                      10k Members Bought
                    </span>
                  </div>
                  <div className="flex justify-between w-full mt-4 text-sm text-gray-600">
                    <span>
                      Delivered on: <strong>Delivery Date</strong>
                    </span>
                    <span>₹ 99</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Table */}
          <div className="mt-12 trackDetails">
            <table className="bg-white rounded-lg shadow-md w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="py-2 px-4">S.no</th>
                  <th className="py-2 px-4">Details</th>
                  <th className="py-2 px-4">Comments</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">
                    Lorem ipsum dolor sit amet consectetur.
                  </td>
                  <td className="py-2 px-4">
                    Lorem ipsum dolor sit amet consectetur.
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4">2</td>
                  <td className="py-2 px-4">
                    Lorem ipsum dolor sit amet consectetur.
                  </td>
                  <td className="py-2 px-4">
                    Lorem ipsum dolor sit amet consectetur.
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4">3</td>
                  <td className="py-2 px-4">
                    Lorem ipsum dolor sit amet consectetur.
                  </td>
                  <td className="py-2 px-4">
                    Lorem ipsum dolor sit amet consectetur.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrack;
