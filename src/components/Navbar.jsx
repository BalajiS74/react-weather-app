import React, { useEffect, useState } from "react";
function Navbar({ name, setName }) {
  const [isonline, setOnline] = useState(navigator.onLine);

  const internetCheck = () => {
    setOnline(navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener("online", internetCheck);
    window.addEventListener("offline", internetCheck);
  }, []);
  return (
    <>
      <header className="container-fluid bg-info py-2">
        <div className="row align-items-center ">
          <div className="col-3 d-flex justify-content-center align-items-center">
            <h4 className="fst-italic" style={{letterSpacing:"2px"}}>weather☁️</h4>
          </div>
          <div className="col-6 d-flex gap-3">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search..."
              style={{ marginLeft: "120px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setName(e.target.value);
                }
              }}
              spellCheck="false"
            />
          </div>
          <div className="col-2 d-flex justify-content-between">
            <i
              className="bi bi-moon-stars bg-light py-2 px-3"
              style={{ borderRadius: "50%", cursor: "pointer" }}
            ></i>
            <h5 className={isonline?'text-success':'text-danger'} style={{backgroundColor:"white",padding:"5px",width:"130px",textAlign:"center",borderRadius:"20px"}}> {isonline?'online':'offline'}</h5>
          </div>
        </div>
      </header>
    </>
  );    
}

export default Navbar;
