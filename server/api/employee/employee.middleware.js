import { ErrorCodes } from '../../const/errorCodes'
import { StatusCode } from '../../const/statusCodes'
import ResponseService from '../../service/responseService'
import employeeService from './employee.service'
import {EmployeeStatus} from '../../const/index'

class EmployeeMiddleware {
    async CreateEmployee(req, res, next) {
        try {
            const {phone, identityNumber} = req.body

            const employeeByPhone = await employeeService.getOne({
                phone, status: EmployeeStatus.normal
            })
            if (employeeByPhone) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    errors: [{
                        code: ErrorCodes.EmployeePhoneIsExist,
                        error: "phone name is exist",
                        field: "phone"
                    }]
                })
            }

            const employeeByIdentityNumber = await employeeService.getOne({
                identityNumber, status: EmployeeStatus.normal
            })
            if (employeeByIdentityNumber) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    errors: [{
                        code: ErrorCodes.EmployeePhoneIsExist,
                        error: "identity number is exist",
                        field: "identityNumber"
                    }]
                })
            }

            next()
        } catch (error) {
            return ResponseService.send(res, StatusCode.ServerError, {
                errors: [
                    {
                        code: ErrorCodes.ServerError,
                        error: error.message,
                    },
                ],
            });
        }
    }

    async UpdateEmployee(req, res, next) {
        try {
            const {id} = req.params
            const {phone, identityNumber} = req.body

            const employee = await employeeService.getById(id)
            if (!employee) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    errors: [{
                        code: ErrorCodes.EmployeeNotExist,
                        error: "employee not exist",
                        field: "id"
                    }]
                })
            }

            if (phone) {
                const employeeByPhone = await employeeService.getOne({
                    phone, status: EmployeeStatus.normal,
                    _id: {$ne: id}
                })
                if (employeeByPhone) {
                    return ResponseService.send(res, StatusCode.ServerError, {
                        errors: [{
                            code: ErrorCodes.EmployeePhoneIsExist,
                            error: "phone name is exist",
                            field: "phone"
                        }]
                    })
                }
            }

            if(identityNumber) {
                const employeeByIdentityNumber = await employeeService.getOne({
                    identityNumber, status: EmployeeStatus.normal,
                    _id: {$ne: id}
                })
                if (employeeByIdentityNumber) {
                    return ResponseService.send(res, StatusCode.ServerError, {
                        errors: [{
                            code: ErrorCodes.EmployeePhoneIsExist,
                            error: "identity number is exist",
                            field: "identityNumber"
                        }]
                    })
                }
            }

            next()
        } catch (error) {
            return ResponseService.send(res, StatusCode.ServerError, {
                errors: [
                    {
                        code: ErrorCodes.ServerError,
                        error: error.message,
                    },
                ],
            });
        }
    }

    async DeleteEmployee(req, res, next) {
        try {
            const {id} = req.params

            const employee = await employeeService.getById(id)
            if (!employee) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    errors: [{
                        code: ErrorCodes.EmployeeNotExist,
                        error: "employee not exist",
                        field: "id"
                    }]
                })
            }

            next()
        } catch (error) {
            return ResponseService.send(res, StatusCode.ServerError, {
                errors: [
                    {
                        code: ErrorCodes.ServerError,
                        error: error.message,
                    },
                ],
            });
        }
    }
}

export default new EmployeeMiddleware()