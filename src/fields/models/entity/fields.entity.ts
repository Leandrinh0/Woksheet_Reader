import { CarriersEntity } from "src/carriers/models/entity/carriers-entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'campos',
    schema: 'worksheet'
})
export class FieldsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, name: 'nome', type: 'varchar' })
    name: string

    @Column({ nullable: true, name: 'origem_indice', type: 'varchar', length: 8 })
    originIndex: string

    @Column({ nullable: true, name: 'destino_indice', type: 'varchar', length: 8 })
    destinationIndex: string

    @Column({ nullable: true, name: 'prazo_indice', type: 'varchar', length: 8 })
    deadlineIndex: string

    @Column({ nullable: true, name: 'cep_indice', type: 'varchar', length: 8 })
    cepIndex: string

    @Column({ nullable: true, name: 'distancia_indice', type: 'varchar', length: 8 })
    distanceIndex: string

    @Column({ nullable: true, name: 'preco_indice', type: 'varchar', length: 8 })
    fixPriceIndex: string

    @ManyToOne(() => CarriersEntity, (carrier) => carrier.fields, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'id_transportadora' })
    carrier: CarriersEntity
}