import { Module } from "@nestjs/common";
import { CarriersEntity } from "./models/entity/carriers.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarriersRepository } from "./models/repository/carriers.repository";
import { CreateCarrierService } from "./services/create/create.service";
import { CreateCarrierController } from "./services/create/create.controller";
import { FindAllCarriersService } from "./services/find/findAll.service";
import { FindAllCarriersController } from "./services/find/findAll.controller";
import { DeleteCarrierService } from "./services/delete/delete.service";
import { DeleteCarrierController } from "./services/delete/delete.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([CarriersEntity]),
    ],
    providers: [CarriersRepository, CreateCarrierService, FindAllCarriersService, DeleteCarrierService],
    controllers: [CreateCarrierController, FindAllCarriersController, DeleteCarrierController]
})
export class CarriersModule { }