// src/utils.js

export function calculateHandValue(hand) {
  let total = 0;
  let aces = 0;

  for (const card of hand) {
    if (["J", "Q", "K"].includes(card.rank)) {
      total += 10;
    } else if (card.rank === "A") {
      aces += 1;
      total += 11;
    } else {
      total += parseInt(card.rank, 10);
    }
  }

  // Adjust for aces
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }

  return total;
}

export function displayHands(player, dealer, revealDealer = false) {
  console.log("-------------------------");
  console.log(`${player.name}'s Hand:`);
  player.hand.forEach((card) => {
    console.log(`  ${card.rank} of ${card.suit}`);
  });
  console.log(`Total: ${calculateHandValue(player.hand)}`);

  console.log("\nDealer's Hand:");
  if (revealDealer) {
    dealer.hand.forEach((card) => {
      console.log(`  ${card.rank} of ${card.suit}`);
    });
    console.log(`Total: ${calculateHandValue(dealer.hand)}`);
  } else {
    console.log(`  ${dealer.hand[0].rank} of ${dealer.hand[0].suit}`);
    console.log("  [Hidden Card]");
  }
  console.log("-------------------------\n");
}
