import {z} from 'zod' // zod es una libreria para validaciones

// aca validamos cada campo y damos un mensaje, se valida si el campo debe de ser string, number etc

export const CreateProduct = z.object({
    nombre: z.string({
        required_error: "El nombre es requerido"
    }),
    descripcion: z.string({
        required_error: "La descripcion es requerida"
    }),
    precio: z.number({
        required_error: "El precio es requerido"
    }),
    categoria: z.string({
        required_error: "La categoria es requerida"
    }),
    cantidad: z.number({
        required_error: "la cantidad es requerida"
    }),
})