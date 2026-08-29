import {z} from 'zod'

export const usernameValidation = z.string().min(2).max(20).regex(/^[a-zA-Z0-9_]/)
export const signUpValidation = z.object({
    username:usernameValidation,
    email:z.string().email({message:'invalid email address'}).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: z.string().min(4,"password must be 4 characters").max(20)
})