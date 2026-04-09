import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'nestjs-soap';

@Injectable()
export class SoapToRestService {
  constructor(
    @Inject('CALCULATOR_CLIENT') private readonly client: Client,
  ) {}

  async add(intA: number, intB: number): Promise<number> {
    const [result] = await this.client.AddAsync({ intA, intB });
    return result.AddResult;
  }

  async subtract(intA: number, intB: number): Promise<number> {
    const [result] = await this.client.SubtractAsync({ intA, intB });
    return result.SubtractResult;
  }

  async multiply(intA: number, intB: number): Promise<number> {
    const [result] = await this.client.MultiplyAsync({ intA, intB });
    return result.MultiplyResult;
  }

  async divide(intA: number, intB: number): Promise<number> {
    if (intB === 0) throw new Error('Division by zero');
    const [result] = await this.client.DivideAsync({ intA, intB });
    return result.DivideResult;
  }
}