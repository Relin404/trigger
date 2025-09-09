import { Injectable, OnModuleInit } from '@nestjs/common';
import { PulsarClient, PulsarConsumer } from '@trigger/pulsar';
import { FibonacciData } from './fibonacci-data.interface';
import { iterate } from 'fibonacci';

@Injectable()
export class FibonacciConsumer
  extends PulsarConsumer<FibonacciData>
  implements OnModuleInit
{
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, 'Fibonacci');
  }

  protected async onMessage(message: FibonacciData): Promise<void> {
    const result = iterate(message.iterations);

    this.logger.log(result);
  }
}
