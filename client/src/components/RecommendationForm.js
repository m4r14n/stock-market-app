import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputField from './fields/InputField';
import { InputAdornment } from '@mui/material';
import CustomDateTimePicker from './fields/CustomDateTimePicker';


export default function RecommendationForm({
  form,
  onSubmit,
}) {

  const { control, watch } = form;
  const startTime = watch('startTime');

  const validateEndTime = (value) => {
    const startDateTime = new Date(startTime);
    const endDateTime = new Date(value);

    if (endDateTime <= startDateTime) {
      return "End Time must be greater than Start Time.";
    }  
    return true; // Validation passed
  }

  return (
    <Grid
      component='form'
      id='recommendation-form'
      noValidate
      autoComplete='off'
      onSubmit={onSubmit}
      container
      spacing={2}
      sx={{ px: 1, py: 2 }}
    >
      <Grid item xs={12}>
        <InputField
          name="maxFunds"
          fullWidth
          label='Available Funds'
          control={control}
          InputProps={{
            startAdornment: <InputAdornment position="start"> $
            </InputAdornment>,
          }}
          rules={{
            required: 'Required field',
            pattern: {
              value: /^[0-9]+(\.[0-9]{1,2})?$/,
              message: 'Invalid input. Please enter a number with up to 2 decimal places.'
            }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDateTimePicker
          name="startTime"
          label={'Start Time'}
          fullWidth
          control={control}
          rules={{ required: 'Required field' }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDateTimePicker
          name="endTime"
          label={'End Time'}
          fullWidth
          control={control}
          rules={{
            required: 'Required field',
            validate: validateEndTime
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" form="recommendation-form" color="primary" size='large'>
          Recommend
        </Button>
      </Grid>
    </Grid>
  );
};

