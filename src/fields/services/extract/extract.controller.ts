import { Controller, Post, Req } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { ExtractService } from "./extract.service";

@Controller("extract")
export class ExtractController {
    constructor(private readonly extractService: ExtractService) {}

    @Post('read')
    async uploadFile(@Req() request: FastifyRequest) {
        const data = await request.file();
        if (!data) {
            throw new Error("Nenhum arquivo enviado");
        }

        const extractedData = await this.extractService.execute(data);
        return extractedData;
    }
}
