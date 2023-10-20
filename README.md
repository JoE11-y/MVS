# MVS - Mina Verification Service

## Problem Statement

The emergence of web3 has brought numerous benefits to the digital world, but it has also created new challenges in user verification. In the web3 space, identifying and verifying legitimate users is becoming increasingly difficult due to the anonymous nature of blockchain transactions. Moreover, the rise of Sybil attacks, where a single user creates multiple fake identities to gain control over a network or system, poses a significant threat to the integrity and trust of web3 platforms. As a result, there is a pressing need for advanced identity verification and authentication measures to safeguard the security of web3 platforms and ensure that only legitimate users have access.

## Existing Solutions

Sybil prevention credentials are being implemented in several types, including:

1. On-chain Credentials: These credentials require users to perform certain tasks or actions on specific blockchain platforms. For example, users may need to complete transactions, make swaps, or participate in token transfers. On-chain credentials use the transparency and immutability of blockchain transactions to verify user activity and engagement.

2. Binance Account Bound SBT (Soulbound Token): BAB SBT is a unique sybil prevention credential introduced by Binance. It is the first-ever soulbound token on the Binance Smart Chain (BSC). BAB SBT is securely bound to a Binance account, which helps verify the authenticity of participants and prevents the use of multiple accounts.

3. Web3 Domain Holders (powered by SPACE ID Web3 Name SDK): These users own at least one of the domain extensions .eth, .bnb, and .arb, designed for the decentralized web. These domains allow users to establish their online identity, participate in decentralized activities, and shape the future of the decentralized internet. Like Binance Account Bound SBT, Web3 Domain Holders' ownership of these domains validates their authenticity and prevents the use of multiple accounts in the decentralized ecosystem.

4. Gitcoin Passport Score: This system validates a user's identity and online reputation in the Web3 space. By collecting verification stamps, users can gain access to trustworthy Web3 experiences and increase their opportunities to participate and vote on platforms like Gitcoin Grants. The more score a user has, the more opportunities they will have to vote and participate across the Web3.

5. Chain Transactors: This Sybil prevention credential considers the number of transactions a user has performed on a specific blockchain, such as Ethereum or Binance Smart Chain. Users with more legitimate transactions are deemed more trustworthy and are granted access to participate in campaigns and earn rewards. This credential leverages the transparency and immutability of blockchain transactions to verify user authenticity.

    Available Credentials:

        Arbitrum Transactor_10 transactions

        Avalanche Transactor_10 transactions

        BNB Chain Transactors_5 transactions

        Ethereum Transactors_10 transactions

6. Uniswap Social Verification (Sybil List): This tool connects wallet addresses to digital identities. Users sign messages with Ethereum keys and post signatures on their social profiles. Verifiers can then check these signatures and verify truthful address -> profile mappings. This interface supports social verification through Twitter only. However, more platforms can be added (Github, etc).

### Special Mentions

1. zkHumans: A protocol and platform for Zero-Knowledge Self-Sovereign Crypto-Biometric Decentralized Identity, Collective Association, and Access Control. This identity consists of one or more Authentication Factors stored in a Merkle Map, with a unique identifier (UUID) and a Merkle Map commitment. A SmartContract manages state transformations of the Manager Merkle Tree, storing each identity's identifier: commitment in an Identity Manager's MerkleMap. Off-chain Merkle data is stored in a zkHumans purpose-built ZK: KV database, facilitating many nodes to verify and distribute storage data with high availability independently. The MerkleMap identifier: commitment pattern within another MerkleMap is recursive, enabling vast amounts of verified storage with minimal state information.

2. SocialCap: A community-based credentials protocol and zkApp on MINA focused on solving the challenge of verifying the authenticity of credentials in the digital world.

## How does MINA Fit into all this?

Mina is a layer-1 blockchain with a 22KB blockchain. The world's lightest blockchain; therefore, storing data is not one of its main priorities.

Here's what MINA is all about:

![min](assets/images/mina.jpeg)