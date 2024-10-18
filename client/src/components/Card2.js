// src/components/Card2.js
import React from "react";

function Card2({ src, alt, detail, title }) {
  return (
    <div className="card">
      <img src={src} alt={alt} className="card-image" />
      <h3 className="card-title">{title}</h3> {/* Displaying the title */}
      <p className="card-detail">{detail}</p>
    </div>
  );
}

export default Card2;
