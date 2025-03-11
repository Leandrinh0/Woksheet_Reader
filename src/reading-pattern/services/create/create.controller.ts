import { Body, Controller, Post } from "@nestjs/common";
import { CreateReadingPatternService } from "./create.service";
import { CreateReadingPatternDto } from "src/reading-pattern/models/dtos/create.dto";

@Controller('fields')
export class CreatePatternController {
    constructor(private readonly createPatternService: CreateReadingPatternService) { }

    @Post('create')
    async execute(@Body() newPattern: CreateReadingPatternDto) {
        return await this.createPatternService.execute(newPattern)
    }
}