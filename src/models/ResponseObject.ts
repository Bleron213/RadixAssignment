export interface KeyValuePair {
    key: string;
    value: string;
}

export interface ResponseObject {
    message: string,
    errors: KeyValuePair[],
    data: any,
}