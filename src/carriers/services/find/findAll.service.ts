import { Injectable, NotFoundException } from "@nestjs/common";
import { CarriersRepository } from "src/carriers/models/repository/carriers.repository";

@Injectable()
export class FindAllCarriersService {
    constructor(private readonly carriersRepository: CarriersRepository) { }

    async execute() {
        const carriers = await this.carriersRepository.findAll();
        if (carriers.length < 1) {
            throw new NotFoundException("Nenhuma transportadora cadastrada!")
        } return carriers
    }
}