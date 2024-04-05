import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { Item } from './Item'
import { User } from './User'

@Entity()
export class Sale extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  comment: string

  @Column()
  units: number

  @ManyToOne((type) => Item, (item) => item.id)
  itemId!: Item

  @ManyToOne((type) => User, (user) => user.id)
  userId!: User

  @Column({ default: true })
  status: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
