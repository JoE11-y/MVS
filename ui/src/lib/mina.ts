import ZkappClient from "./zkapp_client";
import type { Data } from "./zkapp_client";

export const MINA_SUB_DECIMAL: number = 1e9;
const transactionFee = 0.1;

let mina: any;

if (typeof window !== "undefined") {
  // Your client-side code that uses window goes here
  mina = (window as any)?.mina;
}

// Public Address of the zkApp account
const ZKAPP_CONTRACT_ADDRESS: string =
  "B62qqKuDzH2mDtDqXtxSmfeepaoJMNDh3WZuAG6Dp3ov9NmsFL9RZpJ";

const zkClient = new ZkappClient();

export async function init() {
  const hasWallet = !!mina;
  let accounts;
  let network;
  let account;

  if (hasWallet) {
    zkClient.setActiveInstanceToBerkeley();
    network = await requestNetwork();
    const hasConnected =
      localStorage.getItem("WALLET_CONNECTED_BEFORE_FLAG") == "true";

    if (hasConnected) {
      accounts = await requestAccounts();
      account = await handleAccountsChanged(accounts);
    }
  }

  return {
    hasWallet: hasWallet,
    accountPubKey: account?.publicKey58 || "",
    network: network || "",
    walletConnected: account?.walletConnected || false,
    accountExists: account?.accountExists || false,
  };
}

export async function connect() {
  if (!mina) throw new Error("Mina wallet not found");
  const network = await requestNetwork();
  const accounts = await requestAccounts();
  const { walletConnected, publicKey58, accountExists } =
    await handleAccountsChanged(accounts);
  return {
    accountPubKey: publicKey58 || "",
    network: network || "",
    walletConnected: walletConnected,
    accountExists: accountExists,
  };
}

async function requestNetwork() {
  let data = await mina
    .requestNetwork()
    .then((data: any) => {
      return data;
    })
    .catch((e: any) => console.error(e));

  return data;
}

async function requestAccounts() {
  let data = await mina
    .requestAccounts()
    .then((data: any) => {
      return data;
    })
    .catch((e: any) => console.error(e));

  return data;
}

async function handleAccountsChanged(accounts: string[]) {
  let publicKey58: string = "";
  let walletConnected: boolean = false;
  let accountExists: boolean = false;

  if (accounts && accounts.length) {
    publicKey58 = accounts[0];
    accountExists = await checkIfAccountExists(publicKey58);
    if (accountExists) {
      walletConnected = true;
      localStorage.setItem("WALLET_CONNECTED_BEFORE_FLAG", "true");
    }
  } else {
    localStorage.setItem("WALLET_CONNECTED_BEFORE_FLAG", "false");
  }

  return { walletConnected, publicKey58, accountExists };
}

async function checkIfAccountExists(publicKey58: string) {
  try {
    zkClient.setActiveInstanceToBerkeley();
    // check if connected user account exists or not
    const res = await zkClient.fetchAccount(publicKey58);
    const accountExists = res.error == null;
    return accountExists;
  } catch (e: any) {
    console.error(e);
    return false;
  }
}

export async function addUser(publicKey: string, data: Data) {
  zkClient.setActiveInstanceToBerkeley();
  await zkClient
    .setupZkappInstance(ZKAPP_CONTRACT_ADDRESS)
    .then(() => zkClient.getAddUserTransactionJSON(publicKey, data))
    .then((txnJSON) => zkClient.sendTransaction(txnJSON, transactionFee))
    .then((hash) => console.log("add user txn hash:", hash))
    .then((result) => {
      console.log(result);
    });
}

export async function checkUser(publicKey: string) {
  zkClient.setActiveInstanceToBerkeley();
  await zkClient
    .setupZkappInstance(ZKAPP_CONTRACT_ADDRESS)
    .then(() => zkClient.getCheckUserTransactionJSON(publicKey))
    .then((txnJSON) => zkClient.sendTransaction(txnJSON, transactionFee))
    .then((hash) => console.log("check user txn hash:", hash))
    .then((result) => {
      console.log(result);
    });
}
