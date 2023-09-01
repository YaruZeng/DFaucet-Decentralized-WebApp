import React, {useState} from "react";
import {Principal} from '@dfinity/principal';
import {token} from "../../../declarations/token";

function Balance() {

  const [inputValue, setInput] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [cryptoSymbol, setSymbol] = useState("");
  const [isHidden, setHidden] = useState(true); // control the states of paragraph that shows balance

  async function handleClick() {
    const principal = Principal.fromText(inputValue); // convert input text to a principal type
    const balance = await token.balanceOf(principal);
    setBalance(balance.toLocaleString()); // convert the balance result from backend to a string
    const symbol = await token.getSymbol();
    setSymbol(symbol);
    setHidden(false); // if there's a balance, display the balance paragraph
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)} 
          // once a user types in, set the input state to be the value that user types in 
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {cryptoSymbol}.</p>
    </div>
  );
}

export default Balance;
