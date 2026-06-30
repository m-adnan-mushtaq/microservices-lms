import { BaseModel } from '@app/common';
import { Column, Entity, ManyToMany } from 'typeorm';
import { AccountsEntity } from './accounts.entity';
import { PermissionEntity } from './permission.entity';

@Entity('roles')
export class RoleEntity extends BaseModel {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToMany(() => AccountsEntity, (account) => account.roles)
  accounts: AccountsEntity[];

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
  permissions: PermissionEntity[];
}
