import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  patronymicName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  department: string;

  @ApiProperty()
  position: string;
}
