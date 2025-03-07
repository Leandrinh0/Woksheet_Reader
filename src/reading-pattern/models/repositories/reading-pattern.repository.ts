import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReadingPatternEntity } from "../entities/reading-pattern.entity";
import { ReadingPatternRepositoryInterface } from "../interfaces/reading-pattern-repository.interface";

@Injectable()
export class ReadingPatternRepository implements ReadingPatternRepositoryInterface {
    constructor(
        @InjectRepository(ReadingPatternEntity)
        private readonly readingPatternRepository: Repository<ReadingPatternEntity>
    ) { }

    async findOne(id: number): Promise<ReadingPatternEntity> {
        return await this.readingPatternRepository.findOne({ where: { id } })
    }

    async findAll(): Promise<ReadingPatternEntity[]> {
        return await this.readingPatternRepository.find()
    }

    async create(readingPattern: ReadingPatternEntity): Promise<ReadingPatternEntity> {
        return await this.readingPatternRepository.save(readingPattern)
    }
}