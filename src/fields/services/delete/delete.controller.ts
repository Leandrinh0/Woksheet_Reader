import { Controller, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { DeleteFieldService } from "./delete.service";

@Controller('fields')
export class DeleteFieldController {
    constructor(private readonly deleteFieldService: DeleteFieldService) { }

    @Delete('delete/:fieldId')
    async delete(@Param('fieldId', ParseIntPipe) fieldId: number) {
        return await this.deleteFieldService.execute(fieldId)
    }
}