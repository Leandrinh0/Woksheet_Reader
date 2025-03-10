import { Injectable } from "@nestjs/common";
import { FieldsRepository } from "src/fields/models/repository/fields.repository";

@Injectable()
export class FindFieldByIdService {
    constructor(private readonly fieldsRepository: FieldsRepository) { }

    async execute(fieldId: number) {
        return await this.fieldsRepository.findField(fieldId)
    }
}