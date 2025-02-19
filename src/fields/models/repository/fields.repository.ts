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

    async create(newField: FieldsEntity): Promise<void> {
        await this.fieldsRepository.save(newField);
    }
    
    async findFields(carrierId: number): Promise<FieldsEntity> {
        return await this.fieldsRepository.findOne({
            where: {
                id: carrierId
            }
        })
    }
}