import { Injectable, NotFoundException } from "@nestjs/common";
import { FieldsRepository } from "src/fields/models/repository/fields.repository";

@Injectable()
export class DeleteFieldService {
    constructor(private readonly fieldsRepository: FieldsRepository) { }

    async execute(fieldId: number) {
        const deleteResult = await this.fieldsRepository.deleteCarrierField(fieldId);
        if (deleteResult.affected === 0) { throw new NotFoundException("Padrão de leitura não encontrado!") };
        return { message: "Padrão de leitura excluído com sucesso!" }
    }
}