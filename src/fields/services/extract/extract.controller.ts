import { BadRequestException, Controller, Param, ParseIntPipe, Post, Req } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { ExtractService } from "./extract.service";

@Controller("fields")
export class ExtractController {
    constructor(private readonly extractService: ExtractService) { }

    @Post('read/:readId')
    async uploadFile(
        @Param("readId", new ParseIntPipe({ 
            exceptionFactory: () => new BadRequestException("O parâmetro readId deve ser um número inteiro válido.") 
        })) fieldId: number,
        @Req() request: FastifyRequest
    ) {
        const data = await request.file();
        if (!data) { throw new BadRequestException("Nenhum arquivo enviado"); }

        const extractedData = await this.extractService.execute(data, fieldId);
        return extractedData;
    }
}
