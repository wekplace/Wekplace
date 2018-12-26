export interface SignUpData {
    username: string;
    password: string;
    email: string;
    account: {[key: string]: any};
}

export interface LoginData {
    userLogin: string;
    password: string;
}

export interface Filter {
    field: string,
    fieldValue: string
}
