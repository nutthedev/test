import "@stdlib/deploy";

message Deposit {
    amount: Int;
    to: Address;
}

contract Treasury with Deployable {

    deployer: Address;
    totalSupply: Int;

    init () {
        self.deployer = sender();
        self.totalSupply = 0;
    }

    receive(msg: Deposit) {
        let init: StateInit = initOf Box(myAddress(), msg.to);
        send(SendParameters{
            to: contractAddress(init),
            body: InternalAddTokens{amount: context().value, origin: myAddress()}.toCell(),
            value: ton("0.03"),
            mode: SendIgnoreErrors,
            code: init.code,
            data: init.data
        });
        self.reply("Deposited".asComment());
    }

    receive("withdraw all") {
        require(sender() == self.deployer, "Only deployer is allowed to withdraw");
        send(SendParameters{
            to: self.deployer,
            bounce: true,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }

    get fun boxAddress(owner: Address): Address {
        return contractAddress(initOf Box(myAddress(), owner));
    }

    get fun getTON(): String {
        return myBalance().toCoinsString();
    }
}

message InternalAddTokens {
    amount: Int;
    origin: Address;
}

contract Box with Deployable {

    treasury: Address;
    owner: Address;
    balance: Int;

    init(treasury: Address, owner: Address) {
        self.treasury = treasury;
        self.owner = owner;
        self.balance = 0;
    }

    receive(msg: InternalAddTokens) {
        if (msg.origin == self.treasury) {
            require(sender() == self.treasury, "treasury only");
        }

        self.balance = self.balance + msg.amount;
    }

    receive("withdraw all") {
        require(sender() == self.owner, "Only owner is allowed to withdraw");
        send(SendParameters{
            to: self.owner,
            bounce: true,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }

    get fun balance(): Int {
        return self.balance;
    }

    get fun getTON(): String {
        return myBalance().toCoinsString();
    }
}