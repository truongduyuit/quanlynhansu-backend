import ResponseService from "../../service/responseService";
import { StatusCode } from "../../const/statusCodes";
import permissionService from './permission.service'

class PermissionController {
    async GetListPermission(req, res) {
        try {
            const {page, limit} = req.query

            const permissions = await permissionService.getByQuery({
                page, limit
            })

            return ResponseService.send(res, StatusCode.Ok, {
                message: "get list permission success",
                data: permissions
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

export default new PermissionController()