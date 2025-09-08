import * as dotenv from "dotenv"

dotenv.config()

if (process.env.BASE_URL == undefined) {
    throw "Base Url is not provided"
}

export const BASE_URL = process.env.BASE_URL
