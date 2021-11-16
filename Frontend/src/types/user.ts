export type User = {
    iss?: string,
    exp?: number,
    sub?: string,
    roles?: string[],
    admin?: boolean
}

type Roles = {
    id?: number,
    name?: string
}

export type UserDetail = {
    id?: number,
    name?: string,
    username?: string,
    password?: string,
    roles?: Roles[]
}