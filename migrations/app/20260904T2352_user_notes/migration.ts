#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/96ef532fe95a92a41f943292bf1e511ab29364e77108af1778d8c57b36e68fdd/contract';
import startContract from '../../snapshots/96ef532fe95a92a41f943292bf1e511ab29364e77108af1778d8c57b36e68fdd/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/d1c4c91d62c359dd3bb028d79285df12f697cc8bbed7fccadc59a467c5e121e1/contract';
import endContract from '../../snapshots/d1c4c91d62c359dd3bb028d79285df12f697cc8bbed7fccadc59a467c5e121e1/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  placeholder,
  primaryKey,
} from '@prisma/orm-postgres/migration';

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
      this.addColumn({
        schema: 'public',
        table: 'note',
        column: col('userId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-note-userId', {
        check: () => placeholder('backfill-note-userId:check'),
        run: () => placeholder('backfill-note-userId:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'note', column: 'userId' }),
      this.dropNotNull({ schema: 'public', table: 'note', column: 'content' }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'note',
        index: 'note_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'note',
        foreignKey: {
          name: 'note_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
