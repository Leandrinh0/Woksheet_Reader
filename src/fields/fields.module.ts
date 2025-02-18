import { Module } from "@nestjs/common";
import { FieldsEntity } from "./models/entity/fields.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExtractService } from "./services/extract/extract.service";
import { ExtractController } from "./services/extract/extract.controller";
import { FieldsRepository } from "./models/repository/fields.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([FieldsEntity]),
    ],
    providers: [ExtractService, FieldsRepository],
    controllers: [ExtractController]
})
export class FieldsModule { }