import { PulsarClient } from '@trigger/pulsar';
import { Job } from '../../decorators/job.decorator';
import { AbstractJob } from '../abstract.job';
import { FibonacciData } from './fibonacci-data.interface';

@Job({
  name: 'Fibonacci',
  description: 'Generates a Fibonacci sequence and stores it in the database.',
})
export class FibonacciJob extends AbstractJob<FibonacciData> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
