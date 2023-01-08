import {Response} from "express";

const responseWrapper = (response: Response, code: number, body: any) => {
    response.status(code)
        .json(body)
}

export const responseCreated = (response: Response, body: any) => {
    responseWrapper(
        response,
        201,
        body
    )
}

export const responseOk = (response: Response, body: any) => {
    responseWrapper(
        response,
        200,
        body
    )
}

export const responseNotFound = (response: Response, body: any) => {
    responseWrapper(
        response,
        404,
        body
    )
}

export const responseUnauthorized = (response: Response, body: any) => {
    responseWrapper(
        response,
        401,
        body
    )
}

export const responseBadRequest = (response: Response, body: any) => {
    responseWrapper(
        response,
        400,
        body
    )
}

export const responseInternalServerError = (response: Response, body: any) => {
    responseWrapper(
        response,
        500,
        body
    )
}

