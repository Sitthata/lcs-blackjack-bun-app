// src/player.js

export class Player {
    constructor(name) {
      this.name = name;
      this.hand = [];
    }
  
    resetHand() {
      this.hand = [];
    }
  
    addCard(card) {
      this.hand.push(card);
    }
  }
  
  export class Dealer extends Player {
    constructor(name) {
      super(name);
    }
  
    // Dealer's simple logic is handled in game.js
  }
  