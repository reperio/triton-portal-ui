class InputValidationService {
    validate(inputs: any[]) {
        let errors: string[] = [];
        inputs.forEach(input => {
            if (input.value === undefined) {
                errors.push(input.type + " is required");
            }
            else if (input.type === "Email" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.value)) {
                errors.push("Invalid email address");
            }
        });
        return errors;
    }
}

export const inputValidationService = new InputValidationService();