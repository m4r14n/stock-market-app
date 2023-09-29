import { useForm } from "react-hook-form"
import { getStockRecommendation } from "../services/stockService"


  export default function useStockForm() {
    const { control, formState, watch, handleSubmit, errors, setError } = useForm()


    const onSubmit = async (data) => {
      try {
        const recommendation = await getStockRecommendation(data.startTime, data.endTime, data.maxFunds) ;
        console.log(recommendation);
      } catch (error) {
        console.error('Error:', error)
      }
    }

    return { control, watch, formState, errors, setError, handleSubmit, onSubmit }
  }