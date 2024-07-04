import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

import Provider from '@@/enum/provider'





@Entity("sales")
export class Sale {
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column({ nullable: false })
  provider: Provider

  @Index()
  @Column({ length: 30, nullable: false })
  buyer: string

  @Column('int', { nullable: false })
  amount: number

  @Column({ length: 100, nullable: false })
  comment: string

  @Index()
  @Column('timestamptz', { nullable: false })
  date: Date
}