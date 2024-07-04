import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

import Provider from '@@/enum/provider'





@Entity("quotes")
export class Quote {
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column({ nullable: false })
  provider: Provider

  @Column('int', { nullable: false })
  price: number

  @Column('int', { nullable: false })
  offers: number

  @Index()
  @Column('timestamptz', { nullable: false })
  date: Date
}