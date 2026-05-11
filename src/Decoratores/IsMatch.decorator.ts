/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    ValidatorConstraintInterface,
    ValidatorConstraint,
  } from 'class-validator';
  
  export function IsMatch(
    constraints: string[],
    validationOptions?: ValidationOptions,
  ) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        constraints,
        options: validationOptions,
        validator: MatchBetweenFields,
      });
    };
  }
  
  @ValidatorConstraint({ async: false })
  export class MatchBetweenFields implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
      console.log({
        value,
        args,
        matchwith: args.constraints[0],
        matchwithvalue: args.object[args.constraints[0]],
      });
      return value === args.object[args.constraints[0]];
    }
  
    defaultMessage(validationArguments?: ValidationArguments): string {
      return `faile to match src field ${validationArguments?.property} with ${validationArguments?.constraints[0]}`;
    }
  }
  