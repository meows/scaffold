/** Colorizes text for console output. */
export default class Color {
  static red = (text:string) => `\x1b[31m${text}\x1b[0m`
  static green = (text:string) => `\x1b[32m${text}\x1b[0m`
  static yellow = (text:string) => `\x1b[33m${text}\x1b[0m`
  static blue = (text:string) => `\x1b[34m${text}\x1b[0m`
  static magenta = (text:string) => `\x1b[35m${text}\x1b[0m`
  static cyan = (text:string) => `\x1b[36m${text}\x1b[0m`
  static white = (text:string) => `\x1b[37m${text}\x1b[0m`
}