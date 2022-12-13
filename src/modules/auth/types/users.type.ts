import { ApiProperty } from "@nestjs/swagger";

export class UsersType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fio: string;
}
