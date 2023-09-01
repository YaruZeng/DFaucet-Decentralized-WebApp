import React, {useState} from "react";
import {Principal} from '@dfinity/principal';
import {AuthClient} from "@dfinity/auth-client";

function Transfer() {
  const [recipientId, setId] = useState(""); // control the states of the input ID
  const [amount, setAmount] = useState(""); // control the states of the input amount
  const [feedback, setFeedback] = useState(""); // control the states of the feedback text
  const [isDisabled, setDisabled] = useState(false); // control the states of the button
  const [isHidden, setHidden] = useState(true); // control the states of the feedback paragraph

  async function handleClick() {
    setHidden(true);
    setDisabled(true);
    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);

    // create an actor using user identity so that tokens can be transfered from an authenticated user
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    const result = await authenticatedCanister.transfer(recipient, amountToTransfer);

    setFeedback(result);
    setHidden(false);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
