import React from "react";

function UpComingDays({ date, image, celcius }) {
  return (
    <div className="card" style={{ width: "12rem",height:"12rem" }}>
      <div className="card-body d-flex flex-column align-items-center justify-content-center gap-3">
        <h6 className="card-subtitle mb-2 text-body-secondary">{date}</h6>
        <img src={`http://openweathermap.org/img/w/${image}.png`} alt="icon2" style={{width:"5rem"}} />
        <p className="card-text">celcius: {celcius}</p>
      </div>
    </div>
  );
}

export default UpComingDays;
