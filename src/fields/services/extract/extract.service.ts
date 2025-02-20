import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
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
            if (!sheetFields) { throw new NotFoundException("Padrão de tabela não encontrado, por favor envie um ID válido!") }
            const getHorizontalCoordinates = (str: string) => {
                const match = str.match(/^([A-Z]{1,3})/);
                return match ? match[1] : null;
            };
            const getInitialCoordinates = (str: string) => {
                const match = str.match(/^([A-Z]{1,3}[1-9][0-9]*)/);
                return match ? match[1] : null;
            };
            const getFinalCoordinates = (str: string) => {
                const match = str.match(/-([A-Z]{1,3}[1-9][0-9]*)$/);
                return match ? match[1] : null;
            };

            const buffer = await this.streamToBuffer(file.file);
            const workbook = XLSX.read(buffer, { type: "buffer" });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const maxLength = XLSX.utils.sheet_to_json(sheet).length;

            const originData = () => {
                if (sheetFields.originIndex) {
                    const initialIndex = getInitialCoordinates(sheetFields.originIndex);
                    const finalIndex = getFinalCoordinates(sheetFields.originIndex);
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${initialIndex}:${finalIndex ? finalIndex : `${getHorizontalCoordinates(sheetFields.originIndex)}${maxLength + 10}`}`,
                        header: ["Cidade Destino"],
                        blankrows: false
                    })
                } return undefined
            }

            const destinationData = () => {
                if (sheetFields.destinationIndex) {
                    const initialIndex = getInitialCoordinates(sheetFields.destinationIndex);
                    const finalIndex = getFinalCoordinates(sheetFields.destinationIndex);
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${initialIndex}:${finalIndex ? finalIndex : `${getHorizontalCoordinates(sheetFields.destinationIndex)}${maxLength + 10}`}`,
                        header: ["Cidade Destino"],
                        blankrows: false
                    });
                } return undefined
            }

            const deadlineData = () => {
                if (sheetFields.deadlineIndex) {
                    const initialIndex = getInitialCoordinates(sheetFields.deadlineIndex);
                    const finalIndex = getFinalCoordinates(sheetFields.deadlineIndex);
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${initialIndex}:${finalIndex ? finalIndex : `${getHorizontalCoordinates(sheetFields.deadlineIndex)}${maxLength + 10}`}`,
                        header: ["Prazo em Dias"],
                        blankrows: false
                    });
                } return undefined
            }

            const cepData = () => {
                if (sheetFields.cepIndex) {
                    const initialIndex = getInitialCoordinates(sheetFields.cepIndex);
                    const finalIndex = getFinalCoordinates(sheetFields.cepIndex);
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${initialIndex}:${finalIndex ? finalIndex : `${getHorizontalCoordinates(sheetFields.cepIndex)}${maxLength + 10}`}`,
                        header: ["CEP"],
                        blankrows: false
                    });
                } return undefined
            }

            const distanceData = () => {
                if (sheetFields.distanceIndex) {
                    const initialIndex = getInitialCoordinates(sheetFields.distanceIndex);
                    const finalIndex = getFinalCoordinates(sheetFields.distanceIndex);
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${initialIndex}:${finalIndex ? finalIndex : `${getHorizontalCoordinates(sheetFields.distanceIndex)}${maxLength + 10}`}`,
                        header: ["Distancia"],
                        blankrows: false
                    });
                } return undefined
            }

            const fixPriceData = () => {
                if (sheetFields.fixPriceIndex) {
                    const initialIndex = getInitialCoordinates(sheetFields.fixPriceIndex);
                    const finalIndex = getFinalCoordinates(sheetFields.fixPriceIndex);
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${initialIndex}:${finalIndex ? finalIndex : `${getHorizontalCoordinates(sheetFields.fixPriceIndex)}${maxLength + 10}`}`,
                        header: ["CEP"],
                        blankrows: false
                    });
                } return undefined
            }

            const tdaData = () => {
                if (sheetFields.tda) {
                    const initialIndex = getInitialCoordinates(sheetFields.tda);
                    const finalIndex = getFinalCoordinates(sheetFields.tda);
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${initialIndex}:${finalIndex ? finalIndex : `${getHorizontalCoordinates(sheetFields.tda)}${maxLength + 10}`}`,
                        header: ["T.D.A"],
                        blankrows: false
                    });
                } return undefined
            }

            const trtData = () => {
                if (sheetFields.trt) {
                    const initialIndex = getInitialCoordinates(sheetFields.trt);
                    const finalIndex = getFinalCoordinates(sheetFields.trt);
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${initialIndex}:${finalIndex ? finalIndex : `${getHorizontalCoordinates(sheetFields.trt)}${maxLength + 10}`}`,
                        header: ["T.R.T"],
                        blankrows: false
                    });
                } return undefined
            }

            const tdeData = () => {
                if (sheetFields.tde) {
                    const initialIndex = getInitialCoordinates(sheetFields.tde);
                    const finalIndex = getFinalCoordinates(sheetFields.tde);
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${initialIndex}:${finalIndex ? finalIndex : `${getHorizontalCoordinates(sheetFields.tde)}${maxLength + 10}`}`,
                        header: ["T.D.E"],
                        blankrows: false
                    });
                } return undefined
            }

            const tzrData = () => {
                if (sheetFields.tzr) {
                    const initialIndex = getInitialCoordinates(sheetFields.tzr);
                    const finalIndex = getFinalCoordinates(sheetFields.tzr);
                    return XLSX.utils.sheet_to_json(sheet, {
                        range: `${initialIndex}:${finalIndex ? finalIndex : `${getHorizontalCoordinates(sheetFields.tzr)}${maxLength + 10}`}`,
                        header: ["T.Z.R"],
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
            const tda = tdaData()?.map(obj => Object.values(obj)[0]) ?? [];
            const trt = trtData()?.map(obj => Object.values(obj)[0]) ?? [];
            const tde = tdeData()?.map(obj => Object.values(obj)[0]) ?? [];
            const tzr = tzrData()?.map(obj => Object.values(obj)[0]) ?? [];

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
                if (tda[i] !== undefined) obj["T.D.A"] = tda[i];
                if (trt[i] !== undefined) obj["T.R.T"] = trt[i];
                if (tde[i] !== undefined) obj["T.D.E"] = tde[i];
                if (tzr[i] !== undefined) obj["T.Z.R"] = tzr[i];

                return obj;
            });
            return response;
        } catch (error: any) {
            throw new InternalServerErrorException(error)
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
