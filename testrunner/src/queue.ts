import fastq from 'fastq';

import { config } from './config';
import { execute } from './execute';

export type WorkerTask = {
  setup: string;
  test: string;
  solution: string;
};

const worker = (task: WorkerTask) =>
  execute(task.setup, task.test, task.solution);

export const queue = fastq.promise(worker, config.WORKERS);
