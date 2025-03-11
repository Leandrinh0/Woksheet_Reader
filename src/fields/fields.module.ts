import { forwardRef, Module } from "@nestjs/common";
import { FieldsEntity } from "./models/entity/fields.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExtractService } from "./services/extract/extract.service";
import { ExtractController } from "./services/extract/extract.controller";
import { FieldsRepository } from "./models/repository/fields.repository";
import { CreateFieldService } from "./services/create/create.service";
import { CarriersRepository } from "src/carriers/models/repository/carriers.repository";
import { CarriersEntity } from "src/carriers/models/entity/carriers.entity";
import { FieldsValuesModule } from "src/fields-values/fields-values.module";
import { findFieldsByNameService } from "./services/findByName/findByNames.service";
import { ReadingPatternModule } from "src/reading-pattern/reading-pattern.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([FieldsEntity, CarriersEntity]),
        forwardRef(() => FieldsValuesModule),
        forwardRef(() => ReadingPatternModule)
    ],
    providers: [ExtractService, FieldsRepository, CreateFieldService, CarriersRepository, findFieldsByNameService, CreateFieldService],
    controllers: [ExtractController],
    exports: [findFieldsByNameService, CreateFieldService]
})
export class FieldsModule { }