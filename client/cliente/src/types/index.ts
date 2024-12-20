export interface IUser 
{
    name:string,
    email:string,
    handle:string,
}

export type RegisterForm = Pick<IUser,'handle'|'email'|'name'>&{
    password:string,
    password_confirmation:string
}

export type LoginForm = Pick<IUser, 'email'>&{
    password:string
}