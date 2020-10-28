import bcrypt from 'bcrypt'
import { AccountStatus, RoleStatus } from '../../const'
import { ErrorCodes } from '../../const/errorCodes'
import { StatusCode } from '../../const/statusCodes'
import ResponseService from '../../service/responseService'
import roleService from '../role/role.service'
import accountService from './account.service'

class AccountMiddleware {
    async Login(req, res, next) {
        try {
            const {username, password} = req.body

            const account = await accountService.getOne({
                username,
                status: AccountStatus.normal
            })
            const match = await bcrypt.compare(password, account.password)
            if (!account || !match) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    errors: [{
                        code: ErrorCodes.AccountUsernameOrPasswordIncorrect,
                        error: "username or password is incorrect"
                    }]
                })
            }
            req.body.accountId = account._id
            req.body.isAdmin = account.isAdmin
            req.body.roleId = account.roleId
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

    async CreateAccount(req, res, next) {
        try {
            const {username, roleId, employeeId} = req.body

            const account = await accountService.getById({
                username,
                status: AccountStatus.normal
            })
            if (account) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    errors: [{
                        field: "username",
                        code: ErrorCodes.AccountUsernameIsExist,
                        error: "username is exist"
                    }]
                })
            }

            if (roleId) {
                const role = await roleService.getOne({
                    _id: roleId,
                    status: RoleStatus.enable
                })
                if (!role) {
                    return ResponseService.send(res, StatusCode.ServerError, {
                        errors: [{
                            field: "roleId",
                            code: ErrorCodes.RoleIsNotExist,
                            error: "role is exist"
                        }]
                    })
                }
            }

            if (employeeId) {
                
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

export default new AccountMiddleware()