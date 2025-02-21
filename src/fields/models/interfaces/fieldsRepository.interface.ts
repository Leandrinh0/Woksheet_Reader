import { FieldsEntity } from "../entity/fields.entity";

export interface FieldsRepositoryInterface {
    findFields(fieldId: number): Promise<FieldsEntity>
    create(newField: FieldsEntity): Promise<number>
    findCarrierFields(carrierId: number): Promise<FieldsEntity[]>
}