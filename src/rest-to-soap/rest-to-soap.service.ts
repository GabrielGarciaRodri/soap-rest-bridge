import { Injectable } from '@nestjs/common';

@Injectable()
export class RestToSoapService {
  // Parele bolaaaaas que se está acabando el ano y no tengo ni la menor idea de que hacer con mi vida
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }
}