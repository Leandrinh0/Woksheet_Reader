import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

class Field {
    @IsNotEmpty()
    @IsString()
    fieldName: string

    @IsNotEmpty()
    @IsString()
    value: string
}

export class CreateReadingPatternDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    carrierId: number

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => Field)
    fields: Array<Field>
}