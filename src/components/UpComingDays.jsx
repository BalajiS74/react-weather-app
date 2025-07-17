import React from "react";
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm, WiCloudy, WiDayCloudy, WiFog } from "react-icons/wi";

function UpComingDays({ date, icon, temp, status }) {
  // Weather icon mapping
  const weatherIcons = {
    "01d": <WiDaySunny size={48} />,
    "01n": <WiDaySunny size={48} />,
    "02d": <WiDayCloudy size={48} />,
    "02n": <WiDayCloudy size={48} />,
    "03d": <WiCloudy size={48} />,
    "03n": <WiCloudy size={48} />,
    "04d": <WiCloudy size={48} />,
    "04n": <WiCloudy size={48} />,
    "09d": <WiRain size={48} />,
    "09n": <WiRain size={48} />,
    "10d": <WiRain size={48} />,
    "10n": <WiRain size={48} />,
    "11d": <WiThunderstorm size={48} />,
    "11n": <WiThunderstorm size={48} />,
    "13d": <WiSnow size={48} />,
    "13n": <WiSnow size={48} />,
    "50d": <WiFog size={48} />,
    "50n": <WiFog size={48} />
  };

  // Card container styles
  const cardStyles = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    width: '160px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    margin: '10px',
    border: '1px solid #f3f4f6',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)'
    }
  };

  // Date styles
  const dateStyles = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  // Temperature styles
  const tempStyles = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '12px 0 8px 0'
  };

  // Status styles
  const statusStyles = {
    fontSize: '14px',
    color: '#6b7280',
    textTransform: 'capitalize',
    textAlign: 'center'
  };

  return (
    <div style={cardStyles}>
      <div style={dateStyles}>{date}</div>
      <div>
        {weatherIcons[icon] || <WiDaySunny size={48} />}
      </div>
      <div style={tempStyles}>{temp}°C</div>
      <div style={statusStyles}>{status}</div>
    </div>
  );
}

export default UpComingDays;