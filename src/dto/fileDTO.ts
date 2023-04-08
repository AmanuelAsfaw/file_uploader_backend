import { FileOuput } from "../models/FileModel";

export interface CreateFileDTO {
    id: number| undefined;
    name: string;
    size: number;
    createdAt: Date| undefined;
}

export interface FileOuputDTO {
    id : number;
    name: string;
    size: number;
    createdAt?: Date;
}

export interface FileCreateResult{
    success: boolean;
    message: string;
    data : FileOuput | null;
}

export interface FileDeleteResult{
    success: boolean;
    message: string;
}