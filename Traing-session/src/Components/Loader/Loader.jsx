import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="cat">
      {Array.from({ length: 32 }).map((_, i) => (
        <div key={i} className="cat__segment"></div>
      ))}
    </div>
  );
};
  
export default Loader;
