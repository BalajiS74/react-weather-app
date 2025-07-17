import React from "react";

function TodayHighlights({ icon, value, title, unit }) {
  // Determine the appropriate unit if not provided
  const displayUnit = unit || 
                     (title.includes("Wind") ? "km/h" :
                     (title.includes("Humidity") ? "%" :
                     (title.includes("Pressure") ? "hPa" :
                     (title.includes("Visibility") ? "km" : ""))));

  // Card styles
  const cardStyles = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    minWidth: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
    }
  };

  // Icon styles
  const iconStyles = {
    fontSize: '36px',
    marginBottom: '16px',
    color: title.includes("Wind") ? '#3b82f6' :
          title.includes("Humidity") ? '#06b6d4' :
          title.includes("Pressure") ? '#8b5cf6' :
          '#10b981'
  };

  // Value styles
  const valueStyles = {
    fontSize: '28px',
    fontWeight: '600',
    margin: '8px 0',
    color: '#1f2937'
  };

  // Title styles
  const titleStyles = {
    fontSize: '16px',
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: '8px',
    textTransform: 'capitalize'
  };

  // Unit styles
  const unitStyles = {
    fontSize: '16px',
    fontWeight: '400',
    color: '#9ca3af',
    marginLeft: '4px'
  };

  // Context styles
  const contextStyles = {
    fontSize: '14px',
    color: '#4b5563',
    marginTop: '8px',
    fontStyle: 'italic'
  };

  return (
    <div style={cardStyles}>
      <div style={iconStyles}>{icon}</div>
      <div style={valueStyles}>
        {value || "--"}
        {displayUnit && <span style={unitStyles}>{displayUnit}</span>}
      </div>
      <div style={titleStyles}>{title}</div>
      
      {/* Additional context for certain metrics */}
      {title.includes("Wind") && (
        <div style={contextStyles}>
          {value && parseFloat(value) < 10 ? "Light breeze" :
           value && parseFloat(value) < 20 ? "Moderate wind" :
           value ? "Strong wind" : ""}
        </div>
      )}
      {title.includes("Humidity") && (
        <div style={contextStyles}>
          {value && parseFloat(value) < 40 ? "Dry" :
           value && parseFloat(value) < 70 ? "Comfortable" :
           value ? "Humid" : ""}
        </div>
      )}
    </div>
  );
}

export default TodayHighlights;