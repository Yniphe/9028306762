import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
