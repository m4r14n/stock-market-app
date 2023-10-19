import { useState } from "react";
import { useForm } from "react-hook-form";
import { getStockRecommendation } from "../services/stockService";
import useCustomSnackbar from "./useCustomSnackbar";

export default function useStockRecommendation() {
  const { control, formState, watch, handleSubmit, errors, setError } = useForm();

  const [result, setResult] = useState(null);

  const snackbar = useCustomSnackbar();

  const onSubmit = async (data) => {
    try {
      const { startTime, endTime, maxFunds } = data;
      const recommendation = await getStockRecommendation(startTime, endTime);
      if (recommendation.buy_price > maxFunds) {
        throw new Error('Not enough funds to buy stocks');
      }
      // Calculate the number of stocks that can be bought with maxFunds
      const stocksBought = Math.floor(maxFunds / recommendation.buy_price);
      // Calculate the profit
      const profit = (recommendation.sell_price - recommendation.buy_price) * stocksBought ;

      const result = {
        ...recommendation,
        stocks_bought: stocksBought,
        profit: profit
      };
      setResult(result);
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      snackbar.handleOpen({ message, severity: 'error' });
      setResult(null);
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
