import { Body, Controller, Post } from "@nestjs/common";
import { CreateFieldService } from "./create.service";

@Controller('fields')
export class CreateFieldController {
    constructor(private readonly createFieldService: CreateFieldService) { }

    @Post('create')
    async execute(@Body() fieldName: string) {
        return await this.createFieldService.execute(fieldName)
    }
}