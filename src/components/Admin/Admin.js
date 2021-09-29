import React from "react";
import { fakeAuth } from "../Auth";
import { Redirect } from "react-router-dom";

const Admin = (props) => {
  const [redirectToRefer, setRedirectToRefer] = React.useState(false);
  const { from } = props.location.state || { from: { pathname: "/question" } };
  const login = () => {
    fakeAuth.authenticate(() => {
      setRedirectToRefer(true);
    });
  };

  return redirectToRefer ? (
    <Redirect to={from} />
  ) : (
    <div>
      <p>
        You must log in to view <b>{from.pathname.split("/")}</b>
      </p>
      <button onClick={login}>Log in</button>
    </div>
  );
};

export default Admin;
