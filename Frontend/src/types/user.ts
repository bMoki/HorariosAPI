export type User = {
    iss?: string,
    exp?: number,
    sub?: string,
    roles?: string[],
    admin?: boolean
}

export type Roles = {
    id?: number,
    name?: string
}

export type UserDetail = {
    id?: number,
    name?: string,
    username?: string,
    password?: string,
    admin?: boolean
}

export type UserPage = {
    content?: UserDetail[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
    size?: number;
    numberOfElements?: number;
    first: boolean;
    empty?: boolean;
}
