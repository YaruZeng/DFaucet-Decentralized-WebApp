import React, {useState} from "react";
import {token} from "../../../declarations/token";

function Faucet() {
  const [isDisabled, setDisabled] = useState(false); // control the states of the button
  const [buttonText, setText] = useState("Gimme gimme"); // constrol the states of the button text

  async function handleClick(event) {
    setDisabled(true);
    const result = await token.payOut();
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
