import {Response} from "express";
import {
    responseBadRequest, responseCreated,
    responseInternalServerError,
    responseNotFound,
    responseOk,
    responseUnauthorized
} from "./ResponseEntityHelper";

export const responseUserToken = (response: Response, token: string) => {
    const responseBody = {
        status: 0,
        message: "Успешная авторизация!",
        token: token
    }

    responseOk(
        response,
        responseBody
    )
}

export const responseUserPosts = (response: Response, username: string, posts: []) => {
    if (!posts) {
        posts = [];
    }

    const responseBody = {
        status: 0,
        username: username,
        posts: posts
    }

    responseOk(
        response,
        responseBody
    )
}

export const responseUserAlreadyExists = (response: Response) => {
    const responseBody = {
        status: 2,
        message: "Такой пользователь уже существует!"
    }

    responseBadRequest(
        response,
        responseBody
    )
}

export const responseUserCreated = (response: Response) => {
    const responseBody = {
        status: 0,
        message: "Пользователь успешно создан!"
    }

    responseCreated(
        response,
        responseBody
    )
}

export const responseUserDataIsNotCorrect = (response: Response) => {
    const responseBody = {
        status: 1,
        message: "Введен не правильно пароль или имя пользователя!"
    }

    responseUnauthorized(
        response,
        responseBody
    )
}

export const responseUserNotFound = (response: Response) => {
    const responseBody = {
        status: 3,
        message: "Пользователь не найден!"
    }

    responseNotFound(
        response,
        responseBody
    )
}

export const responseUserUnauthorized = (response: Response) => {
    const responseBody = {
        status: 3,
        message: "Пользователь не авторизован!"
    }

    responseUnauthorized(
        response,
        responseBody
    )
}

export const responseUserError = (response: Response, message: string) => {
    const responseBody = {
        status: 3,
        message: message
    }

    responseInternalServerError(
        response,
        responseBody
    )
}

