import { Router } from "express"
import { HelloWorldController } from "../controllers/helloWorld"
import { handleLanguageHeader } from "../middleware/customHeaders.middleware"
import { handleTokenBasedAuthentication } from "../middleware/authentication.middleware"

export const router = Router()

router.get("/", handleLanguageHeader, HelloWorldController.default)
router.get("/hello", handleTokenBasedAuthentication, HelloWorldController.hello)
