import { Job } from '../decorators/job.decorator';
import { AbstractJob } from './abstract.job';

@Job({
  name: 'Fibonacci',
  description: 'Generates a Fibonacci sequence and stores it in the database.',
})
export class FibonacciJob extends AbstractJob {}
