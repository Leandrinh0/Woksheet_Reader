import { FieldsEntity } from "../entity/fields.entity";
import { DeleteResult } from 'typeorm'

export interface FieldsRepositoryInterface {
    findField(fieldId: number): Promise<FieldsEntity>
    create(newField: FieldsEntity): Promise<FieldsEntity>
    deleteField(fieldId: number): Promise<DeleteResult>
    findByName(fieldName: string): Promise<FieldsEntity>
}