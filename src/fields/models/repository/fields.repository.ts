import { Injectable } from "@nestjs/common";
import { FieldsRepositoryInterface } from "../interfaces/fieldsRepository.interface";
import { FieldsEntity } from "../entity/fields.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class FieldsRepository implements FieldsRepositoryInterface {
    constructor(
        @InjectRepository(FieldsEntity)
        private readonly fieldsRepository: Repository<FieldsEntity>
    ) { }

    async findByName(fieldName: string): Promise<FieldsEntity> {
        return await this.fieldsRepository.findOne({ where: { name: fieldName } })
    }

    async deleteField(fieldId: number): Promise<DeleteResult> {
        return await this.fieldsRepository.delete({ id: fieldId })
    }

    async create(newField: FieldsEntity): Promise<FieldsEntity> {
        return await this.fieldsRepository.save(newField);
    }

    async findField(fieldId: number): Promise<FieldsEntity> {
        return await this.fieldsRepository.findOne({
            where: {
                id: fieldId
            }
        })
    }
}