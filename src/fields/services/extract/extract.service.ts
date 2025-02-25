import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import * as XLSX from "xlsx";
import { Readable } from "stream";
import { FieldsRepository } from "src/fields/models/repository/fields.repository";
import { FieldsEntity } from "src/fields/models/entity/fields.entity";

@Injectable()
export class ExtractService {
    constructor(private readonly fieldsRepository: FieldsRepository) { }

    private extractCoordinates(str: string, pattern: RegExp): string | null {
        const match = str.match(pattern);
        return match ? match[1] : null;
    }

    private getHorizontalCoordinates(str: string) {
        return this.extractCoordinates(str, /^([A-Z]{1,3})/);
    }

    private getInitialCoordinates(str: string) {
        return this.extractCoordinates(str, /^([A-Z]{1,3}[1-9][0-9]*)/);
    }

    private getFinalCoordinates(str: string) {
        return this.extractCoordinates(str, /-([A-Z]{1,3}[1-9][0-9]*)$/);
    }

    private extractData(sheet: XLSX.WorkSheet, fieldIndex: string | undefined, header: string, maxLength: number) {
        if (!fieldIndex) return undefined;

        const initialIndex = this.getInitialCoordinates(fieldIndex);
        const finalIndex = this.getFinalCoordinates(fieldIndex);
        return XLSX.utils.sheet_to_json(sheet, {
            range: `${initialIndex}:${finalIndex ? finalIndex : `${this.getHorizontalCoordinates(fieldIndex)}${maxLength + 10}`}`,
            header: [header],
            blankrows: false
        }); 
    }

    async execute(file: any, fieldId: number) {
        try {
            const sheetFields: FieldsEntity = await this.fieldsRepository.findFields(fieldId);
            if (!sheetFields) {
                throw new NotFoundException("Padrão de tabela não encontrado, por favor envie um ID válido!");
            }

            const buffer = await this.streamToBuffer(file.file);
            const workbook = XLSX.read(buffer, { type: "buffer" });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const maxLength = XLSX.utils.sheet_to_json(sheet).length;

            const fieldsMap = [
                { key: "Cidade Origem", index: sheetFields.originIndex },
                { key: "Cidade Destino", index: sheetFields.destinationIndex },
                { key: "Prazo em Dias", index: sheetFields.deadlineIndex },
                { key: "CEP Origem", index: sheetFields.originCepIndex },
                { key: "CEP Destino", index: sheetFields.destinationCepIndex },
                { key: "Distância", index: sheetFields.distanceIndex },
                { key: "Preço fixo", index: sheetFields.fixPriceIndex },
                { key: "T.D.A", index: sheetFields.tda },
                { key: "T.R.T", index: sheetFields.trt },
                { key: "T.D.E", index: sheetFields.tde },
                { key: "T.Z.R", index: sheetFields.tzr }
            ];

            const extractedData = fieldsMap.map(({ key, index }) => ({
                key,
                values: this.extractData(sheet, index, key, maxLength)?.map(obj => Object.values(obj)[0]) ?? []
            }));

            const length = Math.max(0, ...extractedData.map(({ values }) => values.length));

            const response = Array.from({ length }, (_, i) => {
                const obj: Record<string, any> = {};
                extractedData.forEach(({ key, values }) => {
                    if (values[i] !== undefined) obj[key] = values[i];
                });
                return obj;
            });

            return response;
        } catch (error: any) {
            throw new InternalServerErrorException(error);
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
