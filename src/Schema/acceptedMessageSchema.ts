import {z} from "zod"

export const acceptedMessageValidation = z.object({
    message: z.boolean()
})