var Joi = require('joi-browser');

class InputValidationService {
    async validate(input: any, schema: any) {
        let errors: string[] = [];

        try {
            const result = await Joi.validate(input, schema);
        } catch (e) {
            e.details.map((detail:any) => {
                errors.push(detail.message);
            });
        }

        return errors;
    }
}

export const inputValidationService = new InputValidationService();