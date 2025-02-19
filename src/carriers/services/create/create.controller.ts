import { Body, Controller, Post } from "@nestjs/common";
import { CreateCarrierService } from "./create.service";
import { createCarrierDto } from "src/carriers/models/dtos/create.dto";

@Controller('carriers')
export class CreateCarrierController {
    constructor(private readonly createCarrierService: CreateCarrierService) { }

    @Post('create')
    async execute(@Body() newCarrier: createCarrierDto) {
        return await this.createCarrierService.execute(newCarrier)
    }
}