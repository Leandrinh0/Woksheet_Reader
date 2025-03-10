import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReadingPatternRepository } from "./models/repositories/reading-pattern.repository";
import { ReadingPatternEntity } from "./models/entities/reading-pattern.entity";
import { FindPatternByIdService } from "./services/findById/findById.service";
import { CarriersModule } from "src/carriers/carriers.module";
import { FieldsValuesModule } from "src/fields-values/fields-values.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ReadingPatternEntity]),
        forwardRef(() => CarriersModule),
        forwardRef(() => FieldsValuesModule)
    ],
    providers: [ReadingPatternRepository, FindPatternByIdService],
    controllers: [],
    exports: [FindPatternByIdService]
})
export class ReadingPatternModule { }