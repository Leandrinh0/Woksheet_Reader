import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { FindCarrierByIdService } from "src/carriers/services/findById/findById.service";
import { CreateFieldsValuesService } from "src/fields-values/services/create/create.service";
import { CreateReadingPatternDto } from "src/reading-pattern/models/dtos/create.dto";
import { ReadingPatternEntity } from "src/reading-pattern/models/entities/reading-pattern.entity";
import { ReadingPatternRepository } from "src/reading-pattern/models/repositories/reading-pattern.repository";

@Injectable()
export class CreateReadingPatternService {
    constructor(
        private readonly readingPatternRepository: ReadingPatternRepository,
        private readonly findCarrierService: FindCarrierByIdService,
        private readonly createFieldValuesService: CreateFieldsValuesService
    ) { }

    async execute(readingPattern: CreateReadingPatternDto) {
        try {
            const selectedCarrier = await this.findCarrierService.execute(readingPattern.carrierId);
            if (!selectedCarrier) { throw new BadRequestException("Transportadora inválida!") }

            const newReadingPattern = new ReadingPatternEntity;
            newReadingPattern.carrier = selectedCarrier;
            newReadingPattern.name = readingPattern.name;

            const currentReadingPattern = await this.readingPatternRepository.create(newReadingPattern);

            for (const item of readingPattern.fields) {
                await this.createFieldValuesService.execute({ fieldName: item.fieldName, value: item.value, readingSheetId: currentReadingPattern.id })
            }
            return { message: "Sucesso!" }
        } catch (error: any) {
            throw new InternalServerErrorException(error)
        }

    }
}