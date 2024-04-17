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
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: "8px" }} />
      <select
        value={selectedLocation}
        onChange={(e) => handleLocationChange(e.target.value)}
        style={{ width: "100%" }} // Apply the same width as the DatePicker input box
      >
        <option value="" disabled hidden>Select a Location</option>
        <option value="Baton Rouge">Baton Rouge</option>
        <option value="New Orleans">New Orleans</option>
        <option value="All Locations">All Locations</option>
      </select>
    </div>
  );
  
  
};

export default Location;

