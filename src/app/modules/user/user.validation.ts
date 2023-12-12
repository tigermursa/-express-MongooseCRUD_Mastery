import { z } from 'zod';

// Define Zod schemas for sub-objects
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
  orders: z.array(orderValidationSchema).optional(),
});

const updateUserValidationSchema = z.object({
  userId: z.number().int().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  fullName: fullNameValidationSchema.optional(),
  age: z.number().int().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: addressValidationSchema.optional(),
  orders: z.array(orderValidationSchema).optional(),
});

// export default userValidationSchema;
export const userZodValidation = {
  userValidationSchema,
  updateUserValidationSchema
}