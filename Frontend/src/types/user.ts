export type User = {
    id?: number,
    name?: string,
    sub?: string,
    password?: string,
    isAdmin?: boolean,
    exp?: number
}

export type TokenDecoded = {
    iss: string,
    exp: number,
    sub: string,
    roles: string[],
    admin: boolean
}

