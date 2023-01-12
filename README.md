# studing

## Перед запуском проекта установить 

- node js [https://nodejs.org/en/]
- typescript
- yarn **Опционально

## Установка 

- node js Нажимаете все дальше ничего не меняя
- typecript В командной строке "node commant promt". Команда npm install -g typescript
- yarn **Опционально. В командной строке "node commant promt". Команда npm install --global yarn

## Внутри папки проекта 
- Открыть консоль и ввести комманду:
```
npm install
```
Или 
```
yarn
```

## Запуск проекта

Коммандой:
```
yarn watch:server
```
Или
```
npm watch:server
```

## ошибка при запуске или установки через yarn 

- Открыть от имени администратора powerShell и ввести комманду Get-ExecutionPolicy и Set-ExecutionPolicy Unrestrict может спрашивать поддтверждение буквой выбираем A 

## Базовый урл http://localhost:8080/

- Урл для пользователя http://localhost:8080/user
- Урл для региcтрации http://localhost:8080/user/registration
- Урл для авторизации http://localhost:8080/user/auth
- Урл для подтверждения пользователя http://localhost:8080/user/getUser

## Методы Api
- Регистрация post принимает в себя поля {username, password}
- Авторизация post принимает в себя поля {username, password}
- Подтверждение роли get принимает в себя {token}

## Пример
- Метод post
 http://localhost:8080/user/registration
```
method: 'POST',
headers: {
'content-type': 'application/json'
}
body: '{
username,
password
}'
```
- Возвращает 

```
{
status,
message
}
```

| Метод  | Урл                                       | Входные параметры | Выходные параметры | Авторизационный токен |
| ------------- |-------------------------------------------| ------------- | ------------- | ------------- |
| post  | (http://localhost:8080/user/registration) | username, password | status, message | нет |
| post  | (http://localhost:8080/user/auth)         | username, password | status, message, token | нет |
| get  | (http://localhost:8080/user/getUser)      | token | ничего | да |
| post  | (http://localhost:8080/post/create)      | title: string, content: string | { status: number, posts: [ {id: string value: {title: string, content: string, createTime: Date}} ] } | да |
| get  | (http://localhost:8080/post/getPost)      | token | { status: number, posts: [ {id: string value: {title: string, content: string, createTime: Date}} ] } | да |
| put  | (http://localhost:8080/post/set_complete)  | id: number or number[] | { status: number, posts: [ {id: string value: {title: string, content: string, createTime: Date, isComplete: boolean}} ] } | да |
| put  | (http://localhost:8080/post/remove_complete)  | id: number or number[] | { status: number, posts: [ {id: string value: {title: string, content: string, createTime: Date, isComplete: boolean}} ] } | да |
| delete  | (http://localhost:8080/post/delete)  | id: number | status | да |

