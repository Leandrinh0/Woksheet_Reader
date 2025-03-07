import { FieldsEntity } from "../entity/fields.entity";
import { DeleteResult } from 'typeorm'

export interface FieldsRepositoryInterface {
    findFields(fieldId: number): Promise<FieldsEntity>
    create(newField: FieldsEntity): Promise<number>
    deleteField(fieldId: number): Promise<DeleteResult>
}