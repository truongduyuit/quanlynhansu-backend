import ResponseService from "../../service/responeService";
import { StatusCode } from "../../const/statusCodes";
import departmentService from './department.service'
import { DepartmentStatus } from "../../const";

class DepartmentController {
    async CreateDepartment(req, res) {
        try {
            const {name} = req.body

            const department = await departmentService.create({name})

            return ResponseService.send(res, StatusCode.Ok, {
                message: "create department success",
                data: department
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

    async GetListDepartment(req, res) {
        try {
            const {page, limit} = req.query

            const departments = await departmentService.getByQuery({status: DepartmentStatus.normal}, page, limit)

            return ResponseService.send(res, StatusCode.Ok, {
                message: "get list department success",
                data: departments
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

    async GetDepartmentById(req, res) {
        try {
            const {id} = req.params

            const department = await departmentService.getOne({
                _id: id,
                status: DepartmentStatus.normal
            })

            return ResponseService.send(res, StatusCode.Ok, {
                message: "get department by id success",
                data: department
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

    async UpdateDepartment(req, res) {
        try {
            const {id} = req.params
            const {name} = req.body

            const department = await departmentService.updateById(id ,{name})

            return ResponseService.send(res, StatusCode.Ok, {
                message: "update department success",
                data: department
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

    async DeleteDepartment(req, res) {
        try {
            const {id} = req.params

            await departmentService.updateById(id ,{status: DepartmentStatus.delete})

            return ResponseService.send(res, StatusCode.Ok, {
                message: "delete department success"
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

export default new DepartmentController()