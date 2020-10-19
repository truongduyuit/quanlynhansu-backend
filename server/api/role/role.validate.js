import joi from '@hapi/joi'

export const CreateOrUpdateRoleDto = joi.object({
    roleName: joi.string().required().min(3).max(255),
    rolePermissions: joi.array().required().items(joi.object({
        permissionKey: joi.string().required().min(3).max(255)
    }))
})

export const IdDto = joi.object({
    id: joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
})