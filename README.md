
Multipurpose Distributed Fund Management App
================================

Have you ever tried to raise an office fund to go to the beach and found it hard to keep track of who has paid or not? Are you a creator who wants to set donation goals to produce new forms of content? We have a solution for you.

The Multipurpose Distributed Fund Management App uses state of the art blockchain technology to provide a secure and reliable way to transfer tokens between users and to funds. All transactions are logged in the blockchain, eliminating all forms of confusion. A robust suite of features allows fund managers to micromanage their funds for all sorts of different purposes. Try the Multipurpose Distributed Fund Management App today!


Video Demonstration: https://youtu.be/QE7M6fD8OUs

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/e8128/hacktherainbow)

Getting started
===============

There's a button at the top of this file that says "Open in Gitpod." If you want to try out this project as fast as possible, that's what you want. It will open the project in your browser with a complete integrated development environment configured for you. If you want to run the project yourself locally, read on.

There are two ways to run this project locally. The first is quick, and a good way to instantly become familiar with this example. Once familiar, the next step is to create your own NEAR account and deploy the contract to testnet.


Quick option
---------------

1. Install dependencies:

    yarn

2. Build and deploy this smart contract to a development account. This development account will be created automatically and is not intended for reuse:

    yarn dev


Standard deploy option
----------------------

In this second option, the smart contract will get deployed to a specific account created with the NEAR Wallet.

1. Ensure `near-cli` is installed by running:

       near --version

   If needed, install `near-cli`:

       npm install near-cli -g

2. If you do not have a NEAR account, please create one with [NEAR Wallet](https://wallet.nearprotocol.com). Then, in the project root, login with `near-cli` by following the instructions after this command:

       near login

3. Modify the top of `src/config.js`, changing the `CONTRACT_NAME` to be the NEAR account that you just used to log in.

       const CONTRACT_NAME = process.env.CONTRACT_NAME || 'YOUR_ACCOUNT_NAME_HERE'; /* TODO: fill this in! */

4. Start the example!

       yarn start


Exploring The Code
==================

1. The backend code lives in the `/assembly` folder. This code gets deployed to
   the NEAR blockchain when you run `yarn deploy:contract`. This sort of
   code-that-runs-on-a-blockchain is called a "smart contract" – [learn more
   about NEAR smart contracts][smart contract docs].
2. The frontend code lives in the `/src` folder.
   [/src/index.html](/src/index.html) is a great place to start exploring. Note
   that it loads in `/src/main.js`, where you can learn how the frontend
   connects to the NEAR blockchain.

Deployment Instructions from https://github.com/near-examples/token-contract-as

