import { IsEmail } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('user_otps')
export class UserOtp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  otp: string;

  @Column({ default: false })
  is_used: boolean;

  @CreateDateColumn()
  created_at: Date;
}
