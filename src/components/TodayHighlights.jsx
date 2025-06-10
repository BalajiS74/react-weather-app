import React from "react";

function TodayHighlights({image, currentData,title}) {
  return (
    <>
      <div className="card" style={{ width: " 15rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center p-1 fst-italic">{title}</h5>

          <img
            src={image}
            className="card-img"
            alt="..."
            style={{ height: "187px" }}
          />
          <p className="card-text mt-2 text-center">
            {currentData ? `${currentData} m/s` : "5.63 m/s"}
          </p>
        </div>
      </div>
    </>
  );
}

export default TodayHighlights;
