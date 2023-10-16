import React from 'react';
import { Controller } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function InputField({
  name = '',
  label = '',
  placeholder = '',
  control,
  helperText = '',
  multiline = false,
  disabled = false,
  type,
  size,
  InputLabelProps = {},
  InputProps = {},
  rules = {},
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field,
        fieldState: { error },
        formState: { isSubmitting }
      }) =>

        <FormControl
          {...rest}
          error={!!error}
          disabled={disabled || isSubmitting}
          size={size}>

          {label && <InputLabel {...InputLabelProps}>{label}</InputLabel>}

          <OutlinedInput
            {...InputProps}
            {...field}
            value={field.value ?? ''}
            multiline={multiline}
            label={label}
            placeholder={placeholder}
            type={type}
          />

          {helperText && <FormHelperText>
            {helperText}
          </FormHelperText>}
          {error && <FormHelperText error={!!error}>
            {error.message}
          </FormHelperText>}
        </FormControl>}
    />
  );
}
