import { Module } from '@nestjs/common';
import { PulsarModule } from '@trigger/pulsar';
import { FibonacciConsumer } from './fibonacci/fibonacci.consumer';

@Module({
  imports: [PulsarModule],
  providers: [FibonacciConsumer],
})
export class JobsModule {}
