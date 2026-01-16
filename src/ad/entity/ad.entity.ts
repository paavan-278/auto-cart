import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from 'src/category/entity/category.entity';
import { Media } from './media.entity';
import { VehicleDetails } from './vehicle_details.entity';
import { User } from 'src/user/entity/user.entity';

@Entity('ads')
export class Ad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category, (category) => category.ads)
  category: Category;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  vehicleLicenseNumber?: string;

  @Column()
  itemName: string;

  @Column()
  status: string;

  @Column()
  adType: string;

  @Column({ type: 'int', nullable: true })
  mileageKM?: number;

  @Column({ nullable: true })
  mileage?: string;

  @Column({ nullable: true })
  motNctStatus?: string;

  @Column()
  phoneNumber: string;

  @Column()
  currency: string;

  @Column('decimal')
  amount: number;

  @Column()
  location: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  vanMake?: string;

  @Column({ nullable: true })
  vanModel?: string;

  @Column({ type: 'int', nullable: true })
  vanYear?: number;

  @Column({ nullable: true })
  loadCapacity?: string;

  @OneToMany(() => Media, (media) => media.ad, { cascade: true })
  media: Media[];

  @OneToOne(() => VehicleDetails, (vd) => vd.ad)
  vehicleDetails: VehicleDetails;

  @CreateDateColumn()
  createdAt: Date;
}
