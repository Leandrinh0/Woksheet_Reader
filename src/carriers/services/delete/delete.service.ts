import { Injectable, NotFoundException } from "@nestjs/common";
import { CarriersRepository } from "src/carriers/models/repository/carriers.repository";

@Injectable()
export class DeleteCarrierService {
    constructor(private readonly carriersRepository: CarriersRepository) { }

    async execute(carrierId: number) {
        const deleteResult = await this.carriersRepository.delete(carrierId);
        if (deleteResult.affected === 0) {
            throw new NotFoundException("Transportadora não encontrada")
        } return { message: "Transportadora excluída com sucesso!" }
    }
}