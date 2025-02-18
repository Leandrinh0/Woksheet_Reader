import { Injectable } from "@nestjs/common";
import * as XLSX from "xlsx";
import { Readable } from "stream";
import { FieldsRepository } from "src/fields/models/repository/fields.repository";
import { FieldsEntity } from "src/fields/models/entity/fields.entity";

@Injectable()
export class ExtractService {
    constructor(private readonly fieldsRepository: FieldsRepository) { }

    async execute(file: any) {

        try {
            const sheetFields: FieldsEntity = await this.fieldsRepository.findFields(1);
            const matchNumber = (str: string) => str.match(/\d+/);
            const matchColumn = (str: string) => str.match(/^[A-Za-z]+/);

            const buffer = await this.streamToBuffer(file.file);
            const workbook = XLSX.read(buffer, { type: "buffer" });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const originData = XLSX.utils.sheet_to_json(sheet, {
                range: `${sheetFields.originIndex}:${matchColumn(sheetFields.originIndex)}3000`,
                header: ["Cidade Origem"],
                blankrows: false
            });

            const destinationData = XLSX.utils.sheet_to_json(sheet, {
                range: `${sheetFields.destinationIndex}:${matchColumn(sheetFields.destinationIndex)}3000`,
                header: ["Cidade Destino"],
                blankrows: false
            });

            const deadlineData = XLSX.utils.sheet_to_json(sheet, {
                range: `${sheetFields.deadlineIndex}:${matchColumn(sheetFields.deadlineIndex)}3000`,
                header: ["Prazo em Dias"],
                blankrows: false
            });

            const cepData = XLSX.utils.sheet_to_json(sheet, {
                range: `${sheetFields.cepIndex}:${matchColumn(sheetFields.cepIndex)}3000`,
                header: ["CEP"],
                blankrows: false
            });

            const response = [];
            for (let i = 0; i < originData.length; i++) {
                response.push({
                    "Cidade Origem": originData.map(obj => Object.values(obj)[0])[i],
                    "Cidade Destino": destinationData.map(obj => Object.values(obj)[0])[i],
                    "Prazo em Dias": deadlineData.map(obj => Object.values(obj)[0])[i],
                    "CEP": cepData.map(obj => Object.values(obj)[0])[i],
                })
            }

            return response

        } catch (error: any) {
            throw new Error(error)
        }
    }

    private async streamToBuffer(stream: Readable): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            const chunks: Buffer[] = [];
            stream.on("data", (chunk) => chunks.push(chunk));
            stream.on("end", () => resolve(Buffer.concat(chunks)));
            stream.on("error", reject);
        });
    }
}
