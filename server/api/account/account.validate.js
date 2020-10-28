import joi from '@hapi/joi'

export const LoginDto = joi.object({
    username: joi.string().required().min(3).max(30),
    password: joi.string().required().min(3).max(30)
})

export const CreateOrUpdateAccountDto = joi.object({
    username: joi.string().required().min(3).max(30),
    password: joi.string().required().min(3).max(30),
    roleId: joi.string().regex(/^[0-9a-fA-F]{24}$/),
    employeeId: joi.string().regex(/^[0-9a-fA-F]{24}$/)
})

export const IdDto = joi.object({
    id: joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
})