import { CarriersEntity } from "../entity/carriers-entity";

export interface CarriersRepositoryInterface {
    create(carrier: CarriersEntity): Promise<number>
    findOne(carrierId: number): Promise<CarriersEntity>
}