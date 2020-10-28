import joi from '@hapi/joi'

export const CreateOrUpdateEmployeeDto = joi.object({
    name: joi.string().required().min(3).max(255),
    gender: joi.string().required().valid("Nam", "Nữ", "Khác"),
    dateOfBirth: joi.date().required(),
    academicLevel: joi.string().required(),
    nation: joi.string().required(),
    identityNumber: joi.string().required(),
    address: joi.string().required(),
    homeTown: joi.string().required(),
    dateToWork: joi.date().required(),
    dateOfContract: joi.date().required(),
    note: joi.string(),
    departmentId: joi.string()
})
