import React from 'react';
import { Controller } from 'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, FormHelperText } from '@mui/material';


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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label={label}
              value={field.value}
              onChange={(newValue) => field.onChange(newValue)}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
            />
          </LocalizationProvider>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
          {error && <FormHelperText error={!!error}>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
