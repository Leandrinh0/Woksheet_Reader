import { Module } from "@nestjs/common";
import { CarriersEntity } from "./models/entity/carriers-entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarriersRepository } from "./models/repository/carriers.repository";
import { CreateCarrierService } from "./services/create/create.service";
import { CreateCarrierController } from "./services/create/create.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([CarriersEntity]),
    ],
    providers: [CarriersRepository, CreateCarrierService],
    controllers: [CreateCarrierController]
})
export class CarriersModule { }