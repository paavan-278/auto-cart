import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Ad } from 'src/ad/entity/ad.entity';
import { User } from 'src/user/entity/user.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  categoryName: string;

  @ManyToOne(() => User, (user) => user.categories, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];

  @CreateDateColumn()
  createdAt: Date;
}
