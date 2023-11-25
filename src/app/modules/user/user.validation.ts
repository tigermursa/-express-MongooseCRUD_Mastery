import { z } from 'zod';

//zod codes here 


const fullNameValidationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
});

const addressValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
});

const orderValidationSchema = z.object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number().int(),
});

const userValidationSchema = z.object({
    userId: z.number().int(),
    username: z.string(),
    password: z.string(),
    fullName: fullNameValidationSchema,
    age: z.number().int(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: addressValidationSchema,
    orders: z.array(orderValidationSchema),
});

export default userValidationSchema;