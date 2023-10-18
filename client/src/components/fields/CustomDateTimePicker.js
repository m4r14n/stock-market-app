import React from 'react';
import { Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles.css";
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';


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
            popperClassName='custom-datepicker'
            onChange={(date) => field.onChange(date)}
            dateFormat="dd/MM/yyyy H:mm"
            timeFormat="H:mm"
            showTimeSelect
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
