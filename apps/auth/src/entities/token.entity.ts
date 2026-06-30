import { BaseModel } from '@app/common';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AccountsEntity } from './accounts.entity';

@Entity('tokens')
export class TokenEntity extends BaseModel {
  @Column({ type: 'varchar', length: 255 })
  token: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'varchar', length: 255 })
  expiresAt: Date;

  @Column({ type: 'uuid', name: 'account_id' })
  @Index()
  accountId: string;

  @ManyToOne(() => AccountsEntity, (account) => account.tokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account: AccountsEntity;
}
