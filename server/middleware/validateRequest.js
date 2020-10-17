import { ErrorCodes } from '../const/errorCodes'
import {RequestType} from '../const/index'
import {StatusCode} from '../const/statusCodes'
import ResponseService from '../service/responeService'

function validateRequest(validator, requestType) {
    return async function(req, res, next) {
        try {
            let data
            if (requestType === RequestType.body) data = req.body
            else if (requestType === RequestType.params) data = req.params
            else data = req.query

            const result = await validator.validate(data)
            if (result.error) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    code: ErrorCodes.ValidateError,
                    message: `validate ${requestType} error`
                })
            }

            next()
        } catch (error) {
            next(error)
        }
    }
}