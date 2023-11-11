import {
  Mina,
  PrivateKey,
  AccountUpdate,
  Field,
  PublicKey,
  CircuitString,
} from 'o1js';
import { ZKDatabaseStorage } from 'zkdb';
import {
  UserSession,
  MVSMerkleWitness,
  UserData,
  MVSContract,
} from './mvsV1.js';

// Height of the Merkle Tree
const merkleHeight = 20;
// Enable this to generate proofs
const doProofs = true;
// Merkle Tree root commitment at the time of contract initialization
let initialCommitment: Field;

(async () => {
  let Local = Mina.LocalBlockchain({ proofsEnabled: doProofs });
  Mina.setActiveInstance(Local);
  let initialBalance = 10_000_000_000;

  let feePayerKey = Local.testAccounts[0].privateKey;
  let feePayer = Local.testAccounts[0].publicKey;

  // the zkapp account
  let zkappKey = PrivateKey.random();
  let zkappAddress = zkappKey.toPublicKey();

  // we now need "wrap" the Merkle tree around our off-chain storage
  // we initialize a new Merkle Tree with height 8
  const zkdb = await ZKDatabaseStorage.getInstance('zkdb-mvs', {
    storageEngine: 'local',
    merkleHeight,
    storageEngineCfg: {
      location: './data',
    },
  });

  initialCommitment = await zkdb.getMerkleRoot();
  console.log('Initial root:', initialCommitment.toString());

  let mvsContract = new MVSContract(zkappAddress);
  console.log('Deploying Piglet Bank..');
  if (doProofs) {
    const { verificationKey } = await MVSContract.compile();
    console.log('Verication KEY: ', verificationKey.hash.toString());
  }
  let tx = await Mina.transaction(feePayer, () => {
    AccountUpdate.fundNewAccount(feePayer).send({
      to: zkappAddress,
      amount: initialBalance,
    });
    mvsContract.deploy();
  });
  await tx.prove();
  await tx.sign([feePayerKey, zkappKey]).send();

  // Lets add users to zkdb
  const accountPubKeyList = new Array(4)
    .fill(null)
    .map(() => PrivateKey.random().toPublicKey().toBase58());

  for (let i = 0; i < accountPubKeyList.length; i++) {
    const findRecord = zkdb.findOne('userAddress', accountPubKeyList[i]);
    if (findRecord.isEmpty()) {
      await zkdb.add(
        new UserData({
          userAddress: PublicKey.fromBase58(accountPubKeyList[i]),
          session: new UserSession({
            name: CircuitString.fromString(`user${i}`),
            email: CircuitString.fromString(`user${i}@email.com`),
            image: CircuitString.fromString(`user${i}.png`),
          }),
        })
      );
      console.log(`User ${accountPubKeyList[i]} created`);
    } else {
      const account = await findRecord.load(UserData);
      console.log(
        `Load account ${accountPubKeyList[i]}, with session: ${
          account.json().session
        }`
      );
    }
  }

  console.log('test add transactions');
  await addUser(accountPubKeyList[0]);
  await addUser(accountPubKeyList[1]);

  console.log('test verify transactions');
  await checkUser(accountPubKeyList[0]);
  await checkUser(accountPubKeyList[1]);

  async function addUser(userAddress: string) {
    console.log(`Adding ${userAddress} to MVS contract`);

    // check for account from db
    const findRecord = zkdb.findOne('userAddress', userAddress);

    if (findRecord.isEmpty()) {
      throw new Error('User does not exist on DB');
    }
    // load account instance
    const accData = await findRecord.load(UserData);
    const accWitness = new MVSMerkleWitness(await findRecord.witness());

    // Perform the transaction
    let tx = await Mina.transaction(feePayer, () => {
      mvsContract.addNewUser(accData.hash(), accWitness);
    });

    await tx.prove();
    await tx.sign([feePayerKey, zkappKey]).send();
  }

  async function checkUser(userAddress: string) {
    console.log(`Check for user ${userAddress} in MVS contract`);

    // check for account from db
    const findRecord = zkdb.findOne('userAddress', userAddress);

    if (findRecord.isEmpty()) {
      throw new Error('User does not exist on DB');
    }
    // load account instance
    const accData = await findRecord.load(UserData);
    const accWitness = new MVSMerkleWitness(await findRecord.witness());

    // Perform the transaction
    let tx = await Mina.transaction(feePayer, () => {
      mvsContract.verifyUser(accData.hash(), accWitness);
    });

    await tx.prove();
    await tx.sign([feePayerKey, zkappKey]).send();
  }
})();
