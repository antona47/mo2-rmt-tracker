import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'





@Entity("sessions")
export class Session {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: false })
  user_id: number

  @Column({ length: 64, nullable: false })
  session_token: string

  @Column({ length: 64, nullable: false })
  csrf_token: string

  @Column('timestamptz', { nullable: false })
  valid_until: Date
}