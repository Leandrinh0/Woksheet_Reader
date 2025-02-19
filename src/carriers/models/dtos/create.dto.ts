import { IsNotEmpty, IsString } from "class-validator";

export class createCarrierDto {
    @IsNotEmpty()
    @IsString()
    name: string
}