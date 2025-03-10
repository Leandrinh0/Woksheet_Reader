import { IsNotEmpty, IsString } from "class-validator";

export class CreateFieldDto {
    @IsNotEmpty()
    @IsString()
    name: string
}