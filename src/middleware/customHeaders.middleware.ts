import { Request, Response, NextFunction } from "express"
import { Language, SUPPORTED_LANGUAGES } from "../types/custom"

export function handleLanguageHeader(req: Request, res: Response, next: NextFunction) {
    const languageHeader = req.headers["content-language"]

    // default language: "en"
    let language: Language = SUPPORTED_LANGUAGES[0]

    if (typeof languageHeader === "string" && SUPPORTED_LANGUAGES.includes(languageHeader)) {
        language = languageHeader
    }

    req.language = language

    return next()
}
