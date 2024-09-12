import React from 'react';
// import { FaTruck, FaShieldAlt, FaSeedling, FaHeadphonesAlt } from 'react-icons/fa';

function FeatureItem({ icon, title }) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-gray-600">{title}</span>
    </div>
  );
}

function Features() {
  return (
    <div className="flex justify-around py-6 bg-white shadow-md">
      {/* <FeatureItem icon={<FaTruck />} title="On Time Delivery" />
      <FeatureItem icon={<FaShieldAlt />} title="Secure Transaction" />
      <FeatureItem icon={<FaSeedling />} title="Organic" />
      <FeatureItem icon={<FaHeadphonesAlt />} title="24/7 Customer Support" /> */}
      <FeatureItem icon="" title="On Time Delivery" />
      <FeatureItem icon="" title="Secure Transaction" />
      <FeatureItem icon="" title="Organic" />
      <FeatureItem icon="" title="24/7 Customer Support" />
    </div>
  );
}

export default Features;
