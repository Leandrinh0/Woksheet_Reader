import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReadingPatternRepository } from "./models/repositories/reading-pattern.repository";
import { ReadingPatternEntity } from "./models/entities/reading-pattern.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ReadingPatternEntity]),
    ],
    providers: [ReadingPatternRepository],
    controllers: []
})
export class ReadingPatternModule { }