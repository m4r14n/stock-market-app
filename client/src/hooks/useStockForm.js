import { useState } from "react";
import { useForm } from "react-hook-form";
import { getStockRecommendation } from "../services/stockService";
import useCustomSnackbar from "./useCustomSnackbar";

export default function useStockForm() {
  const { control, formState, watch, handleSubmit, errors, setError } = useForm();

  const [result, setResult] = useState(null);

  const snackbar = useCustomSnackbar();

  const onSubmit = async (data) => {
    try {
      const { startTime, endTime, maxFunds } = data;
      const recommendation = await getStockRecommendation(startTime, endTime, maxFunds);
      setResult(recommendation);
    } catch (error) {
      const message = error.response?.data?.error || error.message;
        snackbar.handleOpen({ message, severity: 'error' });
    }
  };

  return {
    control,
    watch,
    formState,
    errors,
    setError,
    onSubmit: handleSubmit(onSubmit),
    result,
    snackbar
  };
}
