import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { FindFieldsService } from "./find.service";

@Controller('fields')
export class FindFieldsController {
    constructor(private readonly findFieldsService: FindFieldsService) { }

    @Get('find/:carrierId')
    async execute(@Param('carrierId', ParseIntPipe) carrierId: number) {
        return await this.findFieldsService.execute(carrierId)
    }
}