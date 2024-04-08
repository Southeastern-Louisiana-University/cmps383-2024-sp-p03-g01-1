import { useState } from 'react';
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
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "8px" }} />
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="Select date range"
          popperPlacement="top-start" // Ensure the calendar is displayed above the input
          customInput={
            <input className="date-input"
              id="dateRangeInput"
              type="text"
              readOnly
              value={startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : 'Select a date range.'}
              style={{ width: "100%" }}
            />
          }
        />
      </div>
    );
};

export default DateRangePicker;
