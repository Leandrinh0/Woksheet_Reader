import { FieldsEntity } from "../entity/fields.entity";

export interface FieldsRepositoryInterface {
    findFields(carrierId: number): Promise<FieldsEntity>
    create(newField: FieldsEntity): Promise<number>
}