import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {

        let owner : Principal = Principal.fromText("rv6gp-xz7if-oikw6-jcql4-iu5e2-6jx5h-6yyhd-pdhmo-hz3dx-dgq2c-4ae");
        let totalSupply : Nat = 1000000000;
        let symbol : Text = "Samaritan";

        private stable var balanceEntries: [(Principal, Nat)] = []; // use an array of tuple to make hashMap stable
        private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash); // create a hashmap as the ledger to store <owener: tokenNum> pair
        if (balances.size() < 1) {
                balances.put(owner, totalSupply); // store the administer account here in case there isn't a upgrade
        };

        public query func balanceOf(who: Principal) : async Nat { // query for a user's balance

                let balance : Nat = switch (balances.get(who)) { // get rid of type ?Nat
                        case null 0;
                        case (?result) result;
                };
                return balance;
        };

        public query func getSymbol(): async Text { // get the symbol of token
                return symbol;
        };

        public shared(msg) func payOut() : async Text { // faucet user tokens, use shared(msg) to get cananister id of the user who called the function
                
                if (balances.get(msg.caller) == null) { // a user can only faucet once
                        let amount = 10000;
                        let result = await transfer(msg.caller, amount);
                        return result;  // to show on frontend 
                } else {
                        return "Already Claimed";
                }
                
        };

        public shared(msg) func transfer(to: Principal, amount: Nat) : async Text { // transfer token by subtracting from the caller and adding to another user
                let fromBalance = await balanceOf(msg.caller);

                if (fromBalance > amount) {
                        let newFromBalance: Nat = fromBalance - amount; // subtract amount from tranferer
                        balances.put(msg.caller, newFromBalance);

                        let toBalance = await balanceOf(to);
                        let newToBalance = toBalance + amount; // add amount to tranferee
                        balances.put(to, newToBalance);

                        return "Success";
                } else {

                        return "Insufficient Funds";
                }
        };

        system func preupgrade() { // shifted <owener, tokenNum> pairs in the balances hashMap into balanceEntries array before every upgrade
                balanceEntries := Iter.toArray(balances.entries());
        };

        system func postupgrade() { // shifted <owener, tokenNum> pairs in balanceEntries array into the balances hashMap after every upgrade
                balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
                if (balances.size() < 1) {
                        balances.put(owner, totalSupply); // store the administer account
                }
        };

};