import {z} from "zod"

export const messageValidation = z.object({
    content: z.string().min(10,{message:'Content must be 10 characters'}).max(300,{message:'Content more than 300 characters is not allowed'})
})