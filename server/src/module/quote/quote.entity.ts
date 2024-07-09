import { Entity, Column, PrimaryGeneratedColumn, Index, Unique } from 'typeorm'

import Provider from '@@/enum/provider'





@Entity("quotes")
@Unique(["provider", "date"])
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