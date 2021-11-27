import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import { User } from "../interfaces/user/user.model";
import { authenticationContext } from './authentication.context';
import { AuthenticationStorage } from "./authentication.storage";

export default function AuthenticationProvider(props: React.PropsWithChildren<{}>) {

    const [bearerToken, setBearerToken] = useState<string | null>(AuthenticationStorage.value)

    const setToken = (bearerToken: string | null): void => {
        setBearerToken(bearerToken);
        AuthenticationStorage.value = bearerToken;
    }

    const bearerTokenAsUser = (): User | undefined => {
        if (!bearerToken) {
            return undefined;
        }

        return jwtDecode(bearerToken);
    }

    return (
        <authenticationContext.Provider value={{
            bearerToken: bearerToken,
            setToken: setToken,
            bearerTokenAsUser: bearerTokenAsUser,
        }}>
            {props.children}
        </authenticationContext.Provider>
    )

}