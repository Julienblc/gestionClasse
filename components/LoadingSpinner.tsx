import * as React from "react";

const LoadingSpinner = () => {
  return (
    <div id="spinner-container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1>Chargement des étudiants</h1>
    </div>
  );
};

export default LoadingSpinner;
