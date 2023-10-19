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
          control={form?.control}
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
          control={form?.control}
          InputProps={{
            fullWidth: true,
          }}
          rules={{ required: 'Required field' }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDateTimePicker
          name="endTime"
          label={'End Time'}
          fullWidth
          control={form?.control}
          InputProps={{
            fullWidth: true,
          }}
          rules={{
            required: 'Required field',
            validate: (value, { startTime }) => {
              if (value && startTime) {
                return new Date(value) > new Date(startTime) || "The End Time must be greater than the Start Time.";
              }
            }
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

