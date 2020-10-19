import bcrypt from 'bcrypt'
import { AccountStatus } from '../../const'
import { ErrorCodes } from '../../const/errorCodes'
import { StatusCode } from '../../const/statusCodes'
import ResponseService from '../../service/responeService'
import accountService from './account.service'

class AccountMiddleware {
    async Login(req, res, next) {
        try {
            const {username, password} = req.body
            const hash = await bcrypt.hash(password, 10)

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
}

export default new AccountMiddleware()