var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*****************************************************************************************************************/
/* HELPER CLASSES */
/*****************************************************************************************************************/
var CardCollection = (function () {
    function CardCollection() {
        this.cards = new Array();
    }
    CardCollection.prototype.shuffle = function (o) {
        if (o === void 0) { o = this.cards; }
        // Algorithm taken from http://stackoverflow.com/a/6274381/4610562
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
            ;
        return o;
    };
    CardCollection.prototype.getNextCard = function () {
        return this.cards.pop();
    };
    CardCollection.prototype.hasCards = function () {
        if (this.cards) {
            if (this.cards.length != 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    return CardCollection;
}());
var Suit;
(function (Suit) {
    Suit[Suit["Clubs"] = 0] = "Clubs";
    Suit[Suit["Diamonds"] = 1] = "Diamonds";
    Suit[Suit["Hearts"] = 2] = "Hearts";
    Suit[Suit["Spades"] = 3] = "Spades";
    Suit[Suit["None"] = 4] = "None";
})(Suit || (Suit = {}));
var Face;
(function (Face) {
    Face[Face["Two"] = 0] = "Two";
    Face[Face["Three"] = 1] = "Three";
    Face[Face["Four"] = 2] = "Four";
    Face[Face["Five"] = 3] = "Five";
    Face[Face["Six"] = 4] = "Six";
    Face[Face["Seven"] = 5] = "Seven";
    Face[Face["Eight"] = 6] = "Eight";
    Face[Face["Nine"] = 7] = "Nine";
    Face[Face["Ten"] = 8] = "Ten";
    Face[Face["Jack"] = 9] = "Jack";
    Face[Face["Queen"] = 10] = "Queen";
    Face[Face["King"] = 11] = "King";
    Face[Face["Ace"] = 12] = "Ace";
    Face[Face["Joker"] = 13] = "Joker";
})(Face || (Face = {}));
/*****************************************************************************************************************/
/* MAIN CLASSES */
/*****************************************************************************************************************/
var Card = (function () {
    function Card(face, suit) {
        this.face = face;
        this.suit = suit;
    }
    return Card;
}());
var CardPile = (function (_super) {
    __extends(CardPile, _super);
    function CardPile() {
        _super.apply(this, arguments);
    }
    CardPile.prototype.addCard = function (card) {
        this.cards.push(card);
    };
    return CardPile;
}(CardCollection));
var Player = (function () {
    function Player(name) {
        this.warPile = new CardPile();
        this.personalDeck = new CardPile();
        this.name = name;
    }
    return Player;
}());
var Deck = (function (_super) {
    __extends(Deck, _super);
    function Deck() {
        _super.apply(this, arguments);
    }
    Deck.prototype.generate = function () {
        for (var i = 0; i < 13; i++) {
            for (var j = 0; j < 4; j++) {
                this.cards.push(new Card(i, j));
            }
        }
        // Adding two jokers
        this.cards.push(new Card(14, 4));
        this.cards.push(new Card(14, 4));
    };
    return Deck;
}(CardCollection));
var Game = (function () {
    function Game() {
        this.deck = new Deck();
        this.player1 = new Player("player 1");
        this.player2 = new Player("player 2");
    }
    Game.prototype.startGame = function () {
        this.generateDeck();
        this.deck.shuffle();
        this.dealCardsFromDeck();
        var winner = this.war();
        console.log("The winner is: " + winner.name + "!");
    };
    Game.prototype.war = function () {
        while (this.player1.personalDeck.hasCards() === true && this.player2.personalDeck.hasCards() === true) {
            var p1Card = this.player1.personalDeck.getNextCard();
            var p2Card = this.player2.personalDeck.getNextCard();
            // TODO: Implement tie functionality
            if (p1Card.face >= p2Card.face) {
                this.player1.personalDeck.addCard(p2Card);
            }
            else {
                this.player2.personalDeck.addCard(p1Card);
            }
        }
        if (this.player1.personalDeck.hasCards() === true && this.player2.personalDeck.hasCards() === false) {
            return this.player1;
        }
        else {
            return this.player2;
        }
    };
    Game.prototype.dealCardsFromDeck = function () {
        if (this.deck.hasCards() === true) {
            var playerSwap = 1;
            while (this.deck.hasCards() === true) {
                if (playerSwap === 1) {
                    this.player1.personalDeck.addCard(this.deck.cards.pop());
                    playerSwap = 2;
                }
                else {
                    this.player2.personalDeck.addCard(this.deck.cards.pop());
                    playerSwap = 1;
                }
            }
        }
        else {
            console.warn("No cards in Deck. Cannot deal cards.");
        }
    };
    Game.prototype.generateDeck = function () {
        this.deck.generate();
    };
    return Game;
}());
/*****************************************************************************************************************/
/* TESTING IMPLEMENTATION */
/*****************************************************************************************************************/
var game = new Game();
game.startGame();
