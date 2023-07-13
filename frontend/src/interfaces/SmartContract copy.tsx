import { StringDecoder } from "string_decoder";

export interface FileStructInterface{
    fileName: string;
    fileHash: string;
    decryptKey: string;
}


export interface CredentialStruct{
    website: string;
    usernameOrEmailOrPhone: string;
    password: string;
}