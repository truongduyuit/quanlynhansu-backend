import express from 'express'
import account from './account/account.router'
import role from './role/role.router'
import department from './department/department.router'

const router = express.Router()

router.use("/account", account)
router.use("/role", role)
router.use("/department", department)

router.get("/", async (req, res) => {
    return res.status(200).json({
        message: "OK"
    })
})

export default router