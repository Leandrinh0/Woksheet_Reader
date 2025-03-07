import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FieldsvaluesEntity } from "./models/entities/fields-values.entity";
import { FieldsValuesRepository } from "./models/repositories/fields-values.repository";


@Module({
    imports: [
        TypeOrmModule.forFeature([FieldsvaluesEntity]),
    ],
    providers: [FieldsValuesRepository],
    controllers: []
})
export class FieldsValuesModule { }