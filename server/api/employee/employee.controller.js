import ResponseService from "../../service/responseService";
import { StatusCode } from "../../const/statusCodes";
import { EmployeeStatus, RoleStatus } from "../../const";
import employeeService from "./employee.service";

class EmployeeController {
    async CreateEmployee(req, res) {
        try {
            const employee = req.body
            employee.status = undefined

            const newEmployee = await employeeService.create(employee)

            return ResponseService.send(res, StatusCode.Ok, {
                message: "create employee success",
                data: newEmployee
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

    async GetListEmployee(req, res) {
        try {
            const {page, limit} = req.query

            const employees = await employeeService.getByQuery({
                page, limit
            })

            return ResponseService.send(res, StatusCode.Ok, {
                message: "get list employee success",
                data: employees
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

    async GetEmployeeById(req, res) {
        try {
            const {id} = req.params

            const employee = await employeeService.getById(id)

            return ResponseService.send(res, StatusCode.Ok, {
                message: "get info employee success",
                data: employee
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

    async UpdateEmployee(req, res) {
        try {
            const {id} = req.body
            const employee = req.body

            const newEmployee = await employeeService.updateById(id , employee)

            return ResponseService.send(res, StatusCode.Ok, {
                message: "update employee success",
                data: newEmployee
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

    async DeleteEmployee(req, res) {
        try {
            const {id} = req.body

            await employeeService.updateById(id , {
                status: EmployeeStatus.delete
            })

            return ResponseService.send(res, StatusCode.Ok, {
                message: "delete employee success"
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

export default new EmployeeController()