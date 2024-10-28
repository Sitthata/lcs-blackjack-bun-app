// src/deck.js

export class Deck {
    constructor() {
      this.cards = [];
      this.initializeDeck();
    }
  
    initializeDeck() {
      const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
      const ranks = [
        '2', '3', '4', '5', '6', '7', '8', '9', '10',
        'J', 'Q', 'K', 'A',
      ];
  
      this.cards = [];
  
      for (const suit of suits) {
        for (const rank of ranks) {
          this.cards.push({ suit, rank });
        }
      }
    }
  
    shuffle() {
      const { cards } = this;
      let m = cards.length, i;
  
      while (m) {
        i = Math.floor(Math.random() * m--);
        [cards[m], cards[i]] = [cards[i], cards[m]];
      }
    }
  
    dealCard() {
      if (this.cards.length === 0) {
        throw new Error('No more cards in the deck.');
      }
      return this.cards.pop();
    }
  }
  