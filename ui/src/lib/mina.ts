import ZkappClient from "./zkapp_client";

const MINA_SUB_DECIMAL: number = 1e9;

const mina = (window as any)?.mina;

// Public Address of the zkApp account
const ZKAPP_CONTRACT_ADDRESS: string =
  "B62qo7TsbVEKU2q7md2upZuMwjEizuYcMy5t4FPdmB3YkonZbF5dJSu";

const zkClient = new ZkappClient();

export async function init() {
  const hasWallet = !!mina;
  if (hasWallet) {
    zkClient.setActiveInstanceToBerkeley();
    let network = await requestNetwork();
    const hasConnected =
      localStorage.getItem("WALLET_CONNECTED_BEFORE_FLAG") == "true";

    if (hasConnected) {
      let accounts = await requestAccounts();
    }
  }
}

export async function connect() {
  if (!mina) return;
  await requestNetwork();
  await requestAccounts();
  localStorage.setItem("WALLET_CONNECTED_BEFORE_FLAG", "true");
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

  if (accounts && accounts.length) {
    publicKey58 = accounts[0];
    await setupWorkerClient(publicKey58);
    walletConnected = true;
  } else {
    // localStorage.setItem(WALLET_CONNECTED_BEFORE_FLAG, "false");
  }
}

async function setupWorkerClient(publicKey58: string) {
  try {
    // check if connected user account exists or not
    const res = await zkClient.fetchAccount(publicKey58);
    const accountExists = res.error == null;
    // user.set({ accountExists });
  } catch (e: any) {
    console.error(e);
  }
}
