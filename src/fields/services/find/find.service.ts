import { Injectable, NotFoundException } from "@nestjs/common";
import { CarriersRepository } from "src/carriers/models/repository/carriers.repository";
import { FieldsEntity } from "src/fields/models/entity/fields.entity";
import { FieldsRepository } from "src/fields/models/repository/fields.repository";

@Injectable()
export class FindFieldsService {
    constructor(
        private readonly fieldsRepository: FieldsRepository,
        private readonly carriersRepository: CarriersRepository
    ) { }

    async execute(carrierId: number): Promise<FieldsEntity[]> {
        const selectedCarrier = await this.carriersRepository.findOne(carrierId);
        if (!selectedCarrier) throw new NotFoundException("A transportadora informada não existe!");
        const fields = await this.fieldsRepository.findCarrierFields(carrierId);
        if (fields.length < 1) {
            throw new NotFoundException(`Nenhum padrão cadastrado para a transportadora ${selectedCarrier.name}`)
        } return fields
    }
}