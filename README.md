# Instagram Followers Higher or Lower Game

## Description
This dApp is a higher or lower game that allows users to guess whether the number of followers of two randomly chosen Instagram accounts is higher or lower. The game is built on the Algorand blockchain using PyTeal smart contracts.

## How to Play
1. Access the game website: [Instagram Followers Higher or Lower Game](https://algorand-hl-game.vercel.app/).
2. Connect your Algorand wallet to the game.
3. The game will randomly select two Instagram accounts.
4. Guess whether the number of followers of the first account is higher or lower than the second account.
5. Submit your guess.
6. Wait for the game result.
7. If your guess is correct, you will receive a reward.

## Game Logic
The game logic is implemented through smart contracts using PyTeal, the Algorand ecosystem's smart contract language. The smart contract ensures the fairness and transparency of the game by executing the following steps:

1. User Interaction:
   - The user interacts with the dApp frontend to submit their guess.
   - The user's guess is submitted to the smart contract.

2. Random Account Selection:
   - The smart contract randomly selects two Instagram accounts from a pool of available accounts.
   - The number of followers for each account is saved in a JSON file, with the predetermined information as of March 2023.

3. Validation:
   - The smart contract compares the number of followers between the two accounts.
   - If the user's guess matches the outcome (higher or lower), the user receives a point to their score.

## Technologies Used
The Instagram Followers Higher or Lower Game is built using the following technologies:

- Algorand Blockchain: The game leverages the Algorand blockchain to ensure security, transparency, and fast transaction processing.
- PyTeal: The game logic is implemented using PyTeal, a smart contract language for Algorand, to enforce the rules and verify the game outcome.
- Smart Contracts: The game utilizes smart contracts to handle user interactions, random account selection, and validation.
- Algorand Wallet Integration: Users can connect their Algorand wallets to the game to interact with the smart contracts and participate in the game.

## Demo
Here is the video demo of my dApp:

[![demo](/assets/demo.png 'wow')](https://youtu.be/ff2P4tAmQdc]


## Disclaimer
This dApp is built for informational and demonstration purposes only. The use of real Instagram accounts, follower numbers, or ALGO tokens in this game is simulated and does not involve actual financial transactions or interactions with the Instagram platform.

Please note that the information provided in this markdown is subject to change. For the latest updates and to access the game, please refer to the official website: [Instagram Followers Higher or Lower Game](https://algorand-hl-game.vercel.app/).
