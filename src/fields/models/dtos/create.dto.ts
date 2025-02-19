import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFieldDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    carrierId: number

    @IsString()
    @IsOptional()
    originIndex?: string

    @IsOptional()
    @IsString()
    destinationIndex: string

    @IsOptional()
    @IsString()
    deadlineIndex: string

    @IsOptional()
    @IsString()
    cepIndex: string

    @IsOptional()
    @IsString()
    distanceIndex: string

    @IsOptional()
    @IsString()
    fixPriceIndex: string
}