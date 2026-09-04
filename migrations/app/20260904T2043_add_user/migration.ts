#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/01e21a0ba01a31e4f84c71ef4e50ed7eadc9f1413aa870caaa03558960f84df8/contract';
import startContract from '../../snapshots/01e21a0ba01a31e4f84c71ef4e50ed7eadc9f1413aa870caaa03558960f84df8/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a90562313ad214081c2dcc3d8baae51e1db22be7ff26677811707d0efddf0fb4/contract';
import endContract from '../../snapshots/a90562313ad214081c2dcc3d8baae51e1db22be7ff26677811707d0efddf0fb4/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('passwordHash', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
