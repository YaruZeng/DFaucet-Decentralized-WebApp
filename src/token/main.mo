import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";


actor Token {

        var owner : Principal = Principal.fromText("rv6gp-xz7if-oikw6-jcql4-iu5e2-6jx5h-6yyhd-pdhmo-hz3dx-dgq2c-4ae");
        var totalSupply : Nat = 1000000000;
        var symbol : Text = "Samaritan";

        var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash); // create a hashmap as the ledger to store <owener: tokenNum> pair

        balances.put(owner, totalSupply); // store the above owner

        
        public query func balanceOf(who: Principal) : async Nat { // query for a user's balance

                let balance : Nat = switch (balances.get(who)) { // get rid of type ?Nat
                        case null 0;
                        case (?result) result;
                };
                return balance;
        };

        public query func getSymbol(): async Text { // get the symbol of token
                return symbol;
        }
}