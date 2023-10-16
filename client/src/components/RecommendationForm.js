import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CustomDateTimePicker from './fields/CustomDateTimePicker';
import InputField from './fields/InputField';


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
      sx={{ py: 2 }}
    >
      <Grid item xs={12}>
        <InputField
          name="maxFunds"
          label='Max Funds (USD)'
          control={form?.control}
          size={'small'}
          rules={{ required: 'Max Funds is required' }}
          type={'number'} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomDateTimePicker
          name="startTime"
          label={'Start Time'}
          rules={{ required: 'Start Time is required' }}
          control={form?.control}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomDateTimePicker
          label={'End Time'}
          name="endTime"
          rules={{ required: 'End Time is required' }}
          control={form?.control} />
      </Grid>

      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

