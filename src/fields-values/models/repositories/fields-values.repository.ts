import { Injectable } from "@nestjs/common";
import { FieldsValuesRepositoryInterface } from "../interfaces/fields-values-repository.interface";
import { FieldsvaluesEntity } from "../entities/fields-values.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm'

@Injectable()
export class FieldsValuesRepository implements FieldsValuesRepositoryInterface {
    constructor(
        @InjectRepository(FieldsvaluesEntity)
        private readonly fieldsValuesRepository: Repository<FieldsvaluesEntity>
    ) { }

    async findOne(id: number): Promise<FieldsvaluesEntity> {
        return await this.fieldsValuesRepository.findOne({ where: { id } })
    }
    async findAll(): Promise<FieldsvaluesEntity[]> {
        return await this.fieldsValuesRepository.find()
    }
    async create(FieldsValues: FieldsvaluesEntity): Promise<FieldsvaluesEntity> {
        return await this.fieldsValuesRepository.save(FieldsValues)
    }
}