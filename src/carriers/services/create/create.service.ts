import { Injectable } from "@nestjs/common";
import { createCarrierDto } from "src/carriers/models/dtos/create.dto";
import { CarriersEntity } from "src/carriers/models/entity/carriers-entity";
import { CarriersRepository } from "src/carriers/models/repository/carriers.repository";

@Injectable()
export class CreateCarrierService {
    constructor(private readonly carriersRepository: CarriersRepository) { }

    async execute(carrier: createCarrierDto) {
        const newCarrier = new CarriersEntity();
        newCarrier.name = carrier.name
        const savedCarrier = await this.carriersRepository.create(newCarrier)
        return { message: `Transportadora salva com sucesso! ID da transportadora: ${savedCarrier}` }
    }
}