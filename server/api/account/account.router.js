import express from 'express'
import { RequestType } from '../../const'
import { ValidateRequest } from '../../middleware/validateRequest'
import accountController from './account.controller'
import accountMiddleware from './account.middleware'
import { LoginDto } from './account.validate'

const router = express.Router()

router.post(
    "/login",
    ValidateRequest(LoginDto, RequestType.body),
    accountMiddleware.Login,
    accountController.Login
)

export default router