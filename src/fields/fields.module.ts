import { forwardRef, Module } from "@nestjs/common";
import { FieldsEntity } from "./models/entity/fields.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExtractService } from "./services/extract/extract.service";
import { ExtractController } from "./services/extract/extract.controller";
import { FieldsRepository } from "./models/repository/fields.repository";
import { CreateFieldController } from "./services/create/create.controller";
import { CreateFieldService } from "./services/create/create.service";
import { CarriersRepository } from "src/carriers/models/repository/carriers.repository";
import { CarriersEntity } from "src/carriers/models/entity/carriers.entity";
import { DeleteFieldService } from "./services/delete/delete.service";
import { DeleteFieldController } from "./services/delete/delete.controller";
import { FieldsValuesModule } from "src/fields-values/fields-values.module";
import { FindFieldByIdService } from "./services/findById/findOne.service";
import { findFieldsByNameService } from "./services/findByName/findByNames.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([FieldsEntity, CarriersEntity]),
        forwardRef(() => FieldsValuesModule)
    ],
    providers: [ExtractService, FieldsRepository, CreateFieldService, CarriersRepository, DeleteFieldService, FindFieldByIdService, findFieldsByNameService, CreateFieldService],
    controllers: [ExtractController, CreateFieldController, DeleteFieldController],
    exports: [findFieldsByNameService, CreateFieldService]
})
export class FieldsModule { }