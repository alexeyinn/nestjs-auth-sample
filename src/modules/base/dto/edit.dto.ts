import { ApiProperty } from '@nestjs/swagger';

export class EditDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  expiryDate: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  reagentUnit: string;

  @ApiProperty()
  reagentPurity: string;

  @ApiProperty()
  standard: string;

  @ApiProperty()
  batchNumber: string;

  @ApiProperty()
  dateOfManufacture: string;

  @ApiProperty()
  arrivalDate: string;

  @ApiProperty()
  invoice: string;

  @ApiProperty()
  manufacturer: string;

  @ApiProperty()
  provider: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  warningPeriod: string;
}
