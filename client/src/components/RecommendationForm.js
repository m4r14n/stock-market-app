import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CustomDateTimePicker from './fields/CustomDateTimePicker';
import InputField from './fields/InputField';
import { InputAdornment } from '@mui/material';


export default function RecommendationForm({
  form
}) {

  return (
    <Grid
      component='form'
      id='recommendation-form'
      noValidate
      autoComplete='off'
      onSubmit={form?.onSubmit}
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
          fullWidth
          control={form?.control}
          InputProps={{
            fullWidth: true,
          }}
          label={'Start Time'}
          rules={{ required: 'Required field' }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDateTimePicker
          label={'End Time'}
          fullWidth
          InputProps={{
            fullWidth: true,
          }}
          control={form?.control}
          name="endTime"
          rules={{ 
            required: 'Required field',
            validate: (value, { startTime }) => {
              if (value && startTime) {
                return new Date(value) > new Date(startTime) || 'End Time must be after Start Time';
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

