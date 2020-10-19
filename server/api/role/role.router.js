import express from 'express'
import { RequestType } from '../../const'
import { ValidateRequest } from '../../middleware/validateRequest'
import { ValidateAuthorization} from '../../middleware/validateAuthorization'
import { PermissionKeys } from '../../const/permissions'
import { CreateOrUpdateRoleDto, IdDto} from './role.validate'
import roleMiddleware from './role.middleware'
import roleController from './role.controller'

const router = express.Router()

router.post(
    "/",
    ValidateAuthorization(PermissionKeys.roleCreate, true),
    ValidateRequest(CreateOrUpdateRoleDto, RequestType.body),
    roleMiddleware.CreateRole,
    roleController.CreateRole
)

router.get(
    "/",
    ValidateAuthorization(PermissionKeys.roleGetList, true),
    roleController.GetListRole
)

router.get(
    "/:id",
    ValidateAuthorization(PermissionKeys.roleGetList, true),
    ValidateRequest(IdDto, RequestType.params),
    roleController.GetRoleById
)

router.put(
    "/:id",
    ValidateAuthorization(PermissionKeys.roleUpdate, true),
    ValidateRequest(CreateOrUpdateRoleDto, RequestType.body),
    ValidateRequest(IdDto, RequestType.params),
    roleMiddleware.UpdateRole,
    roleController.UpdateRole
)

router.delete(
    "/:id",
    ValidateAuthorization(PermissionKeys.roleDelete, true),
    ValidateRequest(IdDto, RequestType.params),
    roleMiddleware.DeleteRole,
    roleController.DeleteRole
)

export default router