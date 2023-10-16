import React from 'react';
import { Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

const CustomTimeInput = ({ date, onChangeCustom }) => {
  const value = date instanceof Date && !isNaN(date)
    ? date.toLocaleTimeString("it-IT")
    : "";

  return (
    <input
      type="time"
      step="1"
      value={value}
      onChange={(event) => onChangeCustom(date, event.target.value)}
    />
  );
};

const CustomInput = ({ 
  value = '',
  label,
  placeholder,
  size = 'small',
  onClick
}) => (
  <OutlinedInput
    value={value}
    label={label}
    size={size}
    placeholder={placeholder}
    type="text"
    onClick={onClick}
  />
);

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
            customTimeInput={<CustomTimeInput onChangeCustom={field.onChange} />}
            customInput={<CustomInput label={label} size={size} />}
          />
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
          {error && <FormHelperText error={!!error}>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
