import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReadingPatternRepository } from "./models/repositories/reading-pattern.repository";
import { ReadingPatternEntity } from "./models/entities/reading-pattern.entity";
import { FindPatternByIdService } from "./services/findById/findById.service";
import { CarriersModule } from "src/carriers/carriers.module";
import { FieldsValuesModule } from "src/fields-values/fields-values.module";
import { CreatePatternController } from "./services/create/create.controller";
import { CreateReadingPatternService } from "./services/create/create.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ReadingPatternEntity]),
        forwardRef(() => CarriersModule),
        forwardRef(() => FieldsValuesModule)
    ],
    providers: [ReadingPatternRepository, FindPatternByIdService, CreateReadingPatternService],
    controllers: [CreatePatternController],
    exports: [FindPatternByIdService]
})
export class ReadingPatternModule { }