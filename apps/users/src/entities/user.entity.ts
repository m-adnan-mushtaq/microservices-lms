import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from '@app/common';

@Entity('users')
export class UserEntity extends BaseModel {
  @Index({ unique: true })
  @Column({ name: 'account_id', type: 'uuid' })
  //refer to auth microservice table accounts
  accountId: string;

  @Column({ type: 'varchar', length: 100 })
  fname: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lname: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  addressLine1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  addressLine2: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  postal: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  displayName: string;
}
