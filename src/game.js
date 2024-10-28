// src/game.js

import { Deck } from './deck.js';
import { Player, Dealer } from './player.js';
import { calculateHandValue, displayHands } from './utils.js';
import inquirer from 'inquirer';

export class Game {
  constructor() {
    this.deck = new Deck();
    this.player = new Player('Player');
    this.dealer = new Dealer('Dealer');
  }

  async start() {
    this.deck.shuffle();
    this.player.resetHand();
    this.dealer.resetHand();

    // Initial deal: 2 cards each
    this.player.addCard(this.deck.dealCard());
    this.dealer.addCard(this.deck.dealCard());
    this.player.addCard(this.deck.dealCard());
    this.dealer.addCard(this.deck.dealCard());

    let playerTurn = true;

    while (playerTurn) {
      displayHands(this.player, this.dealer, false);

      const playerTotal = calculateHandValue(this.player.hand);
      if (playerTotal > 21) {
        console.log('\nYou busted! Dealer wins.');
        return;
      }

      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Choose an action:',
          choices: ['Hit', 'Stand'],
        },
      ]);

      if (action === 'Hit') {
        this.player.addCard(this.deck.dealCard());
      } else {
        playerTurn = false;
      }
    }

    // Dealer's turn
    displayHands(this.player, this.dealer, true);

    while (calculateHandValue(this.dealer.hand) < 17) {
      console.log('\nDealer hits.');
      this.dealer.addCard(this.deck.dealCard());
      displayHands(this.player, this.dealer, true);
    }

    const dealerTotal = calculateHandValue(this.dealer.hand);
    const playerTotalFinal = calculateHandValue(this.player.hand);

    if (dealerTotal > 21) {
      console.log('\nDealer busted! You win!');
      return;
    }

    // Determine winner
    console.log('');
    if (playerTotalFinal > dealerTotal) {
      console.log('You win!');
    } else if (playerTotalFinal < dealerTotal) {
      console.log('Dealer wins!');
    } else {
      console.log('It\'s a tie!');
    }
  }
}
