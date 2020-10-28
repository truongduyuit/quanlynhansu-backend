import jsonWebToken from 'jsonwebtoken'
import accountService from '../api/account/account.service'
import { AccountStatus, RoleStatus } from '../const'
import { StatusCode } from '../const/statusCodes'
import ResponseService from '../service/responseService'
import ErrorCodes from '../const/errorCodes'
import roleService from '../api/role/role.service'

export const ValidateAuthorization = function(permissionKey, isAdmin = false) {
    return async function(req, res, next) {
        try {
            if (req.headers['authorization']) {
                const headersToken = req.headers["authorization"].split(" ");
                if (headersToken[0] !== "Bearer") {
                    return ResponseService.send(res, StatusCode.Unauthorized, {
                        message: "you are not authorize"
                    })
                }
                if (!headersToken[1]) {
                    return ResponseService.send(res, StatusCode.Unauthorized, {
                        message: "you are not authorize",
                    });
                }

                const token = jsonWebToken.verify(
                    headersToken[1],
                    process.env.JWT_SECRET
                )

                if (!token) {
                    return ResponseService.send(res, HTTPCode.Unauthorized, {
                        message: "you are not authorize",
                    })
                }

                if (token.isAccess) {
                    const {accountId} = token
                    const account = await accountService.getByQuery({
                        _id: accountId,
                        status: AccountStatus.normal
                    })

                    if (!account) {
                        return ResponseService.send(res, HTTPCode.Unauthorized, {
                            errors: [{
                                code: ErrorCodes.AccountNotFound,
                                error: "account not found",
                            }]
                        })
                    }

                    if (isAdmin && account.isAdmin) {
                        req.cookies.accountId = account._id
                        next()
                    } else {
                        const role = await roleService.getOne({
                            "rolePermissions.permissionKey": permissionKey,
                            status: RoleStatus.enable,
                        })
                        if (!role) {
                            return ResponseService.send(res, HTTPCode.Unauthorized, {
                                errors: [{
                                    code: ErrorCodes.NotHavePermission,
                                    error: "you are not authorize",
                                }]
                            })
                        }
                        req.cookies.accountId = account._id
                        next()
                    }
                } else {
                    return ResponseService.send(res, HTTPCode.Unauthorized, {
                        message: "you are not authorize",
                    })
                }
            } else {
                return ResponseService.send(res, StatusCode.Unauthorized, {
                    message: "you are not authorize"
                })
            }
        } catch (error) {
            return ResponseService.send(res, StatusCode.Unauthorized, {
                message: "you are not authorize"
            })
        }
    }
}