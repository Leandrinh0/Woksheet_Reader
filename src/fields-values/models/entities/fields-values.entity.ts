
import { FieldsEntity } from "src/fields/models/entity/fields.entity";
import { ReadingPatternEntity } from "src/reading-pattern/models/entities/reading-pattern.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'campos_valor',
    schema: process.env.DB_SCHEMA
})
export class FieldsvaluesEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, name: 'valor', type: 'varchar' })
    name: string

    @ManyToOne(() => FieldsEntity, (field) => field.fieldValues)
    @JoinColumn({ name: 'id_campos', referencedColumnName: 'id' })
    field: FieldsEntity

    @ManyToOne(() => ReadingPatternEntity, (readingPattern) => readingPattern.fieldsValues)
    @JoinColumn({ name: "id_padrao_leitura", referencedColumnName: 'id' })
    readingPattern: ReadingPatternEntity
}