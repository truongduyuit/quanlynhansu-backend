import express from 'express'
import {RequestType} from '../../const/index'
import {ValidateAuthorization} from '../../middleware/validateAuthorization'
import { PermissionKeys} from '../../const/permissions'
import {ValidateRequest} from '../../middleware/validateRequest'
import {
    CreateOrUpdateEmployeeDto
} from './employee.validate'
import employeeMiddleware from './employee.middleware'
import employeeController from './employee.controller'

const router = express.Router()

router.post(
    "/",
    ValidateAuthorization(PermissionKeys.employeeCreate, true),
    ValidateRequest(CreateOrUpdateEmployeeDto, RequestType.body),
    employeeMiddleware.CreateEmployee,
    employeeController.CreateEmployee
)

router.get(
    "/",
    ValidateAuthorization(PermissionKeys.employeeGetList, true),
    employeeController.GetListEmployee
)

router.get(
    "/:id",
    ValidateAuthorization(PermissionKeys.employeeGetList, true),
    employeeController.GetEmployeeById
)

router.put(
    "/:id",
    ValidateAuthorization(PermissionKeys.employeeUpdate, true),
    ValidateRequest(CreateOrUpdateEmployeeDto, RequestType.body),
    employeeMiddleware.UpdateEmployee,
    employeeController.UpdateEmployee
)

router.delete(
    "/:id",
    ValidateAuthorization(PermissionKeys.employeeDelete, true),
    employeeMiddleware.DeleteEmployee,
    employeeController.DeleteEmployee
)

export default router