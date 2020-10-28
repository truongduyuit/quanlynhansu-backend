import express from 'express'
import permissionController from './permission.controller'

const router = express.Router()

router.get(
    "/",
    permissionController.GetListPermission
)

export default router