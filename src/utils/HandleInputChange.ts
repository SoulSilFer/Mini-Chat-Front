export const HandleBaseInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  values: Object,
  setValues: React.Dispatch<React.SetStateAction<any>>,
  extraFunction?: any
) => {
  setValues({
    ...values,
    [event.target.name]: event.target.value
  });

  extraFunction && extraFunction();
};
