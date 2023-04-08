import {Op} from 'sequelize'
// import {GetAllIngredientsFilters} from './types'
import File, { FileInput, FileOuput } from '../../models/FileModel'
import { FileCreateResult, FileDeleteResult } from '../../dto/fileDTO';

export const create = async (payload: FileInput): Promise<FileCreateResult> => {
    const checkIfExist = await File.findOne({where: { name: payload.name}});
    if( checkIfExist == null){
        const file = await File.create(payload)
        return {
            success : true,
            message : 'File Created successfully',
            data : file
        }
    }
    return {
        success : false,
        message : 'File name already exist',
        data : null
    }
}


export const getAll = async (): Promise<FileOuput[]> => {
    return File.findAll()
} 

export const deleteById = async (id: number): Promise<FileDeleteResult> => {
    const deletedFileCount = await File.destroy({
        where: {id}
    })
    if( deletedFileCount > 0)
        return {
            success : true,
            message : 'File Deleted Successfully.'
        }
    return {
        success : false,
        message : 'Error on file delete.'
    }
}

export const getById = async(id: number): Promise<FileOuput | null>=> {
    const file = await File.findByPk(id)
    return file
}