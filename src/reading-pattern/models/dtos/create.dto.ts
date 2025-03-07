import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReadingPatternDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    carrierId: number
}