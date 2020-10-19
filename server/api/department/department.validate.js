import joi from '@hapi/joi'

export const CreateOrUpdateDepartmentDto = joi.object({
    name: joi.string().required().min(3).max(255)
})

export const IdDto = joi.object({
    id: joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
})