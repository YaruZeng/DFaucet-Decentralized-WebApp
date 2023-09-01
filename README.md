# DFaucet

Welcome to my DFaucet project which is supported by Udemy - The Complete 2023 Web Development Bootcamp. This webApp is deployed by dfx and note.js in the environment of ICP(Internet Computer) with backend supported by Motoko, and frontend by CSS, HTML, and React. 

<img width="1905" alt="image" src="https://github.com/IvyZayn/DFaucet-Decentralized-WebApp/assets/91594306/b743d759-6f68-42ed-b897-4b7f30b7fdb4">


# Deploy the Project to the Live IC Network and run it

1. Create and deploy canisters:

```
cd DFaucet-Decentralized-WebApp/
dfx deploy --network ic
```

2. Check the live canister ID:
```
dfx canister --network ic id token
```

3. Save the live canister ID to a command line variable:
```
LIVE_CANISTER_KEY="principal \"$( \dfx canister --network ic id token )\""
```

4. Check that it worked:
```
echo $LIVE_CANISTER_KEY
```

5. Transfer some tokens to the live canister:
```
dfx canister --network ic call token transfer "($LIVE_CANISTER_KEY, 50_000_000)"
```

6. Get live canister front-end id:
```
dfx canister --network ic id token_assets
```

7. Copy the id from step 6 and add .raw.ic0.app to the end to form a URL.
e.g. zdv65-7qaaa-aaaai-qibdq-cai.raw.ic0.app