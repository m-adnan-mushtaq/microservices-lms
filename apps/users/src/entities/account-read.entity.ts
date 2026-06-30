import { BaseModel } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity('account_reads')
export class AccountReadEntity extends BaseModel {
  @Column({ type: 'uuid', name: 'account_id', unique: true })
  accountId: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'varchar', array: true, default: '{}' })
  roles: string[];
}
