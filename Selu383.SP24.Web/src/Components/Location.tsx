import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface LocationProps {
    onLocationChange: (location: string) => void;
}

const Location: React.FC<LocationProps> = ({ onLocationChange }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const handleLocationChange = (selectedLocation: string) => {
    setSelectedLocation(selectedLocation);
    onLocationChange(selectedLocation);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-9">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <label>&nbsp;Select a location:</label>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9">
          <input
            type="radio"
            id="batonRouge"
            value="Baton Rouge"
            checked={selectedLocation === "Baton Rouge"}
            onChange={() => handleLocationChange("Baton Rouge")}
          />
          <label htmlFor="batonRouge">Baton Rouge</label>
        </div>
        <div className="col-lg-9">
          <input
            type="radio"
            id="newOrleans"
            value="New Orleans"
            checked={selectedLocation === "New Orleans"}
            onChange={() => handleLocationChange("New Orleans")}
          />
          <label htmlFor="newOrleans">New Orleans</label>
        </div>
      </div>
      
    </>
  );
  
};

export default Location;

