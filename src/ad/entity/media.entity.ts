import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Ad } from './ad.entity';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Ad, (ad) => ad.media, {
    onDelete: 'CASCADE',
  })
  ad: Ad;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;
}
