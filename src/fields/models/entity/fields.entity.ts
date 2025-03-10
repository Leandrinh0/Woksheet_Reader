import { CarriersEntity } from "src/carriers/models/entity/carriers-entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'campos',
    schema: process.env.LISTEN_PORT
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

    @Column({ nullable: true, name: 'cep_origem_indice', type: 'varchar', length: 8 })
    originCepIndex: string

    @Column({ nullable: true, name: 'cep_destino_indice', type: 'varchar', length: 8 })
    destinationCepIndex: string

    @Column({ nullable: true, name: 'distancia_indice', type: 'varchar', length: 8 })
    distanceIndex: string

    @Column({ nullable: true, name: 'preco_indice', type: 'varchar', length: 8 })
    fixPriceIndex: string

    @Column({ nullable: true, name: 't.d.a', type: 'varchar', length: 8 })
    tda: string

    @Column({ nullable: true, name: 't.r.t', type: 'varchar', length: 8 })
    trt: string

    @Column({ nullable: true, name: 't.d.e', type: 'varchar', length: 8 })
    tde: string

    @Column({ nullable: true, name: 't.z.r', type: 'varchar', length: 8 })
    tzr: string

    @ManyToOne(() => CarriersEntity, (carrier) => carrier.fields, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'id_transportadora' })
    carrier: CarriersEntity
}