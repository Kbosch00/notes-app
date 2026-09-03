#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/01e21a0ba01a31e4f84c71ef4e50ed7eadc9f1413aa870caaa03558960f84df8/contract';
import endContract from '../../snapshots/01e21a0ba01a31e4f84c71ef4e50ed7eadc9f1413aa870caaa03558960f84df8/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/96ef532fe95a92a41f943292bf1e511ab29364e77108af1778d8c57b36e68fdd/contract';
import startContract from '../../snapshots/96ef532fe95a92a41f943292bf1e511ab29364e77108af1778d8c57b36e68fdd/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [this.dropNotNull({ schema: 'public', table: 'note', column: 'content' })];
  }
}

MigrationCLI.run(import.meta.url, M);
