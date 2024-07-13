import { GitHub, Discord } from "arctic"

export const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!, "")
export const discord = new Discord(process.env.DISCORD_CLIENT_ID!, process.env.DISCORD_CLIENT_SECRET!, "")
