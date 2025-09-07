import { Producer } from 'pulsar-client';
import { PulsarClient, serialize } from '@trigger/pulsar';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export abstract class AbstractJob<T extends object> {
  private producer: Producer;
  protected abstract messageClass: new () => T;

  constructor(private readonly pulsarClient: PulsarClient) {}

  async execute(job: string, data: T) {
    await this.validateData(data);
    if (!this.producer)
      this.producer = await this.pulsarClient.createProducer(job);

    if (Array.isArray(data)) {
      for (const message of data) await this.send(message);

      return;
    }

    await this.send(data);
  }

  private async send(data: T) {
    await this.producer.send({
      data: serialize<T>(data),
    });
  }

  private async validateData(data: T | T[]) {
    if (Array.isArray(data)) {
      for (const item of data) {
        const errors = await validate(plainToInstance(this.messageClass, item));
        if (errors.length)
          throw new BadRequestException(
            `Job data is invalid: ${JSON.stringify(errors)}`
          );
      }
      return;
    }

    const errors = await validate(plainToInstance(this.messageClass, data));
    if (errors.length)
      throw new BadRequestException(
        `Job data is invalid: ${JSON.stringify(errors)}`
      );
  }
}
