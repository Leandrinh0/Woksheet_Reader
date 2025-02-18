import { FieldsEntity } from "src/fields/models/entity/fields.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'transportadoras',
    schema: 'worksheet'
})
export class CarriersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, name: 'nome', type: 'varchar' })
    name: string

    @OneToMany(() => FieldsEntity, (field) => field.carrier)
    fields: FieldsEntity[]
}