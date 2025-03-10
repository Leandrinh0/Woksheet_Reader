import { Injectable } from "@nestjs/common";
import { CarriersRepository } from "src/carriers/models/repository/carriers.repository";

@Injectable()
export class FindCarrierByIdService {
    constructor(private readonly carriersRepository: CarriersRepository) { }

    async execute(carrierId: number) {
        return await this.carriersRepository.findOne(carrierId)
    }
}