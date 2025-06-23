import z from 'zod';


export const registerSchema = z.object({  
    email: z.string().email("Invalid email address"),
    password: z.string().min(7, "Password must be at least 7 characters long"),
    timezone: z.string().min(1, "Timezone is required"),
});


export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(7, "Password must be at least 7 characters long"),
});