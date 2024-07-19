import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'





@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 20, unique: true, nullable: false })
  discord_id: string

  @Column({ length: 30, nullable: false })
  discord_username: string

  @Column({ length: 30, nullable: false })
  discord_access_token: string

  @Column({ length: 20, nullable: false })
  name: string

  @Column('boolean', { nullable: false, default: false })
  hasAccess: boolean

  @Column('boolean', { nullable: false, default: false })
  isAdmin: boolean

  @Column('timestamptz', { nullable: false, default: "NOW()" })
  first_login: Date

  @Column('timestamptz', { nullable: false })
  last_login: Date
}