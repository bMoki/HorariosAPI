export type User = {
    iss?: string,
    exp?: number,
    sub?: string,
    roles?: string[],
    admin?: boolean
}

export type TokenDecoded = {
    iss: string,
    exp: number,
    sub: string,
    roles: string[],
    admin: boolean
}

