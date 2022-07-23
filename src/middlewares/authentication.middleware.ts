import { Request, Response, NextFunction } from "express"
import { User } from "../types/custom"

// in-memory database
const users: User[] = [
    {
        id: 1,
        name: "Maria",
        surname: "Williams",
        authenticationToken: "$2b$08$syAMV/CyYt.ioZ3w5eT/G.omLoUdUWwTWu5WF4/cwnD.YBYVjLw2O",
    },
    {
        id: 2,
        name: "James",
        surname: "Smith",
        authenticationToken: null,
    },
    {
        id: 3,
        name: "Patricia",
        surname: "Johnson",
        authenticationToken: "$2b$89$taWEB/dykt.ipQ7w4aTPGdo/aLsURUWqTWi9SX5/cwnD.YBYOjLe90",
    },
]

export function handleTokenBasedAuthentication(req: Request, res: Response, next: NextFunction) {
    const authenticationToken = req.headers["authorization"]

    if (authenticationToken !== undefined) {
        // using the in-memory sample database to verify if authenticationToken is valid
        const isTokenValid = !!users.find((u) => u.authenticationToken === authenticationToken)

        if (isTokenValid) {
            // retrieving the user associated with the authenticationToken value
            const user = users.find((u) => u.authenticationToken === authenticationToken)

            req.user = user

            // moving to the next middleware
            return next()
        }
    }

    // if the authorization token is invalid or missing returning a 401 error
    res.status(401).send("Unauthorized")
}
