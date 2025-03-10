import { Injectable } from "@nestjs/common";
import { FieldsRepository } from "src/fields/models/repository/fields.repository";

@Injectable()
export class findFieldsByNameService {
    constructor(private readonly fieldsRepository: FieldsRepository) { }

    async execute(fieldName: string) {
        return await this.fieldsRepository.findByName(fieldName)
    }
}
