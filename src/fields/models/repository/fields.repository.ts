import { Injectable } from "@nestjs/common";
import { FieldsRepositoryInterface } from "../interfaces/fieldsRepository.interface";
import { FieldsEntity } from "../entity/fields.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FieldsRepository implements FieldsRepositoryInterface {
    constructor(
        @InjectRepository(FieldsEntity)
        private readonly fieldsRepository: Repository<FieldsEntity>
    ) { }

    async findCarrierFields(carrierId: number): Promise<FieldsEntity[]> {
        return await this.fieldsRepository.find({ where: { carrier: { id: carrierId } } })
    }

    async create(newField: FieldsEntity): Promise<number> {
        const savedField = await this.fieldsRepository.save(newField);
        return savedField.id
    }

    async findFields(fieldId: number): Promise<FieldsEntity> {
        return await this.fieldsRepository.findOne({
            where: {
                id: fieldId
            }
        })
    }
}