import { Injectable } from "@nestjs/common";
import { CarriersRepositoryInterface } from "../interfaces/carriers-repository.interface";
import { CarriersEntity } from "../entity/carriers-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class CarriersRepository implements CarriersRepositoryInterface {
    constructor(
        @InjectRepository(CarriersEntity)
        private readonly carriersRepository: Repository<CarriersEntity>
    ) { }

    async delete(carrierId: number): Promise<DeleteResult> {
        return await this.carriersRepository.delete({ id: carrierId })
    }

    async findAll(): Promise<CarriersEntity[]> {
        return await this.carriersRepository.find()
    }

    async findOne(carrierId: number): Promise<CarriersEntity> {
        return await this.carriersRepository.findOneBy({
            id: carrierId
        })
    }

    async create(carrier: CarriersEntity): Promise<CarriersEntity> {
        const savedCarrier = await this.carriersRepository.save(carrier);
        return savedCarrier;
    }
}