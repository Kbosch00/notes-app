#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/a90562313ad214081c2dcc3d8baae51e1db22be7ff26677811707d0efddf0fb4/contract';
import startContract from '../../snapshots/a90562313ad214081c2dcc3d8baae51e1db22be7ff26677811707d0efddf0fb4/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/d1c4c91d62c359dd3bb028d79285df12f697cc8bbed7fccadc59a467c5e121e1/contract';
import endContract from '../../snapshots/d1c4c91d62c359dd3bb028d79285df12f697cc8bbed7fccadc59a467c5e121e1/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
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
