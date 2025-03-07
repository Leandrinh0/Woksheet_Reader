import { FieldsvaluesEntity } from "../entities/fields-values.entity";

export interface FieldsValuesRepositoryInterface {
    findOne(id: number): Promise<FieldsvaluesEntity>
    findAll(): Promise<FieldsvaluesEntity[]>
    create(FieldsValues: FieldsvaluesEntity): Promise<FieldsvaluesEntity>
}