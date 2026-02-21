import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateTimeSelector = () => {
  const [journeyDate, setJourneyDate] = React.useState(dayjs());
  const [returnDate, setReturnDate] = React.useState(dayjs().add(1, 'day'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="max-w-4xl mx-auto">
        {/* Date Selection Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Journey Date */}
          <DatePicker
            label="Journey Date"
            value={journeyDate}
            onChange={(newValue) => setJourneyDate(newValue)}
            minDate={dayjs()}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
              },
            }}
          />

          {/* Return Date */}
          <DatePicker
            label="Return Date"
            value={returnDate}
            onChange={(newValue) => setReturnDate(newValue)}
            minDate={journeyDate || dayjs()}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
              },
            }}
          />

        </div>
      </div>
    </LocalizationProvider>
  );
};

export default DateTimeSelector;