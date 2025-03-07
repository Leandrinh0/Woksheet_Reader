import { CarriersEntity } from "src/carriers/models/entity/carriers.entity";
import { FieldsvaluesEntity } from "src/fields-values/models/entities/fields-values.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'padrao_leitura',
    schema: process.env.DB_SCHEMA
})
export class ReadingPatternEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, name: 'nome', type: 'varchar' })
    name: string

    @ManyToOne(() => CarriersEntity, (carrier) => carrier.readingPatterns)
    @JoinColumn({ name: "id_transportadoras", referencedColumnName: 'id' })
    carrier: CarriersEntity

    @OneToMany(() => FieldsvaluesEntity, (value) => value.readingPattern)
    fieldsValues: FieldsvaluesEntity[]

}