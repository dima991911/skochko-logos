import React from 'react';
import { Route, Redirect } from "react-router-dom";

import { UserService } from "../../services/UserService";

export default function PrivateRoute({ children, ...rest }) {
    const isUserAuth = UserService.checkToken();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isUserAuth ? (
                    children
                ) : (
                    <Redirect to={{ pathname: "/", state: { from: location } }} />
                )
            }
        />
    );
}
