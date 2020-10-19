import express from 'express'
import {RequestType} from '../../const/index'
import {ValidateAuthorization} from '../../middleware/validateAuthorization'
import { PermissionKeys} from '../../const/permissions'
import {ValidateRequest} from '../../middleware/validateRequest'
import {CreateOrUpdateDepartmentDto, IdDto} from './department.validate'
import departmentMiddleware from './department.middleware'
import departmentController from './department.controller'

const router = express.Router()

router.post(
    "/",
    ValidateAuthorization(PermissionKeys.departmentCreate, true),
    ValidateRequest(CreateOrUpdateDepartmentDto, RequestType.body),
    departmentMiddleware.CreateDepartment,
    departmentController.CreateDepartment
)

router.get(
    "/",
    ValidateAuthorization(PermissionKeys.departmentGetList, true),
    departmentController.GetListDepartment
)

router.get(
    "/:id",
    ValidateAuthorization(PermissionKeys.departmentGetList, true),
    departmentController.GetDepartmentById
)

router.put(
    "/:id",
    ValidateAuthorization(PermissionKeys.departmentUpdate, true),
    ValidateRequest(IdDto, RequestType.params),
    ValidateRequest(CreateOrUpdateDepartmentDto, RequestType.body),
    departmentMiddleware.UpdateDepartment,
    departmentController.UpdateDepartment
)

router.delete(
    "/:id",
    ValidateAuthorization(PermissionKeys.departmentDelete, true),
    ValidateRequest(IdDto, RequestType.params),
    departmentMiddleware.DeleteDepartment,
    departmentController.DeleteDepartment
)

export default router