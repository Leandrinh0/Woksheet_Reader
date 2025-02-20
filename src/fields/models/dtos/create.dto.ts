import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsSpreadsheetCoordinate } from "src/shared/validations/coordinates.validation";

export class CreateFieldDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    carrierId: number

    @IsString()
    @IsOptional()
    @IsSpreadsheetCoordinate({message: 'O valor de "originIndex" deve ser uma coordenada válida de planilha, podendo ser apenas a coordenada inicial ou também a inicial junto com a final. (ex: A1 ou A1-A10)'})
    originIndex?: string

    @IsOptional()
    @IsString()
    @IsSpreadsheetCoordinate({message: 'O valor de "destinationIndex" deve ser uma coordenada válida de planilha, podendo ser apenas a coordenada inicial ou também a inicial junto com a final. (ex: A1 ou A1-A10)'})
    destinationIndex: string

    @IsOptional()
    @IsString()
    @IsSpreadsheetCoordinate({message: 'O valor de "deadlineIndex" deve ser uma coordenada válida de planilha, podendo ser apenas a coordenada inicial ou também a inicial junto com a final. (ex: A1 ou A1-A10)'})
    deadlineIndex: string

    @IsOptional()
    @IsString()
    @IsSpreadsheetCoordinate({message: 'O valor de "cepIndex" deve ser uma coordenada válida de planilha, podendo ser apenas a coordenada inicial ou também a inicial junto com a final. (ex: A1 ou A1-A10)'})
    cepIndex: string

    @IsOptional()
    @IsString()
    @IsSpreadsheetCoordinate({message: 'O valor de "distanceIndex" deve ser uma coordenada válida de planilha, podendo ser apenas a coordenada inicial ou também a inicial junto com a final. (ex: A1 ou A1-A10)'})
    distanceIndex: string

    @IsOptional()
    @IsString()
    @IsSpreadsheetCoordinate({message: 'O valor de "fixPriceIndex" deve ser uma coordenada válida de planilha, podendo ser apenas a coordenada inicial ou também a inicial junto com a final. (ex: A1 ou A1-A10)'})
    fixPriceIndex: string
}