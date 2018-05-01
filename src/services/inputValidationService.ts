import ValidationModel from '../models/validationModel';

class InputValidationService {
    validate(inputs: ValidationModel[]) {
        let errors: string[] = [];
        inputs.forEach(input => {
            const lowerCaseName = input.name.toLowerCase();
            if (input.required) {
                if (input.value == null) {
                    errors.push(input.name + " is required");
                } else {
                    if (input.type === "email" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.value)) {
                        errors.push("Invalid " + lowerCaseName);
                    }
                    else if (input.type === "integer" && !/^\d+$/.test(input.value)) {
                        errors.push("Invalid " + lowerCaseName);
                    }
                    else if (input.type === "decimal" && !isNaN(input.value)) {
                        errors.push("Invalid " + lowerCaseName);
                    }
                    else if (input.type === "array") {
                        let nestedErrors = this.validate(input.value);
                        errors.concat(nestedErrors);
                    }
                }
            }
        });
        return errors;
    }
}

export const inputValidationService = new InputValidationService();