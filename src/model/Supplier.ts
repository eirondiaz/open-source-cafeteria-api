import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Supplier extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  comercialName: string

  @Column({ unique: true })
  rnc: string

  @Column({ default: true })
  status: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
