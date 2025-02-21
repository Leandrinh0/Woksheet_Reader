import { Injectable } from "@nestjs/common";
import { FieldsRepository } from "src/fields/models/repository/fields.repository";

@Injectable()
export class FindFieldsService {
    constructor (private readonly fieldsRepository: FieldsRepository) {}

    async execute() {
        
    }
}