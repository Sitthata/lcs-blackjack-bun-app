// src/index.js

import inquirer from 'inquirer';
import { Game } from './src/game'

async function main() {
  console.clear();
  console.log('Welcome to Blackjack!\n');

  let playAgain = true;

  while (playAgain) {
    const game = new Game();
    await game.start();

    const { again } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'again',
        message: 'Do you want to play again?',
        default: false,
      },
    ]);

    playAgain = again;
  }

  console.log('\nThank you for playing Blackjack! Goodbye.');
}

main();
