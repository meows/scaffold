import Elysia from "elysia"

const hello = new Elysia({ prefix: "/hello" })
  .get("/", () => "Hello, World!")
  .get("/:name", req => `Hello, ${req.params.name}!`)

export default hello
