import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  cedula: string

  @Column()
  workShift: string

  @Column()
  admissionDate: string

  @Column()
  commissionPercentage: string

  @Column({ default: true })
  status: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
