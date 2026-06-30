import { Column, Entity, JoinTable } from 'typeorm';

import { ManyToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { BaseModel } from '@app/common';

@Entity('permissions')
export class PermissionEntity extends BaseModel {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];
}
