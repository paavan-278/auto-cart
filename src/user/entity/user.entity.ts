import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountType, TradeStatus, UserStatus } from '../enum/user_enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'enum', enum: AccountType })
  account_type: AccountType;

  @Column({ type: 'enum', enum: TradeStatus, default: TradeStatus.NONE })
  trade_status: TradeStatus;

  @Column({ default: false })
  trusted_seller: boolean;

  @Column({ default: false })
  free_ad_used: boolean;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ nullable: true })
  business_name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  contact_person_name: string;

  @Column({ nullable: true })
  vat_number: string;

  @Column({ nullable: true })
  dealer_license: string;

  @Column({ nullable: true })
  business_logo_url: string;

  @Column({ nullable: true })
  instagram_link: string;

  @Column({ nullable: true })
  facebook_link: string;

  @Column({ nullable: true })
  website_link: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
