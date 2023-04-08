import * as fileDataAccess from '../db/data_access/FileDTA'
import {CreateFileDTO, FileCreateResult, FileDeleteResult, FileOuputDTO} from '../dto/fileDTO'

const fs = require("fs");

export const create = async(payload: CreateFileDTO): Promise<FileCreateResult> => {
    return fileDataAccess.create(payload)
}

export const getAll = async (): Promise<FileOuputDTO[]> => {
    return fileDataAccess.getAll()
}

export const deleteById = async (id: number): Promise<FileDeleteResult> => {
    var file = await fileDataAccess.getById(id)
    console.log(file);
    
    if(file == null)
    {
        console.log('File not found');
        
        return {
            success: false,
            message: 'File not found.'
        }
    }
    
    var file_dir = __dirname + '../../../uploads/'+file.name;
    fs.unlink(file_dir, (err: any) => {
        console.log(err);
        
        if(err !== null && err !== undefined){            
            return {
                success: false,
                message: 'File not removed.'
            }
        }
    })
    return fileDataAccess.deleteById(id)
}