import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate } from "class-validator";

@ValidatorConstraint({ name: 'isNotEqualTo', async: false })
export class IsNotEqualToConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value !== relatedValue;
    }

    defaultMessage(args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        return `${relatedPropertyName} and ${args.property} should not be equal`;
    }
}

export function IsNotEqualTo(property: string, validationOptions?: any) {
    return Validate(IsNotEqualToConstraint, [property], validationOptions);
}