import { Buffer } from "buffer";
import { TonConnectUI } from "@tonconnect/ui";
import { toNano, beginCell, Address, TupleBuilder } from "@ton/core";
import { TonClient } from "ton";
import TonWeb from "tonweb";

if (!window.Buffer) {
    window.Buffer = Buffer;
}

const tonweb = new TonWeb();
const tonConnectUI = new TonConnectUI({
    manifestUrl: `https://ton-dep.vercel.app/tonconnect-manifest.json`,
    buttonRootId: `ton-connect`
});

async function getWalletAddress() {
    if (!tonConnectUI.wallet) {
        console.error("Wallet not connected!");
        return null;
    }

    const hexAddress = tonConnectUI.wallet.account.address;
    const parseFromHexAddress = new tonweb.utils.Address(hexAddress);
    const tonkeeperAddress = parseFromHexAddress.toString(true)

    return {
        hexAddress,
        tonkeeperAddress,
    };
}

tonConnectUI.onStatusChange(async (status) => {
    console.log({ status });

    if (status) {
        console.log("Wallet Connected:", await getWalletAddress());
    }
});

window.withdraw = withdraw;

async function withdraw(contractAddress) {
    const payload = beginCell()
        .storeUint(0, 32)
        .storeStringTail("withdraw all")
        .endCell();

    try {
        const tx = await tonConnectUI.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 600,
            messages: [
                {
                    address: contractAddress,
                    amount: toNano(0.05).toString(),
                    payload: payload.toBoc().toString("base64"),
                },
            ],
        });

        console.log("Transaction sent:", tx);
    } catch (error) {
        console.error("Failed to send transaction:", error);
    }
}

window.deposit = deposit;

async function deposit() {
    const amount = toNano(0.05);
    const contractAddress = "EQCa_BJaON14OzOY0h4rzdxSf8pm6ARCb5xZmEyjLbS9JGTE";
    const toAddress = Address.parse("UQCGYtmVT1yZS4sd8vDIyubtWrlwlLYdWHBBx7ILJnEkFicG");

    const payload = beginCell()
        .storeUint(2699315230, 32)
        .storeInt(amount, 257)
        .storeAddress(toAddress)
        .endCell();

    try {
        const tx = await tonConnectUI.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 600,
            messages: [
                {
                    address: contractAddress,
                    amount: amount.toString(),
                    payload: payload.toBoc().toString("base64"),
                },
            ],
        });

        console.log("Transaction sent:", tx);
    } catch (error) {
        console.error("Failed to send transaction:", error);
    }
}


// HELP ME HERE//

window.getBal = getBal;

async function getBal() {
    //wallet balance
    const balance = await tonweb.getBalance(connectedWallet.tonkeeperAddress);
    console.log({ balance });
}

window.call_getTON = call_getTON;

async function call_getTON() {
    const connectedWallet = await getWalletAddress();
    console.log({ connectedWallet });

    const contractAddress = Address.parse("EQCa_BJaON14OzOY0h4rzdxSf8pm6ARCb5xZmEyjLbS9JGTE");
    const client = new TonClient({ endpoint: 'https://toncenter.com/api/v2/jsonRPC' });

    const result = await client.callGetMethod(contractAddress, 'getTON');
    const responseValue = result.stack.readString();
    console.log({ responseValue });

    /*const getTON = result.stack.readString();
    console.log({ getTON });*/
}

window.call_boxAddress = call_boxAddress;

async function call_boxAddress() {
    const connectedWallet = await getWalletAddress();
    console.log({ connectedWallet });

    const contractAddress = Address.parse("EQCa_BJaON14OzOY0h4rzdxSf8pm6ARCb5xZmEyjLbS9JGTE");
    const walletAddress = Address.parse(connectedWallet.hexAddress);
    const client = new TonClient({ endpoint: 'https://toncenter.com/api/v2/jsonRPC' });

    const stack = new TupleBuilder();
    stack.writeAddress(walletAddress);

    const result = await client.callGetMethod(contractAddress, 'boxAddress', stack.build());
    const responseValue = result.stack.readAddress();

    const addressOpt = responseValue.toString();
    console.log({ addressOpt });
}

window.systemCcall = convertTextTofunc;

async function convertTextTofunc(params) {
    const str = params;

    const connectedWallet = await getWalletAddress();

    const functionName = str.split('(')[0];
    const args = str.slice(functionName.length + 1, -1);
    const parsedArgs = args.split(',').map(arg => arg.trim());

    console.log({ connectedWallet, functionName, parsedArgs });
}