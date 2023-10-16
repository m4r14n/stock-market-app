import React from 'react';
import { Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

const CustomTimeInput = ({ date, onChangeCustom }) => {
  const handleChange = (event) => {
    const time = event.target.value;
    const [hh, mm, ss] = time.split(":");
    const updatedDate = new Date(date);
    updatedDate.setHours(Number(hh) || 0, Number(mm) || 0, Number(ss) || 0);
    onChangeCustom(updatedDate);
  };

  const value =
    date instanceof Date && !isNaN(date)
      ? // Getting time from Date beacuse `value` comes here without seconds
      date.toLocaleTimeString("it-IT")
      : "00:00:00";

  return (
    <input
      type="time"
      step="1"
      value={value}
      onChange={handleChange}
    />
  );
};


export default function CustomDateTimePicker({
  name,
  control,
  defaultValue = null,
  label,
  helperText,
  error,
  disabled,
  isSubmitting,
  size,
  InputLabelProps = {},
}) {

  const handleChangeTime = (date, time) => {
    const [hh, mm, ss] = time.split(":");
    const targetDate = date instanceof Date && !isNaN(date) ? date : new Date();
    targetDate.setHours(Number(hh) || 0, Number(mm) || 0, Number(ss) || 0);

    // Now `targetDate` contains the selected date and time
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl
          error={!!error}
          disabled={disabled || isSubmitting}
          size={size}
        >
          {label && <InputLabel {...InputLabelProps}>{label}</InputLabel>}
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm:ss aa"
            showTimeInput
            customTimeInput={<CustomTimeInput date={field.value} onChangeCustom={field.onChange} />}
            customInput={<OutlinedInput label={label} />}
            // onChangeRaw={(e) => handleChangeTime(field.value, e.target.value)}
          />
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
          {error && <FormHelperText error={!!error}>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
