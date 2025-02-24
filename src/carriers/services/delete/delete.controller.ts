import { Controller, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { DeleteCarrierService } from "./delete.service";

@Controller('carriers')
export class DeleteCarrierController {
    constructor(private readonly deleteCarrierService: DeleteCarrierService) { }

    @Delete('delete/:carrierId')
    async execute(@Param('carrierId', ParseIntPipe) carrierId: number) {
        return await this.deleteCarrierService.execute(carrierId)
    }
}