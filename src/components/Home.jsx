import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Content from "./Content";
import Footer from "./Footer";
import { loader } from "../assets/Gallery";

function Home() {
  const [sname, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sname) return;
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [sname]);

  const LoaderAnimation = () => (
    <div className="d-flex justify-content-center align-items-center min-vh-100 ">
      <img src={loader} alt="Loading..." style={{ width: "100px" }} />
    </div>
  );

  return (
    <>
      <Navbar sname={sname} setName={setName} />

      {loading ? (
        <LoaderAnimation />
      ) : sname ? (
        <Content sname={sname} setName={setName} />
      ) : (
        <div
          className="container-fluid d-flex justify-content-center align-items-center min-vh-100 flex-column text-light"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1529086711581-8ebd9fbfc74e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1>Welcome to our Weather App ☀️</h1>
          <p className="lead">Please enter your location to begin</p>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Home;
