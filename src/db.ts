import { DataSource } from 'typeorm'
import {
  Brand,
  Cafeteria,
  Campus,
  Employee,
  Item,
  Supplier,
  User,
  UserType,
  Sale,
  Login,
} from './model'
import * as dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT) || 0,
  username: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  database: process.env.NAME || '',
  synchronize: true,
  // logging: true,
  entities: [
    UserType,
    User,
    Campus,
    Supplier,
    Cafeteria,
    Brand,
    Item,
    Employee,
    Sale,
    Login,
  ],
})
