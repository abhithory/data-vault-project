

export enum DataTypeEnum {
    CREDENTIALS = 0,
    FILE = 1,
    INFO = 2,
    OTHER = 3
}

export interface DataStructInterface {
    dataType: DataTypeEnum;
    dataName: string;
    dataHash: string;
    decryptKey: string;
    uploadTime: number;
}

export interface DataExtendedInterface extends DataStructInterface {
    id: string;
    decryptedStatus: boolean;
}

export interface DecryptedCredentialsDataInterface {
    [index: string]: string
}

export interface DecryptedFileDataInterface {
    fileUrl: string
}