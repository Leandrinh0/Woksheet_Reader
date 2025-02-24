import { CarriersEntity } from "../entity/carriers-entity";
import { DeleteResult } from 'typeorm'

export interface CarriersRepositoryInterface {
    create(carrier: CarriersEntity): Promise<CarriersEntity>
    findOne(carrierId: number): Promise<CarriersEntity>
    findAll(): Promise<CarriersEntity[]>
    delete(carrierId: number): Promise<DeleteResult>
}