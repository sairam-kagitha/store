import z from "zod"

export const RegisterSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(20, { message: "Username must be at most 20 characters" }),
    email: z
        .string()
        .min(3, { message: "Email must be at least 3 characters" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(30, { message: "Password must be at most 30 characters" }),
})
export type RegisterSchemaType = z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
    email: z
        .string()
        .min(3, { message: "Email must be at least 3 characters" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(30, { message: "Password must be at most 30 characters" }),
})
export type LoginSchemaType = z.infer<typeof LoginSchema>
