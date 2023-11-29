import {
  MVSContract,
  MVSMerkleWitness,
  UserData,
} from "../../../contracts/build/contracts/src";
import { Mina, PublicKey, fetchAccount } from "o1js";
import axios from "axios";

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

export interface Data {
  name: string;
  email: string;
  image: string;
}

const BERKELEY_ENDPOINT = "https://proxy.berkeley.minaexplorer.com/graphql";

const ZKDB_ENDPOINT = "http://localhost:1234/zkdb";

async function createRecord(data: Data, userPubKey: string) {
  const responseData = await axios
    .post(`${ZKDB_ENDPOINT}/addUser/${userPubKey}`, data)
    .then((response) => {
      return response.data;
    });

  return responseData;
}

async function retrieveRecord(userPubKey: string) {
  const data = await axios
    .get(`${ZKDB_ENDPOINT}/getUser/${userPubKey}`)
    .then((response) => {
      return response.data;
    });

  return data;
}

export default class ZkappClient {
  hasBeenSetup: boolean;
  contract: null | typeof MVSContract;
  zkapp: null | MVSContract;
  transaction: null | Transaction;

  constructor() {
    this.hasBeenSetup = false;
    this.contract = MVSContract;
    this.zkapp = null;
    this.transaction = null;
  }

  setActiveInstanceToBerkeley() {
    const Berkeley = Mina.Network(BERKELEY_ENDPOINT);
    Mina.setActiveInstance(Berkeley);
  }
  publicKeyFromBase58(publicKey58: string) {
    return PublicKey.fromBase58(publicKey58);
  }
  loadContract() {
    console.log("loading contract...");
    this.contract = MVSContract;
    console.log("done");
  }
  async compileContract() {
    console.log("compiling contract...");
    await this.contract!.compile();
    console.log("done");
  }
  async fetchAccount(publicKey58: string): ReturnType<typeof fetchAccount> {
    const publicKey = this.publicKeyFromBase58(publicKey58);
    return await fetchAccount({ publicKey });
  }
  initZkappInstance(publicKey58: string) {
    console.log("init instance...");
    const publicKey = this.publicKeyFromBase58(publicKey58);
    this.zkapp = new this.contract!(publicKey);
    console.log("done");
  }
  async setupZkappInstance(publicKey58: string) {
    if (this.hasBeenSetup) return;
    console.log("setting up Zkapp...");
    this.loadContract();
    await this.compileContract();
    this.initZkappInstance(publicKey58);
    this.hasBeenSetup = true;
    console.log("done");
  }
  async createAddUserTransaction(userPubKey: string, data: Data) {
    if (!this.hasBeenSetup) return;
    const { userData, userWitness } = await createRecord(data, userPubKey);
    const transaction = await Mina.transaction(() => {
      this.zkapp!.addNewUser(
        (userData as UserData).hash(),
        userWitness as MVSMerkleWitness
      );
    });
    this.transaction = transaction;
  }
  async getAddUserTransactionJSON(userPubKey: string, data: Data) {
    console.log("getting transaction");
    await this.createAddUserTransaction(userPubKey, data);
    await this.proveTransaction();
    const transactionJson = await this.getTransactionJSON();
    return transactionJson;
  }
  async createCheckUserTransaction(userPubKey: string) {
    if (!this.hasBeenSetup) return;
    const { userData, userWitness } = await retrieveRecord(userPubKey);
    const transaction = await Mina.transaction(() => {
      this.zkapp!.verifyUser(
        (userData as UserData).hash(),
        userWitness as MVSMerkleWitness
      );
    });
    this.transaction = transaction;
  }
  async getCheckUserTransactionJSON(userPubKey: string) {
    console.log("getting transaction");
    await this.createCheckUserTransaction(userPubKey);
    await this.proveTransaction();
    const transactionJson = await this.getTransactionJSON();
    return transactionJson;
  }
  async proveTransaction() {
    await this.transaction!.prove();
  }
  async getTransactionJSON() {
    return this.transaction!.toJSON();
  }
  async sendTransaction(transactionJSON: any, transactionFee: number) {
    const { hash } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: "",
      },
    });
    return hash;
  }
}
