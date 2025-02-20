import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: false })
class IsSpreadsheetCoordinateConstraint implements ValidatorConstraintInterface {
    validate(value: any): boolean {
        if (typeof value !== "string") {
            return false;
        }

        const singleCoordinateRegex = /^[A-Z]{1,3}[1-9][0-9]*$/;
        const rangeCoordinateRegex = /^[A-Z]{1,3}[1-9][0-9]*-[A-Z]{1,3}[1-9][0-9]*$/;

        return singleCoordinateRegex.test(value) || rangeCoordinateRegex.test(value);
    }

    defaultMessage(): string {
        return "O valor deve ser uma coordenada válida de planilha, podendo ser apenas a coordenada inicial ou também a inicial junto com a final. (ex: A1 ou A1-A10).";
    }
}

export function IsSpreadsheetCoordinate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsSpreadsheetCoordinateConstraint,
        });
    };
}
