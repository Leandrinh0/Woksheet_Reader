import { Injectable } from "@nestjs/common";
import { ReadingPatternRepository } from "src/reading-pattern/models/repositories/reading-pattern.repository";

@Injectable()
export class FindPatternByIdService {
    constructor(private readonly readingPatternRepository: ReadingPatternRepository) { }

    async execute(patternId: number) {
        return await this.readingPatternRepository.findOne(patternId)
    }
}