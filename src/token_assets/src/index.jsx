import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import {AuthClient} from "@dfinity/auth-client";

const init = async () => { 

  const authClient = await AuthClient.create(); // create a authClient object

  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient); // if logined in, render the webpage
  } else {
      await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize", // a provider for the login frontend 
      onSuccess: () => { // what happen if the login is successful 
        handleAuthenticated(authClient);
      }
    });
  }
}

async function handleAuthenticated(authClient) {
  const identity = await authClient.getIdentity();
  const userPrincipal = identity._principal.toString(); // to get the principal of user who's logged in
  ReactDOM.render(<App loggedInPrincipal={userPrincipal}/>, document.getElementById("root"));
}

init();


