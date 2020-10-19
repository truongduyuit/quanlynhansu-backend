import joi from '@hapi/joi'

export const LoginDto = joi.object({
    username: joi.string().required().min(3).max(30),
    password: joi.string().required().min(3).max(30)
})