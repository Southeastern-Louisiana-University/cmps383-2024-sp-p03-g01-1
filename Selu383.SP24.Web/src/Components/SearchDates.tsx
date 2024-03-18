import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const DateRangePicker = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleDateChange = (dates: [Date, Date]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="Select date range"
        popperPlacement="top-start" // Ensure the calendar is displayed above the input
        customInput={
          <div className="date-range-container">
            <div className="row">
              <button className="icon-button" onClick={() => document.getElementById('dateRangeInput')?.focus()}>
                <FontAwesomeIcon icon={faCalendar} />
              </button>
            </div>
            <div className="row">
              <input className="date-input"
                id="dateRangeInput"
                type="text"
                readOnly
                value={startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Select a date range.'}
                
              />
            </div>
          </div>
        }
      />
    );
};

export default DateRangePicker;
