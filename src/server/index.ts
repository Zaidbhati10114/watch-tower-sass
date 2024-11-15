import { Hono } from "hono"
import { cors } from "hono/cors"
import { handle } from "hono/vercel"
import { authRouter } from "./routers/auth-routers"
import { categoryRouter } from "./routers/category-router"
import { paymentRouter } from "./routers/payment-router"
import { projectRouter } from "./routers/project-router"

const app = new Hono().basePath("/api").use(cors())

// Example of minimal CORS setup
app.use((c, next) => {
  c.header("Access-Control-Allow-Origin", "*")
  c.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
  return next()
})

const appRouter = app
  .route("/auth", authRouter)
  .route("/category", categoryRouter)
  .route("/payment", paymentRouter)
  .route("project", projectRouter)

// The handler Next.js uses to answer API requests
export const httpHandler = handle(app)

export default app

// export type definition of API
export type AppType = typeof appRouter
