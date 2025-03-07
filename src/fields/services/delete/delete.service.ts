import { Injectable, NotFoundException } from "@nestjs/common";
import { FieldsRepository } from "src/fields/models/repository/fields.repository";

@Injectable()
export class DeleteFieldService {
    constructor(private readonly fieldsRepository: FieldsRepository) { }

    async execute(fieldId: number) {
        const deleteResult = await this.fieldsRepository.deleteField(fieldId);
        if (deleteResult.affected === 0) { throw new NotFoundException("Campo não encontrado!") };
        return { message: "Campo excluído com sucesso!" }
    }
}