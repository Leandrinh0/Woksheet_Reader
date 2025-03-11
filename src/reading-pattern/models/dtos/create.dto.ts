import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { IsSpreadsheetCoordinate } from "src/shared/validations/coordinates.validation";

class Field {
    @IsNotEmpty()
    @IsString()
    columnName: string

    @IsNotEmpty()
    @IsString()
    @IsSpreadsheetCoordinate()
    index: string
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