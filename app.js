(function () {

	let betAmount = 0
	let accountBalance = 0
	let firstClick = true
	let deck = []
	let hand = []

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
	saveLinks.forEach(function (link) {
		link.addEventListener('click', keepCard)
	});
	updateBalance(1000)




	function hasFourOfAKind(groups) {
		return groups.some(function (group) {
			return group.length === 4;
		});
	}

	function isFullHouse(groups) {
		return hasThreeOfAKind(groups) && hasPair(groups);
	}

	function isFlush(hand) {
		return isSingleSuite(hand, 'H') ||
			isSingleSuite(hand, 'D') ||
			isSingleSuite(hand, 'C') ||
			isSingleSuite(hand, 'S');
	}

	function isStraight(values) {

		var uniqueVals = uniqueValues(values);

		if (uniqueVals.length < 5) {
			return false;
		}

		if (values[4] - values[0] === 4) {
			return true;
		}

		if (values.join(',') === '2,3,4,5,14') {
			return true;
		}

		return false;
	}

	function hasThreeOfAKind(groups) {
		return groups.some(function (group) {
			return group.length === 3;
		});
	}

	function hasTwoPairs(groups) {
		var pairs = 0;

		groups.forEach(function (group) {
			pairs += group.length === 2 ? 1 : 0;
		});

		return pairs > 1;
	}

	function isJacksOrBetter(groups) {

		var isTrue = false;

		groups.forEach(function (group) {
			if (group[1] >= 11) isTrue = true;
		});

		return isTrue;
	}

	function hasPair(groups) {
		return groups.some(function (group) {
			return group.length === 2;
		});
	}

	function groupValues(values) {

		var groups = [];
		var uniqueVals = uniqueValues(values);

		uniqueVals.forEach(function (uniqueValue) {
			var group = values.filter(function (value) {
				return value === uniqueValue;
			});

			groups.push(group);
		});

		return groups;
	}

	function uniqueValues(values) {
		var unique = [];
		var last = 0;

		values.forEach(function (value) {
			if (value !== last) {
				unique.push(value);
				last = value;
			}
		});

		return unique;
	}

	function getValues(hand) {
		return hand.map(getCardValue).sort(function (a, b) {
			return parseInt(a) - parseInt(b);
		});
	}

	function isSingleSuite(hand, suit) {
		return hand.every(function (card) {
			return card.endsWith(suit);
		});
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
		accountBalance += amount
		balance.innerHTML = accountBalance
	}

	function handleBetChange() {
		betAmount = event.target.valueAsNumber;

		if (betAmount > 0) {
			deal.classList.remove('disabled')
		}
		else {
			deal.classList.add('disabled')
		}
	}

	function dealCard(card, position) {
		hand[position] = card;
		cardImages[position].src = 'img/' + card + '.png'
	}

	function dealCards() {
		if (deal.classList.contains('disabled')) {
			return;
		}
		if (firstClick) {
			firstClick = false;
			updateBalance(-betAmount)

			deck = getDeck();
			hand = []

			for (var i = 0; i < 5; i++) {
				let card = deck.shift();
				dealCard(card, i)
				debugger
			}
		}
		else {
			for (var i = 0; i < 5; i++) {
				if (!cardImages[i].classList.contains('hold')) {
					let card = deck.shift();
					dealCard(card, i);
				}
				else {
					cardImages[i].classList.remove('hold')

				}
			}
		}
	}





	function evaluateHand(hand) {
		let values = getValues(hand)
		let groups = groupValues(values);

		if (isRoyalFluch(hand, values)) {
			showResults('royal Flush');
			updateBalance(betAmmount * 800);
		}
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