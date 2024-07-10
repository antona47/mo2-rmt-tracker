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
  amount: number //gold

  @Column({ length: 100, nullable: false })
  comment: string

  @Index()
  @Column('timestamptz', { nullable: false })
  date: Date

  @Column('int', { nullable: false })
  datePrice: number // USD / 10k gold in cents

  @Column('int', { nullable: false })
  value: number // USD in cents
}