export interface IUser 
{
    name:string,
    email:string,
    handle:string,
    _id:string,
    description:string,
    image:string,
    links:string
}

export type RegisterForm = Pick<IUser,'handle'|'email'|'name'>&{
    password:string,
    password_confirmation:string
}

export type LoginForm = Pick<IUser, 'email'>&{
    password:string
}

export type ProfileForm = Pick<IUser, 'handle'|'description'>

export type socialNetwork = {
    id:number,
    name:string,
    url:string,
    enabled:boolean
}

export type DevTreeLink = Pick<socialNetwork, 'enabled' | 'name' | 'url'>