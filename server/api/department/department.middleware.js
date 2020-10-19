import { AccountStatus, DepartmentStatus, RoleStatus } from '../../const'
import { ErrorCodes } from '../../const/errorCodes'
import { StatusCode } from '../../const/statusCodes'
import ResponseService from '../../service/responeService'
import departmentService from './department.service'
class DepartmentController {
    async CreateDepartment(req, res, next) {
        try {
            const {name} = req.body

            const department = await departmentService.getOne({
                name, status: DepartmentStatus.normal
            })

            if (department) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    errors: [{
                        code: ErrorCodes.DepartmentNameIsExit,
                        error: "department name is exist"
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

    async UpdateDepartment(req, res, next) {
        try {
            const {id} = req.params
            const {name} = req.body

            const department = await departmentService.getOne({
                _id: id,
                status: DepartmentStatus.normal
            })

            if (!department) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    errors: [{
                        code: ErrorCodes.DepartmentNotFound,
                        error: "department not found"
                    }]
                })
            }

            const departmentByName = await departmentService.getOne({
                _id: {$ne: id},
                status: DepartmentStatus.normal,
                name
            })
            if (departmentByName) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    errors: [{
                        code: ErrorCodes.DepartmentNameIsExit,
                        error: "department name is exist"
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

    async DeleteDepartment(req, res, next) {
        try {
            const {id} = req.params

            const department = await departmentService.getOne({
                _id: id,
                status: DepartmentStatus.normal
            })

            if (!department) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    errors: [{
                        code: ErrorCodes.DepartmentNotFound,
                        error: "department not found"
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

export default new DepartmentController()