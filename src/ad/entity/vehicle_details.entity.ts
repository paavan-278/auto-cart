import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Ad } from './ad.entity';

@Entity('vehicle_details')
export class VehicleDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Ad, (ad) => ad.vehicleDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ad_id' })
  ad: Ad;

  @Column({ nullable: true })
  trimLevel?: string;

  @Column({ nullable: true })
  model?: string;

  @Column({ nullable: true })
  fuelType?: string;

  @Column({ nullable: true })
  make?: string;

  @Column({ nullable: true })
  year?: number;

  @Column({ nullable: true })
  transmission?: string;

  @Column({ nullable: true })
  trim?: string;

  @Column({ nullable: true })
  doors?: number;

  @Column({ nullable: true })
  bodyType?: string;

  @Column({ nullable: true })
  colour?: string;

  @Column({ nullable: true })
  seats?: number;

  @Column({ nullable: true })
  currentCountryOfReg?: string;

  @Column({ nullable: true })
  imported?: boolean;

  @Column({ nullable: true })
  totalOwner?: number;

  @Column({ nullable: true, type: 'date' })
  nctExpiry?: Date;

  @Column({ nullable: true })
  roadTax?: string;

  @Column({ nullable: true })
  combFuel?: string;

  @Column({ nullable: true })
  ruralFuel?: string;

  @Column({ nullable: true })
  urbanFuel?: string;

  @Column({ nullable: true })
  engineSize?: string;

  @Column({ nullable: true })
  zeroToHundred?: string;

  @Column({ nullable: true })
  power?: string;

  @Column({ nullable: true })
  topSpeed?: string;

  @Column({ nullable: true })
  torque?: string;

  @Column({ nullable: true })
  euroNCASSafety?: string;

  @Column({ nullable: true })
  adultProtection?: string;

  @Column({ nullable: true })
  childProtection?: string;

  @Column({ nullable: true })
  pedestrianProtection?: string;

  @Column({ nullable: true })
  safetyAssistance?: string;

  @Column({ nullable: true })
  externalLength?: string;

  @Column({ nullable: true })
  externalWidth?: string;

  @Column({ nullable: true })
  externalHeight?: string;

  @Column({ nullable: true })
  bootVolume?: string;

  @Column({ nullable: true })
  fuelTankCapacity?: string;
}
