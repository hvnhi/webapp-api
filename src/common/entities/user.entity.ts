import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
