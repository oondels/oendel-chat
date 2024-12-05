import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({ schema: 'chat', name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  message: string;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
