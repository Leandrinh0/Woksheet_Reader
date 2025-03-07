import { FieldsvaluesEntity } from "src/fields-values/models/entities/fields-values.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'campos',
    schema: process.env.DB_SCHEMA
})
export class FieldsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "nome", type: "character varying", nullable: false })
    name: string

    @OneToMany(() => FieldsvaluesEntity, (value) => value.field)
    fieldValues: FieldsvaluesEntity[]
}