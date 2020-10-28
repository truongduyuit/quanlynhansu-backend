import express from 'express'
import { RequestType } from '../../const'
import {ValidateAuthorization} from '../../middleware/validateAuthorization'
import { PermissionKeys} from '../../const/permissions'
import { ValidateRequest } from '../../middleware/validateRequest'
import accountController from './account.controller'
import accountMiddleware from './account.middleware'
import { LoginDto, CreateOrUpdateAccountDto } from './account.validate'

const router = express.Router()

router.post(
    "/login",
    ValidateRequest(LoginDto, RequestType.body),
    accountMiddleware.Login,
    accountController.Login
)

router.post(
    "/",
    ValidateAuthorization(PermissionKeys.accountCreate, true),
    ValidateRequest(CreateOrUpdateAccountDto, RequestType.body),
)

export default router