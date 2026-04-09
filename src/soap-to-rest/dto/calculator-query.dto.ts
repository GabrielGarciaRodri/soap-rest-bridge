import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CalculatorQueryDto {
  @ApiProperty({ description: 'Primer operando', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  a!: number;

  @ApiProperty({ description: 'Segundo operando', example: 5 })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  b!: number;
}

export class DivideQueryDto extends CalculatorQueryDto {}