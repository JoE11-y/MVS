import {
  Field,
  SmartContract,
  State,
  state,
  DeployArgs,
  Permissions,
  method,
  MerkleWitness,
  CircuitString,
  PublicKey,
} from 'o1js';
import { Schema } from 'zkdb';

// Height of the Merkle Tree
const merkleHeight = 20;

// Extend Merkle witness at the same height as the Merkle Tree
export class MVSMerkleWitness extends MerkleWitness(merkleHeight) {}

export class UserSession extends Schema({
  name: CircuitString,
  email: CircuitString,
  image: CircuitString,
}) {
  static deserialize(data: Uint8Array): UserSession {
    return new UserSession(UserSession.decode(data));
  }
  json(): { name: string; email: string; image: string } {
    return {
      name: this.name.toString(),
      email: this.email.toString(),
      image: this.image.toString(),
    };
  }
}

export class UserData extends Schema({
  userAddress: PublicKey,
  session: UserSession,
}) {
  // Deserialize the document from a Uint8Array
  static deserialize(data: Uint8Array): UserData {
    return new UserData(UserData.decode(data));
  }
  // Index the document by user public key
  index(): { userAddress: string } {
    return {
      userAddress: this.userAddress.toBase58(),
    };
  }
  json(): {
    userAddress: string;
    session: object;
  } {
    return {
      userAddress: this.userAddress.toBase58(),
      session: this.session.json(),
    };
  }
}
let initialCommitment: Field;
export class MVSContract extends SmartContract {
  @state(Field) root = State<Field>();

  deploy(args: DeployArgs) {
    super.deploy(args);
    this.account.permissions.set({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
    });
  }

  @method init() {
    super.init();
    this.root.set(initialCommitment);
  }

  @method addNewUser(userData: Field, userWitness: MVSMerkleWitness) {
    // Get the on-chain merkle root commitment,
    // Make sure it matches the one we have locally
    let commitment = this.root.get();
    this.root.assertEquals(commitment);

    // ensure that witness path is empty
    const emptyroot = userWitness.calculateRoot(Field(0));
    commitment.assertEquals(emptyroot);

    // calculate root for new user.
    const newCommitment = userWitness.calculateRoot(userData);

    // update root
    this.root.set(newCommitment);
  }

  @method verifyUser(userData: Field, userWitness: MVSMerkleWitness) {
    // Get the on-chain merkle root commitment,
    // Make sure it matches the one we have locally
    let commitment = this.root.get();
    this.root.assertEquals(commitment);

    // check the user exists already within the committed Merkle tree
    const userCommitment = userWitness.calculateRoot(userData);

    commitment.assertEquals(userCommitment);
  }
}
