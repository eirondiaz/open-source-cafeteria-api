import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { Brand } from './Brand'
import { Supplier } from './Supplier'

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  description: string

  @Column()
  cost: number

  @Column()
  stock: number

  @ManyToOne((type) => Brand, (brand) => brand.id)
  brandId!: Brand

  @ManyToOne((type) => Supplier, (supplier) => supplier.id)
  supplierId!: Supplier

  @Column({ default: true })
  status: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
