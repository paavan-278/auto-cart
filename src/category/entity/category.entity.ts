import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Ad } from 'src/ad/entity/ad.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  categoryName: string;

  @Column({type: 'text', nullable:true})
  imageUrl: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];

  @CreateDateColumn()
  createdAt: Date;
}
