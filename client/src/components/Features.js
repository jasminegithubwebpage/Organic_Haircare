import React from "react";

function FeatureItem(props) {
  return (
    <div className="flex flex-row items-center w-full">
      <div className="flex flex-row ms-20 items-center gap-2">
        <img src={props.icon} alt={props.name} />
        <h3 className="text-gray-600 l1-b">{props.title}</h3>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="grid grid-cols-3 justify-items-center gap-10 p-20">
      <FeatureItem
        icon="assets\images\specials\delivery.png"
        title="On Time Delivery"
        name="delivery"
      />
      <FeatureItem
        icon="assets\images\specials\secure.png"
        title="Secure Transaction"
        name="secure"
      />
      <FeatureItem
        icon="assets\images\specials\trust.png"
        title="Customer Trust"
        name="trust"
      />
      <FeatureItem
        icon="assets\images\specials\quality.png"
        title="High Quality"
        name="quality"
      />
      <FeatureItem
        icon="assets\images\specials\organic.png"
        title="Organic"
        name="organic"
      />
      <FeatureItem
        icon="assets\images\specials\support.png"
        title="24/7 Customer Support"
        name="support"
      />
    </div>
  );
}

export default Features;
