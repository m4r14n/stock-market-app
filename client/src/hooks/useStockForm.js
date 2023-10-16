import { useForm } from "react-hook-form"

export default function useStockForm() {
  const { control, formState, watch, handleSubmit, errors, setError } = useForm()

  return {
    control,
    watch, 
    formState,
    errors, 
    setError,
    handleSubmit,
  }
}