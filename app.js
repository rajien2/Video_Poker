(function () {

	let betAmount = 0
	let account = new Account();
	let firstClick = true
	let deck = []
	let hand = null
	let hands = [
		'Jacks or Better',
		'Two Pair',
		'Three of a kind',
		'Straight',
		'Flush',
		'Full House',
		'Four of a Kind',
		'Straight Flush',
		'Royal Flush'
	]

	let multiplier = [
		[1, 2, 3, 5, 7, 10, 40, 50, 100],
		[2, 4, 6, 10, 14, 20, 80, 100, 200],
		[5, 10, 15, 25, 35, 50, 200, 250, 500]
	]

	let balance = document.getElementById('balance')
	let bet = document.getElementById('bet')
	let deal = document.getElementById('deal')

	let cardImages = [];
	cardImages[0] = document.getElementById('card0')
	cardImages[1] = document.getElementById('card1')
	cardImages[2] = document.getElementById('card2')
	cardImages[3] = document.getElementById('card3')
	cardImages[4] = document.getElementById('card4')

	let saveLinks = []
	saveLinks[0] = document.getElementById('saveCard0')
	saveLinks[1] = document.getElementById('saveCard1')
	saveLinks[2] = document.getElementById('saveCard2')
	saveLinks[3] = document.getElementById('saveCard3')
	saveLinks[4] = document.getElementById('saveCard4')

	deal.classList.add('disabled')
	deal.addEventListener('click', dealCards);
	bet.addEventListener('change', handleBetChange)
	replay.addEventListener('click', playAgain)
	saveLinks.forEach(function (link) {
		link.addEventListener('click', keepCard)
	});

	if (account.balance < 1) {
		account.load(1000);
	}

	updateBalance(0);

	function showResult(message) {
		handResult.innerHTML = message;
	}


	function keepCard(event) {
		let image = event.target;
		if (image.classList.contains('hold')) {
			image.classList.remove('hold')
		}
		else {
			image.classList.add('hold')
		}

	}


	function updateBalance(amount) {
		account.update(amount)
		balance.innerHTML = account.balance
	}

	function handleBetChange() {
		betAmount = event.target.valueAsNumber;

		if (betAmount > 0 && betAmount <= account.balance) {
			deal.classList.remove('disabled')
		}
		else {
			deal.classList.add('disabled')
		}
	}
	function playAgain() {

		if (bet.value > account.balance) {
			bet.value = account.balance
		}
		//get rid of win/lose banner text
		showResult('');

		//hids deal again button
		replay.classList.add('hidden');

		//resets player's hand shows back of cards'
		cardImages.forEach(function (img) {
			img.src = 'img/back.png';
		});

		bet.value = 0;
		firstClick = true;

		console.log(hand);

	}

	function dealCard(card, position) {
		hand.deal(card, position);
		cardImages[position].src = 'img/' + card + '.png'
	}


	function dealCards() {
    if (deal.classList.contains('disabled')) {
			return;
    }
    if (firstClick) {
			firstClick = false;
			updateBalance(-betAmount);

			deck = getDeck();
			hand = new PokerHand();

			for (var i = 0; i < 5; i++) {
				let card = deck.shift();
				dealCard(card, i);
			}
			console.log(hand);
    }
    else {
			for (var i = 0; i < 5; i++) {
				if (!cardImages[i].classList.contains('hold')) {
					let card = deck.shift();
					dealCard(card, i);
				}
				else {
					cardImages[i].classList.remove('hold');

				}
			}
			deal.classList.add('disabled');

			let handValue = hand.evaluate();

			if (handValue > -1) {
				let tier = 0;


				if (betAmount >= 500) {
					tier = 2;
				}
				else if (betAmount >= 250) {
					tier = 1;
				}
				let winnings = multiplier[tier][handValue] * betAmount;

				showResult(hands[handValue] + '<br> you have won' + winnings + 'dollars')
				updateBalance(winnings)
			}
			else {
				showResult('Try Again')
			}
		}


		replay.classList.remove('hidden');


	}



	function getCardValue(card) {

		card = card.replace(/H|C|D|S/, '');

		switch (card) {
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			case '10':
				return parseInt(card);

			case 'J':
				return 11;

			case 'Q':
				return 12;

			case 'K':
				return 13;

			case 'A':
				return 14;
		}
	}

	function getDeck() {

		let deck = [
			'2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
			'2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
			'2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
			'2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
		];

		return shuffle(deck);
	}

	function shuffle(array) {

		// Fisher–Yates Shuffle		
		// Source: https://bost.ocks.org/mike/shuffle/

		let m = array.length, t, i;

		// While there remain elements to shuffle…
		while (m) {

			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}

})();