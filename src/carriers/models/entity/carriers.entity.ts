import { ReadingPatternEntity } from "src/reading-pattern/models/entities/reading-pattern.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'transportadoras',
    schema: process.env.DB_SCHEMA
})
export class CarriersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, name: 'nome', type: 'varchar' })
    name: string

    @OneToMany(() => ReadingPatternEntity, (readingPattern) => readingPattern.carrier)
    readingPatterns: ReadingPatternEntity[]

}