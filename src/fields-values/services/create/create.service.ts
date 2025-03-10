import { BadRequestException, Injectable } from "@nestjs/common";
import { FieldsvaluesEntity } from "src/fields-values/models/entities/fields-values.entity";
import { CreateFieldsValuesInterface } from "src/fields-values/models/interfaces/create.interface";
import { FieldsValuesRepository } from "src/fields-values/models/repositories/fields-values.repository";
import { CreateFieldService } from "src/fields/services/create/create.service";
import { findFieldsByNameService } from "src/fields/services/findByName/findByNames.service";
import { FindPatternByIdService } from "src/reading-pattern/services/findById/findById.service";

@Injectable()
export class CreateFieldsValuesService {
    constructor(
        private readonly fieldsValuesRepository: FieldsValuesRepository,
        private readonly findFieldService: findFieldsByNameService,
        private readonly createFieldService: CreateFieldService,
        private readonly findPatternService: FindPatternByIdService
    ) { }

    async execute(newValue: CreateFieldsValuesInterface) {
        try {
            const selectedField = await this.findFieldService.execute(newValue.fieldName);
            const selectedPattern = await this.findPatternService.execute(newValue.readingSheetId)
            if (!selectedPattern) { throw new BadRequestException("Padrão de leitura inválido!") }

            const newFieldValue = new FieldsvaluesEntity
            newFieldValue.value = newValue.value
            newFieldValue.field = selectedField ?? await this.createField(newValue.fieldName)
            newFieldValue.readingPattern = selectedPattern

            return await this.fieldsValuesRepository.create(newFieldValue)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    private createField = async (fieldName: string) => {
        return await this.createFieldService.execute(fieldName)
    }
}