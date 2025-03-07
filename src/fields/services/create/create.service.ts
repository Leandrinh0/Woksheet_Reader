import { Injectable, NotFoundException } from "@nestjs/common";
import { CarriersRepository } from "src/carriers/models/repository/carriers.repository";
import { CreateFieldDto } from "src/fields/models/dtos/create.dto";
import { FieldsEntity } from "src/fields/models/entity/fields.entity";
import { FieldsRepository } from "src/fields/models/repository/fields.repository";

@Injectable()
export class CreateFieldService {
    constructor(
        private readonly fieldsRepository: FieldsRepository,
        private readonly carriersRepository: CarriersRepository
    ) { }

    async execute(fieldData: CreateFieldDto) {
        const selectedCarrier = await this.carriersRepository.findOne(fieldData.carrierId);
        if (!selectedCarrier) { throw new NotFoundException("Transportadora não encontrada") }

        const newField = new FieldsEntity();
        newField.name = fieldData.name;
        const savedField = await this.fieldsRepository.create(newField);
        return { message: `Campo salvo com sucesso!: ${savedField}` }
    }
}