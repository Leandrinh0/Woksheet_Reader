import { Injectable } from "@nestjs/common";
import { FieldsValuesRepository } from "src/fields-values/models/repositories/fields-values.repository";

@Injectable()
export class FindPatternValuesService {
    constructor(private readonly fieldsValuesRepository: FieldsValuesRepository) { }

    async execute(readingPatternId: number) {
        return await this.fieldsValuesRepository.findPatternValues(readingPatternId)
    }
}