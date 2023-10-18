import React from 'react';
import { Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, FormHelperText, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';

const CustomTimeInput = ({ date, onChange }) => {
  const handleChange = (event) => {
    const time = event.target.value;
    onChange(time);
  };

  const value =
    date instanceof Date && !isNaN(date)
      ? // Getting time from Date beacuse `value` comes here without seconds
      date.toLocaleTimeString('it-IT') // HH:mm:ss
      : "00:00:00";

  return (
    <TextField
      size='small'
      type="time"
      inputProps={{
        step: 1, // Set the step value to 1 second
      }}
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
  disabled,
  isSubmitting,
  size,
  rules = {},
  InputProps = {},
  InputLabelProps = {},
  DateTimePickerProps = {},
  ...rest
}) {

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          error={!!error}
          disabled={disabled || isSubmitting}
          size={size}
          {...rest}
        >
          {label && <InputLabel {...InputLabelProps}>{label}</InputLabel>}
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            timeInputLabel={<Typography variant="body2">Time:</Typography>}
            dateFormat="dd/MM/yyyy H:mm:ss"
            showTimeInput
            customTimeInput={<CustomTimeInput />}
            customInput={<OutlinedInput  {...InputProps} label={label} />}
            {...DateTimePickerProps}
          />
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
          {error && <FormHelperText error={!!error}>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
