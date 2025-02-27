import { Module } from "@nestjs/common";
import { FieldsEntity } from "./models/entity/fields.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExtractService } from "./services/extract/extract.service";
import { ExtractController } from "./services/extract/extract.controller";
import { FieldsRepository } from "./models/repository/fields.repository";
import { CreateFieldController } from "./services/create/create.controller";
import { CreateFieldService } from "./services/create/create.service";
import { CarriersRepository } from "src/carriers/models/repository/carriers.repository";
import { CarriersEntity } from "src/carriers/models/entity/carriers-entity";
import { FindFieldsService } from "./services/find/find.service";
import { FindFieldsController } from "./services/find/find.controller";
import { DeleteFieldService } from "./services/delete/delete.service";
import { DeleteFieldController } from "./services/delete/delete.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([FieldsEntity, CarriersEntity]),
    ],
    providers: [ExtractService, FieldsRepository, CreateFieldService, CarriersRepository, FindFieldsService, DeleteFieldService],
    controllers: [ExtractController, CreateFieldController, FindFieldsController, DeleteFieldController]
})
export class FieldsModule { }