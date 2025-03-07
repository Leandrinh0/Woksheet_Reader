import { CreateReadingPatternDto } from "../dtos/create.dto";
import { ReadingPatternEntity } from "../entities/reading-pattern.entity";

export interface ReadingPatternRepositoryInterface {
    findOne(id: number): Promise<ReadingPatternEntity>
    findAll(): Promise<ReadingPatternEntity[]>
    create(readingPattern: ReadingPatternEntity): Promise<ReadingPatternEntity>
}