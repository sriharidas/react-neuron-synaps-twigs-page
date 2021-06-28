import React from "react";
import "./../css/App.css";
export default function Dashboard({ title, icon, styles, values }) {
  return (
    <>
      <div className={styles}>
        <div className="main-section-header">
          <span>{icon}</span>
          {/* <span>Lorem Ipsum</span> */}
        </div>
        <div className="main-section-desc">{title}</div>
        <div className="main-section-footer">{values}</div>
      </div>
    </>
  );
}
