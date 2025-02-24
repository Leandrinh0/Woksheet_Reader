import { FieldsEntity } from "../entity/fields.entity";
import { DeleteResult } from 'typeorm'

export interface FieldsRepositoryInterface {
    findFields(fieldId: number): Promise<FieldsEntity>
    create(newField: FieldsEntity): Promise<number>
    findCarrierFields(carrierId: number): Promise<FieldsEntity[]>
    deleteCarrierField(fieldId: number): Promise<DeleteResult>
}