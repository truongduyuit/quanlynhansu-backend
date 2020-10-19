import { ErrorCodes } from '../const/errorCodes'
import {RequestType} from '../const/index'
import {StatusCode} from '../const/statusCodes'
import ResponseService from '../service/responeService'

export const ValidateRequest = function(validator, requestType) {
    return async function(req, res, next) {
        try {
            let data
            if (requestType === RequestType.body) data = req.body
            else if (requestType === RequestType.params) data = req.params
            else data = req.query

            console.log("data", data)
            const result = await validator.validate(data)
            if (result.error) {
                return ResponseService.send(res, StatusCode.ServerError, {
                    errors: [{
                        code: ErrorCodes.ValidateError,
                        error: `validate ${requestType} error`
                    }]
                })
            }

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