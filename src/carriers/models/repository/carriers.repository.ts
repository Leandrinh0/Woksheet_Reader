import { Injectable } from "@nestjs/common";
import { CarriersRepositoryInterface } from "../interfaces/carriers-repository.interface";
import { CarriersEntity } from "../entity/carriers-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CarriersRepository implements CarriersRepositoryInterface {
    constructor(
        @InjectRepository(CarriersEntity)
        private readonly carriersRepository: Repository<CarriersEntity>
    ) { }
    
    async create(carrier: CarriersEntity): Promise<void> {
        await this.carriersRepository.save(carrier)
    }
}