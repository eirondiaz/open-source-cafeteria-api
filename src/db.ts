import { DataSource } from 'typeorm'
import { Cafeteria, Campus, Supplier, User, UserType } from './model'
import * as dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST || '',
  port: Number(process.env.PORT) || 0,
  username: 'db_aa49df_cafeteria_admin',
  password: 'Cafeteria.2024',
  database: 'db_aa49df_cafeteria',
  synchronize: true,
  // logging: true,
  entities: [UserType, User, Campus, Supplier, Cafeteria],
})
