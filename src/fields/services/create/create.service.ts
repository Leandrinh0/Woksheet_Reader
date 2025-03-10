import { Injectable } from "@nestjs/common";
import { FieldsEntity } from "src/fields/models/entity/fields.entity";
import { FieldsRepository } from "src/fields/models/repository/fields.repository";

@Injectable()
export class CreateFieldService {
    constructor(
        private readonly fieldsRepository: FieldsRepository,
    ) { }

    async execute(fieldName: string) {
        const newField = new FieldsEntity;
        newField.name = fieldName;
        return await this.fieldsRepository.create(newField);
    }
}