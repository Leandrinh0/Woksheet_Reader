import { Controller, Get } from "@nestjs/common";
import { FindAllCarriersService } from "./findAll.service";
import { CarriersEntity } from "src/carriers/models/entity/carriers.entity";

@Controller('carriers')
export class FindAllCarriersController {
    constructor(private readonly findAllCarriersService: FindAllCarriersService) { }

    @Get('findAll')
    async execute(): Promise<CarriersEntity[]> {
        return await this.findAllCarriersService.execute()
    }
}