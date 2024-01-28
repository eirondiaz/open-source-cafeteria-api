import { DataSource } from 'typeorm'
import { Cafeteria, Campus, Supplier, User, UserType } from './model'

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: 'SQL8005.site4now.net',
  port: 1433,
  username: 'db_aa49df_cafeteria_admin',
  password: 'Cafeteria.2024',
  database: 'db_aa49df_cafeteria',
  synchronize: true,
  // logging: true,
  entities: [UserType, User, Campus, Supplier, Cafeteria],
})
