import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FieldsvaluesEntity } from "./models/entities/fields-values.entity";
import { FieldsValuesRepository } from "./models/repositories/fields-values.repository";
import { FindPatternValuesService } from "./services/find-patter-values/find.service";
import { FieldsModule } from "src/fields/fields.module";
import { ReadingPatternModule } from "src/reading-pattern/reading-pattern.module";
import { CreateFieldsValuesService } from "./services/create/create.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([FieldsvaluesEntity]),
        forwardRef(() => FieldsModule),
        forwardRef(() => ReadingPatternModule)
    ],
    providers: [FieldsValuesRepository, FindPatternValuesService, CreateFieldsValuesService],
    controllers: [],
    exports: [FindPatternValuesService, CreateFieldsValuesService]
})
export class FieldsValuesModule { }