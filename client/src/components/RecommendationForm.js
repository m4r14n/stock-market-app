import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CustomDateTimePicker from './fields/CustomDateTimePicker';
import InputField from './fields/InputField';
import { InputAdornment } from '@mui/material';


export default function RecommendationForm({
  form,
  onSubmit
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
      sx={{ px: 4, py: 2, mt:2 }}
    >
      <Grid item xs={12}>
        <InputField
          name="maxFunds"
          label='Available Funds'
          control={form?.control}
          InputProps={{
            startAdornment: <InputAdornment position="start"> $
            </InputAdornment>,
          }}
          sx={{ maxWidth: 212 }}
          rules={{ required: 'Max Funds is required' }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDateTimePicker
          name="startTime"
          label={'Start Time'}
          rules={{ required: 'Start Time is required' }}
          control={form?.control}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDateTimePicker
          label={'End Time'}
          name="endTime"
          rules={{ required: 'End Time is required' }}
          control={form?.control} />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary" size='large'>
          Recommend
        </Button>
      </Grid>
    </Grid>
  );
};

