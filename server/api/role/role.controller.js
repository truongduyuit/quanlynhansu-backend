import ResponseService from "../../service/responeService";
import { StatusCode } from "../../const/statusCodes";
import roleService from "./role.service";
import { RoleStatus } from "../../const";

class RoleController {
    async CreateRole(req, res) {
        try {
            const { roleName, rolePermissions} = req.body

            const role = await roleService.create({
                roleName, rolePermissions
            })

            return ResponseService.send(res, StatusCode.Ok, {
                message: "create role success",
                data: role
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

    async GetListRole(req, res) {
        try {
            const {page, limit} = req.query

            const roles = await roleService.getByQuery({status: RoleStatus.enable}, page, limit)

            return ResponseService.send(res, StatusCode.Ok, {
                message: "get list role success",
                data: roles
            });
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

    async GetRoleById(req, res) {
        try {
            const {id} = req.params

            const role = await roleService.getOne({
                _id: id,
                status: RoleStatus.enable
            })

            return ResponseService.send(res, StatusCode.Ok, {
                message: "get role by id success",
                data: role
            });
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

    async UpdateRole(req, res) {
        try {
            const {id} = req.params
            const { roleName, rolePermissions} = req.body

            const role = await roleService.updateById(id, {
                roleName, rolePermissions
            })

            return ResponseService.send(res, StatusCode.Ok, {
                message: "update role success",
                data: role
            });
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

    async DeleteRole(req, res) {
        try {
            const {id} = req.params

            await roleService.updateById(id, {
                status: RoleStatus.disable
            })

            return ResponseService.send(res, StatusCode.Ok, {
                message: "delete role success"
            });
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

export default new RoleController()