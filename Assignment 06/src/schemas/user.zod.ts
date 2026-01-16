import z from "zod";
export const userZod=z.object({
    name:z.string().trim().min(1,"Enter a valid name"),
    email:z.string().email("Invalid Email"),
    password:z.string().min(8,"password must be greater than 8"),
    age:z.number().min(18,"User's age must be greater than 18"),
    role:z.string().optional()
});
export const paramsZod=z.object({
    id:z.string().min(1,"Invalid User Id")
});
export const updateUserZod=userZod.partial().refine(data=>Object.keys(data).length>0,{
    message:"Send Atleast 1 field to update"
})


export const loginZod=z.object({
    email:z.string().email("Invalid Email"),
    password:z.string().min(8,"Password must be greater than or equal to 8")
})
