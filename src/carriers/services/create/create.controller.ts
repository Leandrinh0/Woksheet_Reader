import { Body, Controller, Post } from "@nestjs/common";
import { CreateCarrierService } from "./create.service";
import { CarriersEntity } from "src/carriers/models/entity/carriers-entity";

@Controller('carriers')
export class CreateCarrierController {
    constructor(private readonly createCarrierService: CreateCarrierService) { }

    @Post('create')
    async execute(@Body() newCarrier: CarriersEntity) {
        await this.createCarrierService.execute(newCarrier)
    }
}