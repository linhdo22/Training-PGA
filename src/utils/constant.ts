const development = process.env.NODE_ENV != 'production'

export const SERVER_URL = development ? "/api" : ""

export const ACCESS_TOKEN = "token"