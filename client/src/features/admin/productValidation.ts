import * as yup from "yup";

export const validationSchema = yup.object({
    name: yup.string().required("Name is required"),

    brand: yup.string().required("Brand is required"),

    type: yup.string().required("Type is required"),

    price: yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required("Price is required")
        .moreThan(100, "Price must be greater than 100 cents"),

    quantityInStock: yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required("Quantity is required")
        .moreThan(0, "Quantity must be greater than 0"),

    description: yup.string().required("Description is required"),

    file: yup.mixed().when('pictureUrl', {
        is: (value: string) => !value,
        then: schema => schema.required('Please provide an image'),
        otherwise: (schema) => schema.notRequired(),
    })
});
