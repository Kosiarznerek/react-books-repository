import React, { ReactElement } from "react";
import { useLocation, Location } from "react-router";
import { Navigate } from "react-router-dom";
import { User } from "../interfaces/user/user.model";
import { AuthenticationContext, authenticationContext } from "./authentication.context";

interface Props {
    isAdmin: boolean;
}

export function AuthenticationGuard(props: React.PropsWithChildren<Props>): ReactElement | null {
    const location: Location = useLocation();

    const authentication: AuthenticationContext = React.useContext(authenticationContext);
    const user: User | undefined = authentication.bearerTokenAsUser();
    const adminAccessDenied: boolean = user !== undefined && props.isAdmin && !user.isAdmin

    if (!user || adminAccessDenied) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    if (props.children) {
        return <>{props.children}</>
    }

    return null;
}
