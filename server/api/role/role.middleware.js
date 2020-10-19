import { AccountStatus, RoleStatus } from '../../const'
import { ErrorCodes } from '../../const/errorCodes'
import { StatusCode } from '../../const/statusCodes'
import ResponseService from '../../service/responeService'
import roleService from './role.service'

class RoleMiddleware {
    async CreateRole(req, res, next) {
        try {
            const { roleName } = req.body
            const role = await roleService.getOne({
                roleName, status: RoleStatus.enable
            })
            if (role) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    errors: [{
                        code: ErrorCodes.RoleNameIsExist,
                        error: "role name is exist"
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

    async UpdateRole(req, res, next) {
        try {
            const {id} = req.params

            const role = await roleService.getByQuery({
                _id: id,
                status: RoleStatus.enable
            })
            if (!role) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    errors: [{
                        code: ErrorCodes.RoleIsNotExist,
                        error: "role is not exist"
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

    async DeleteRole(req, res, next) {
        try {
            const {id} = req.params

            const role = await roleService.getByQuery({
                _id: id,
                status: RoleStatus.enable
            })
            if (!role) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    errors: [{
                        code: ErrorCodes.RoleIsNotExist,
                        error: "role is not exist"
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

export default new RoleMiddleware()