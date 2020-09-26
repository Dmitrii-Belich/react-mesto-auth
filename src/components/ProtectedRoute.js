import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({
  component: Component,
  forRegistered,
  ...props
}) {
  return forRegistered ? (
    <Route>
      {() =>
        !props.loggedIn ? <Component {...props} /> : <Redirect to="./" />
      }
    </Route>
  ) : (
    <Route>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Redirect to="./sing-in" />
      }
    </Route>
  );
}
