/*****************************************************************************************************************/
/* HELPER CLASSES */
/*****************************************************************************************************************/
class CardCollection {
	cards:Card[] = new Array();
	shuffle(o: Card[] = this.cards): Card[] {
		// Algorithm taken from http://stackoverflow.com/a/6274381/4610562
		for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
	getNextCard(): Card {
		return this.cards.pop();
	}
	hasCards(): boolean {
		if (this.cards){
			if (this.cards.length != 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}

enum Suit { Clubs, Diamonds, Hearts, Spades, None }
enum Face { Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King, Ace, Joker }

/*****************************************************************************************************************/
/* MAIN CLASSES */
/*****************************************************************************************************************/
class Card {
	face: Face;
	suit: Suit;

	constructor(face: Face, suit: Suit) {
		this.face = face;
		this.suit = suit;
	}
}

class CardPile extends CardCollection {
	addCard(card: Card): void {
		this.cards.push(card);
	}
}

class Player {
	warPile: CardPile = new CardPile();
	personalDeck: CardPile = new CardPile();
	name: string;

	constructor(name:string) {
		this.name = name;
	}
}

class Deck extends CardCollection {
	generate(): void {
		for (var i = 0; i < 13; i++) {
			for (var j = 0; j < 4; j++) {
				this.cards.push(new Card(i, j));
			}
		}

		// Adding two jokers
		this.cards.push(new Card(14, 4));
		this.cards.push(new Card(14, 4));
	}
}

class Game {
	deck: Deck = new Deck();
	player1: Player = new Player("player 1");
	player2: Player = new Player("player 2");

	startGame(): void {
		this.generateDeck();
		this.deck.shuffle();
		this.dealCardsFromDeck();
		var winner:Player = this.war();
		console.log("The winner is: " + winner.name + "!");
	}

	war():Player {
		while (this.player1.personalDeck.hasCards() === true && this.player2.personalDeck.hasCards() === true) {
			var p1Card = this.player1.personalDeck.getNextCard();
			var p2Card = this.player2.personalDeck.getNextCard();
			// TODO: Implement tie functionality
			if (p1Card.face >= p2Card.face) {
				this.player1.personalDeck.addCard(p2Card);
			} else {
				this.player2.personalDeck.addCard(p1Card);
			}
		}
		if (this.player1.personalDeck.hasCards() === true && this.player2.personalDeck.hasCards() === false) {
			return this.player1;
		} else {
			return this.player2;
		}
	}

	dealCardsFromDeck():void {
		if (this.deck.hasCards() === true) {
			var playerSwap:number = 1;
			while (this.deck.hasCards() === true) {
				if (playerSwap === 1) { //Give card to player 1
					this.player1.personalDeck.addCard(this.deck.cards.pop());
					playerSwap = 2;
				} else { //Give card to player 2
					this.player2.personalDeck.addCard(this.deck.cards.pop());
					playerSwap = 1;
				}
			}
		} else {
			console.warn("No cards in Deck. Cannot deal cards.");
		}
	}

	generateDeck():void {
		this.deck.generate();
	}
}

/*****************************************************************************************************************/
/* TESTING IMPLEMENTATION */
/*****************************************************************************************************************/
var game = new Game();
game.startGame();