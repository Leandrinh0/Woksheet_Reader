import { Injectable } from "@nestjs/common";
import * as XLSX from "xlsx";
import { Readable } from "stream";
import { FieldsRepository } from "src/fields/models/repository/fields.repository";
import { FieldsEntity } from "src/fields/models/entity/fields.entity";

@Injectable()
export class ExtractService {
    constructor(private readonly fieldsRepository: FieldsRepository) { }

    async execute(file: any, fieldId: number) {
        try {
            const sheetFields: FieldsEntity = await this.fieldsRepository.findFields(fieldId);
            const matchColumn = (str: string) => str.match(/^[A-Za-z]+/);

            const buffer = await this.streamToBuffer(file.file);
            const workbook = XLSX.read(buffer, { type: "buffer" });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const maxLength = XLSX.utils.sheet_to_json(sheet).length;

            const originData = () => {
                if (sheetFields.originIndex) {
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${(sheetFields.originIndex).toUpperCase()}:${matchColumn((sheetFields.originIndex).toUpperCase())}${maxLength + 10}`,
                        header: ["Cidade Destino"],
                        blankrows: false
                    })
                } return undefined
            }

            const destinationData = () => {
                if (sheetFields.destinationIndex) {
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${(sheetFields.destinationIndex).toUpperCase()}:${matchColumn((sheetFields.destinationIndex).toUpperCase())}${maxLength + 10}`,
                        header: ["Cidade Destino"],
                        blankrows: false
                    });
                } return undefined
            }

            const deadlineData = () => {
                if (sheetFields.deadlineIndex) {
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${(sheetFields.deadlineIndex).toUpperCase()}:${matchColumn((sheetFields.deadlineIndex).toUpperCase())}${maxLength + 10}`,
                        header: ["Prazo em Dias"],
                        blankrows: false
                    });
                } return undefined
            }

            const cepData = () => {
                if (sheetFields.cepIndex) {
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${(sheetFields.cepIndex).toUpperCase()}:${matchColumn((sheetFields.cepIndex).toUpperCase())}${maxLength + 10}`,
                        header: ["CEP"],
                        blankrows: false
                    });
                } return undefined
            }

            const distanceData = () => {
                if (sheetFields.distanceIndex) {
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${(sheetFields.distanceIndex).toUpperCase()}:${matchColumn((sheetFields.distanceIndex).toUpperCase())}${maxLength + 10}`,
                        header: ["Distancia"],
                        blankrows: false
                    });
                } return undefined
            }

            const fixPriceData = () => {
                if (sheetFields.fixPriceIndex) {
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${(sheetFields.fixPriceIndex).toUpperCase()}:${matchColumn((sheetFields.fixPriceIndex).toUpperCase())}${maxLength + 10}`,
                        header: ["CEP"],
                        blankrows: false
                    });
                } return undefined
            }

            const origin = originData()?.map(obj => Object.values(obj)[0]) ?? [];
            const destination = destinationData()?.map(obj => Object.values(obj)[0]) ?? [];
            const deadline = deadlineData()?.map(obj => Object.values(obj)[0]) ?? [];
            const cep = cepData()?.map(obj => Object.values(obj)[0]) ?? [];
            const distance = distanceData()?.map(obj => Object.values(obj)[0]) ?? [];
            const fixPrice = fixPriceData()?.map(obj => Object.values(obj)[0]) ?? [];

            const lengths = [origin, destination, deadline, cep, distance, fixPrice].map(arr => arr.length);
            const length = Math.max(0, ...lengths);

            const response = Array.from({ length }, (_, i) => {
                const obj: Record<string, any> = {};

                if (origin[i] !== undefined) obj["Cidade Origem"] = origin[i];
                if (destination[i] !== undefined) obj["Cidade Destino"] = destination[i];
                if (deadline[i] !== undefined) obj["Prazo em Dias"] = deadline[i];
                if (cep[i] !== undefined) obj["CEP"] = cep[i];
                if (distance[i] !== undefined) obj["Distância"] = distance[i];
                if (fixPrice[i] !== undefined) obj["Preço fixo"] = fixPrice[i];

                return obj;
            });
            return response;
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
