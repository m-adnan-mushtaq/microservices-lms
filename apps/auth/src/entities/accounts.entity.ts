import { BaseModel } from '@app/common';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { TokenEntity } from './token.entity';
import { RoleEntity } from './role.entity';

@Entity('accounts')
export class AccountsEntity extends BaseModel {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name: string;

  @Column({ type: 'varchar', unique: true, length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @OneToMany(() => TokenEntity, (token) => token.account)
  tokens: TokenEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.accounts, {
    cascade: true,
  })
  @JoinTable({
    name: 'accounts_roles',
    joinColumn: {
      name: 'account_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];
}
