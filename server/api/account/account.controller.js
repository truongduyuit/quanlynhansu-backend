import { StatusCode } from "../../const/statusCodes";
import jwt from "../../service/jwt";
import ResponseService from "../../service/responseService";
import roleService from '../role/role.service'

class AccountController {
    async Login(req, res) {
        try {
            const {accountId, isAdmin, roleId} = req.body

            const role = await roleService.getById(roleId)
            
            return ResponseService.send(res, StatusCode.Ok, {
                message: "login success",
                data: {
                    accessToken: jwt.generateAccessToken({
                        accountId, isAdmin
                    }),
                    refreshToken: jwt.generateRefreshToken({
                        accountId, isAdmin
                    }),
                    role
                },
            });
        } catch (error) {
            return ResponseService.send(res, StatusCode.ServerError, {
                errors: [
                    {
                        code: StatusCode.ServerError,
                        error: error.message,
                    },
                ],
            });
        }
    }
}

export default new AccountController()