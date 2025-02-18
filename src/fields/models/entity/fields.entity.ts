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

    @Column({ nullable: false, name: 'origem_indice', type: 'varchar', length: 8})
    originIndex: string

    @Column({ nullable: false, name: 'destino_indice', type: 'varchar', length: 8})
    destinationIndex: string

    @Column({ nullable: false, name: 'prazo_indice', type: 'varchar', length: 8})
    deadlineIndex: string

    @Column({ nullable: false, name: 'cep_indice', type: 'varchar', length: 8})
    cepIndex: string
    
    @ManyToOne(() => CarriersEntity, (carrier) => carrier.fields, { onDelete: 'CASCADE' })
    @JoinColumn({ referencedColumnName: 'id', name: 'id_transportadora' })
    carrier: CarriersEntity
}