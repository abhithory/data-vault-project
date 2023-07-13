

export enum DataTypeEnum{
    CREDENTIALS = 0,
    FILE = 1,
    INFO = 2,
    OTHER = 3
}

export interface DataStructInterface{
    dataType: DataTypeEnum;
    name: string;
    fileHash: string;
    decryptKey: string;
    uploadTime: number;
}

export interface DataExtendedInterface{
    dataType: DataTypeEnum;
    name: string;
    fileHash: string;
    decryptKey: string;
    uploadTime: number;
}