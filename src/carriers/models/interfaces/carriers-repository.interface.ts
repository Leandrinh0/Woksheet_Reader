import { CarriersEntity } from "../entity/carriers-entity";

export interface CarriersRepositoryInterface {
    create(carrier: CarriersEntity): Promise<CarriersEntity>
    findOne(carrierId: number): Promise<CarriersEntity>
}