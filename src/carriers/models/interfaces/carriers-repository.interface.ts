import { CarriersEntity } from "../entity/carriers-entity";

export interface CarriersRepositoryInterface {
    create(carrier: CarriersEntity): Promise<void>
    findOne(carrierId: number): Promise<CarriersEntity>
}