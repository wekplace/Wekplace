export interface SignUpData {
    username: string;
    password: string;
    email: string;
    account: {[key: string]: any};
}

export interface Filter {
    field: string,
    fieldValue: string
}