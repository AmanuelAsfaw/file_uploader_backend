import { Dialect, Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST as string
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD

/*const sequelizeConnection1 = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost, 
  dialect: dbDriver
})*/

const sequelizeConnection = new Sequelize(
  dbName == undefined?'file_uploader': dbName,
  dbUser == undefined?'root': dbUser,
  dbPassword == undefined?'root': dbPassword, 
  {
  host: dbHost == undefined?'localhost': dbHost,
  dialect: dbDriver == undefined?'mysql': dbDriver
  })

export default sequelizeConnection