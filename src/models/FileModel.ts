import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../db/config'

interface FileAttributes {
    id : number;
    name: string;
    size: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FileInput extends Optional<FileAttributes, 'id' | 'createdAt'|'updatedAt'> {}
export interface FileOuput extends Optional<FileAttributes, 'updatedAt'> {}

class File extends Model<FileAttributes, FileInput> implements FileAttributes {
    public id!: number
    public name!: string
    public size!: number;
    public readonly createdAt!: Date;
}

File.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    size: {
      type: DataTypes.NUMBER,
      allowNull: false,
    }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    // paranoid: true
  })

export default File