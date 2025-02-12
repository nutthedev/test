import { Buffer } from "buffer";
import { TonConnectUI } from "@tonconnect/ui";
import { Address, toNano, beginCell } from "@ton/core";
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

window.call_getTON = call_getTON;

async function call_getTON() {
    const connectedWallet = await getWalletAddress();
    console.log({ connectedWallet });

    //wallet balance
    const balance =  await tonweb.getBalance(connectedWallet.tonkeeperAddress);
    console.log({ balance });

    //smartcontract getTON
    const contractAddress = "EQCa_BJaON14OzOY0h4rzdxSf8pm6ARCb5xZmEyjLbS9JGTE";

    /* should return 'getTON' value from smartcontract */
}

window.call_boxAddress = call_boxAddress;

async function call_boxAddress() {
    const connectedWallet = await getWalletAddress();
    console.log({ connectedWallet });

    const contractAddress = "EQCa_BJaON14OzOY0h4rzdxSf8pm6ARCb5xZmEyjLbS9JGTE";

    /* should return 'boxAddress' address from smartcontract
    
    by setting parameter is UQCGYtmVT1yZS4sd8vDIyubtWrlwlLYdWHBBx7ILJnEkFicG
    
    result should be EQBsSWY5zRRgsI5qPZ9-pDqrSWsyhbADZ6880S1BRqu9eU00

    (because treasury will create one box address per user wallet was called deposit)
    */
}