import React from "react";
import { User } from "../interfaces/user/user.model";

export interface AuthenticationContext {
    bearerToken: string | null;
    bearerTokenAsUser: () => User | undefined;
    setToken: (bearerToken: string | null) => void;
}

export const authenticationContext = React.createContext<AuthenticationContext>({
    bearerToken: null,
    setToken() { },
    bearerTokenAsUser() {
        return undefined;
    },
});