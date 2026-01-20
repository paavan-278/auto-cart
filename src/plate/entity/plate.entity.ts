import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('plates')
export class PlateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  number_plate: string;

  @Column({ nullable: true })
  vehicle_color: string;

  @Column({ nullable: true })
  body_type: string;

  @Column({ nullable: true })
  make: string;

  @Column({ nullable: true })
  model: string;

  @Column('float', { nullable: true })
  confidence: number;

  @CreateDateColumn()
  created_at: Date;
}
