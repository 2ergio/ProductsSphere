import {z} from 'zod' // zod es una libreria para validaciones

// aca validamos cada campo y damos un mensaje, se valida si el campo debe de ser string, number etc
export const registerSchema = z.object({
    username: z.string({
        required_error: 'El nombre de la tienda es requerido'
    }),

    email: z.string({
        required_error: 'El email es requerido'
    }).email({message: 'Email invalido'}),

    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(8,{
        message: 'La contraseña debe tener almenos 8 caracteres'
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'El email es requerido'
    }).email({message: 'Email invalido'}),
    
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(8,{
        message: 'La contraseña debe tener almenos 8 caracteres'
    })
})
