import * as Yup from "yup";

export const validateOrderDetailsWithYup = () => {
  return {
    initialValues: {
      name: "",
      address: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Must be 4 characters or more")
        .required("Required"),
      address: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
      phoneNumber: Yup.string()
        .min(6, "Must be 9 or more")
        .required("Required"),
    }),
  };
};
