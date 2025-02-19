import { Body, Controller, Post } from "@nestjs/common";
import { CreateFieldService } from "./create.service";
import { FieldsEntity } from "src/fields/models/entity/fields.entity";
import { CreateFieldDto } from "src/fields/models/dtos/create.dto";

@Controller('fields')
export class CreateFieldController {
    constructor(private readonly createFieldService: CreateFieldService) { }

    @Post('create')
    async execute(@Body() newField: CreateFieldDto) {
        await this.createFieldService.execute(newField)
    }
}