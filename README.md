# Alyra - Project #3

This repository contains a Voting Dapp, initialized with [React Truffle Box](https://trufflesuite.com/boxes/react/) and running with a `Voting.sol` Solidity smart contract.

Visit online Dapp : https://alyra-project-3-1921.vercel.app/

See video demo of the Voting Dapp : https://www.loom.com/share/374c0a1fa6c04004aef12028598d5525

## Table of Contents

- [Prerequis](#prerequis)
- [Installation](#installation)
- [Launch front-end Dapp](#launch-front-end-dapp)
- [Launch back-end app](#launch-back-end-app)
- [Running the tests](#running-the-tests)
- [License](#license)
- [Authors](#authors)

## Prerequis

Before using voting contract, you need to install the following dependencies:

- Node.js
- Truffle
- Ganache (or another local Ethereum client)

## Installation

Instructions on how to install the project and its dependencies.

1. Clone the repository to your local machine.

```sh
git clone git@github.com:giuliano2014/alyra-project-3.git
```

2. Navigate to truffle directory & install the required dependencies.

```sh
cd alyra-project-3/truffle && npm i
```

3. Navigate to client directory & install the required dependencies.

```sh
cd alyra-project-3/client && npm i
```

## Launch front-end Dapp

Instructions on how to launch your local front-end.

1. Start your local Dapp.

```sh
cd alyra-project-3/client && npm run start
```

2. Go to your local host : http://localhost:8080/

## Launch back-end app

Instructions on how to launch your local back-end.

1. Launch your local Ethereum blockchain

```sh
cd alyra-project-3/truffle && ganache
```

2. Open another terminal window & deploy your smart contract.

```sh
cd alyra-project-3/truffle && truffle migrate
```

## Running the tests

Tests are written using the Mocha framework and the OpenZeppelin Test Helpers tool.

Follow the steps below:

1. Launch local Ethereum client

```sh
ganache
```

2. Run the tests

```sh
truffle test
```

OR

```sh
npx hardhat test
```

3. Run test coverage

```sh
npx hardhat coverage
```

## License

This project is MIT licensed - See the [LICENSE](https://github.com/giuliano2014/alyra-project-2/blob/main/LICENSE) file for details.

## Authors

- [Giuliano Furgol](https://www.linkedin.com/in/giulianofurgol/) - Solidity Developer