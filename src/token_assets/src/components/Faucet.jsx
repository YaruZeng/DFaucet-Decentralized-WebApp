import React, {useState} from "react";
import {token, canisterId, createActor} from "../../../declarations/token";
import {AuthClient} from "@dfinity/auth-client";

function Faucet() {
  const [isDisabled, setDisabled] = useState(false); // control the states of the button
  const [buttonText, setText] = useState("Gimme gimme"); // constrol the states of the button text

  async function handleClick(event) {
    setDisabled(true);

    // create an actor using user identity so that tokens can be assigned to a user
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.payOut();
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Samaritan tokens here! Claim 10,000 Samaritan tokens to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
