import React, { useState, useEffect, useContext } from "react";
import TodayHighlights from "./TodayHighlights";
import {
  cloudgif,
  overcastclouds,
  fewclouds,
  humidityimage,
  loader,
  windimage,
  visibilityimage,
  airpresureimage,
} from "../assets/Gallery";
import UpComingDays from "./UpComingDays";
import axios from "axios";

function Content({ sname, setName }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (!sname && sname === "") return;
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${sname}&appid=0a1a86f7c1264036183ce598dbf395b8&units=metric`
        );
        setData({
          celcius1: res.data.list[0].main.feels_like,
          celcius2: res.data.list[8].main.feels_like,
          celcius3: res.data.list[16].main.feels_like,
          celcius4: res.data.list[24].main.feels_like,
          celcius5: res.data.list[32].main.feels_like,
          country: res.data.city.country,
          city: res.data.city.name,
          status: res.data.list[0].weather[0].main,
          description: res.data.list[0].weather[0].description,
          date: res.data.list[0].dt_txt,
          wind: res.data.list[0].wind.speed,
          humidity: res.data.list[0].main.humidity,
          visibility: res.data.list[0].visibility,
          pressure: res.data.list[0].main.pressure,
          date1: res.data.list[0].dt_txt.slice(0, 10),
          date2: res.data.list[8].dt_txt.slice(0, 10),
          date3: res.data.list[16].dt_txt.slice(0, 10),
          date4: res.data.list[24].dt_txt.slice(0, 10),
          date5: res.data.list[32].dt_txt.slice(0, 10),
          icon1: res.data.list[0].weather[0].icon,
          icon2: res.data.list[8].weather[0].icon,
          icon3: res.data.list[16].weather[0].icon,
          icon4: res.data.list[24].weather[0].icon,
          icon5: res.data.list[32].weather[0].icon,
        });
      } catch (error) {
        console.error("API error:", err.code);
      }
    };
    fetchData();
  }, [sname]);
  return (
    <>
      <div className="container-fliud d-flex align-items-center justify-content-center p-5 bg-success-subtle mt-2">
        <div className="container">
          <div className="row justify-content-around align-items-center gap-2">
            <div className="col-5 p-4 border border-dark-subtle spacial-card d-flex flex-column justify-content-center align-items-center">
              <img
                src={`http://openweathermap.org/img/w/${data.icon1}.png`}
                alt="weather-image"
                style={{ width: "13rem" }}
              />
              <p className="fs-5 mt-2 p-2">
                celsius: {data.celcius1 ? `${data.celcius1}°C` : "Loading..."}
              </p>
            </div>
            
            <div className="col-5 p-4 border border-dark-subtle spacial-card text-center">
              
              <h5 className=" text-start mb-2">Current Status</h5>
              <h3>{data.city || "Loading..."}</h3>
              <p>Date :{data.date1}</p>
              <p>Status: {data.status || "Loading..."}</p>
              <p>
                Humidity: {data.humidity ? `${data.humidity}%` : "Loading..."}
              </p>
              <p>Country: {data.country || "Loading..."}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-info-subtle">
        <div className="row justify-content-center align-items-center g-2 mt-2">
          <div className="col-12">
            <h2>Today's HightLights</h2>
          </div>

          <div className="col-12 d-flex p-2 gap-5 justify-content-center">
            <TodayHighlights
              image={windimage}
              currentData={data.wind}
              title="wind"
            />
            <TodayHighlights
              image={humidityimage}
              currentData={data.humidity}
              title="humidity"
            />
            <TodayHighlights
              image={airpresureimage}
              currentData={data.pressure}
              title="pressure"
            />
            <TodayHighlights
              image={visibilityimage}
              currentData={data.visibility}
              title="visibility"
            />
          </div>
        </div>
      </div>
      <div className="container-fluid bg-danger-subtle mt-5 mb-5 p-3">
        <div className="row  ">
          <div className="col-12">
            <h3>Up Comming day's</h3>
          </div>
          <div className="col-12 d-flex justify-content-center gap-5 ">
            <UpComingDays
              date={data.date2}
              image={data.icon2}
              celcius={data.celcius2}
            />
            <UpComingDays
              date={data.date3}
              image={data.icon3}
              celcius={data.celcius3}
            />
            <UpComingDays
              date={data.date4}
              image={data.icon4}
              celcius={data.celcius4}
            />
            <UpComingDays
              date={data.date5}
              image={data.icon5}
              celcius={data.celcius5}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
