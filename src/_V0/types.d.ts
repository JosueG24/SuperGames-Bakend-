export interface user{
    idUser : number
    userName: string
    email:string
    password:string
}

export interface TokenValues{
    nameUser: string,
    email : string,
    password: string
}

export interface responseService{
    status: number
    message: string
    data: any
    error: any
}