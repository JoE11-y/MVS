import type { ParameterizedContext } from "koa";
import { MVSMerkleWitness, UserData, UserSession } from "contracts";
import { ZKDatabaseStorage } from "zkdb";
import {
  CircuitString,
  Encoding,
  PrivateKey,
  PublicKey,
  Signature,
} from "o1js";

async function startZkDB() {
  let merkleHeight = 20;
  const zkDB = await ZKDatabaseStorage.getInstance("MVSv1", {
    storageEngine: "local",
    merkleHeight,
    storageEngineCfg: {
      location: "./data",
    },
  });
  return zkDB;
}

async function findUser(userPubKey: string) {
  const zkDB = await startZkDB();
  const userRecord = zkDB.findOne("userAddress", userPubKey);
  if (userRecord.isEmpty()) {
    return null;
  }
  const userData = await userRecord.load(UserData);
  const userWitness = new MVSMerkleWitness(await userRecord.witness());
  console.log(userData.json());
  // const res = {
  //   userData,
  //   userWitness,
  // };
  // return res;
}

async function addUser(userPubKey: string, session: any) {
  const zkDB = await startZkDB();
  const userRecord = zkDB.findOne("userAddress", userPubKey);
  if (!userRecord.isEmpty()) {
    throw new Error("User already exists");
  }
  await zkDB.add(
    new UserData({
      userAddress: PublicKey.fromBase58(userPubKey),
      session: new UserSession({
        name: CircuitString.fromString(session.name),
        email: CircuitString.fromString(session.email),
        image: CircuitString.fromString(session.image),
      }),
    })
  );
  return true;
}

export async function getHandler(ctx: ParameterizedContext) {
  try {
    let { userPubKey } = ctx.params;
    let res = await findUser(userPubKey);
    if (!res) {
      ctx.throw(404, "User does not exist");
    }
    ctx.body = res;
  } catch (e) {
    ctx.throw(e as Error);
  }
}

export async function postHandler(ctx: ParameterizedContext) {
  try {
    let { userPubKey } = ctx.params;
    let session = ctx.request.body;
    let res = await addUser(userPubKey, session);
    if (!res) {
      ctx.throw(400, "Could not create User");
    }
    ctx.status = 200;
    ctx.body = "User Created Successfully";
  } catch (e) {
    ctx.throw(e as Error);
  }
}
