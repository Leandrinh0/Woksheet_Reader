import { Injectable } from "@nestjs/common";
import { CarriersEntity } from "src/carriers/models/entity/carriers-entity";
import { CarriersRepository } from "src/carriers/models/repository/carriers.repository";

@Injectable()
export class CreateCarrierService {
    constructor(private readonly carriersRepository: CarriersRepository) { }

    async execute(carrier: CarriersEntity) {
        await this.carriersRepository.create(carrier)
    }
}