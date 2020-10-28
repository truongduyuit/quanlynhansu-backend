import express from 'express'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from "./swagger.json"

import account from './account/account.router'
import role from './role/role.router'
import employee from './employee/employee.router'
import department from './department/department.router'
import permission from './permission/permission.router'

const router = express.Router()

router.use("/account", account)
router.use("/role", role)
router.use("/employee", employee)
router.use("/department", department)
router.use("/permission", permission)

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router.get("/", async (req, res) => {
    return res.status(200).json({
        message: "OK"
    })
})

export default router