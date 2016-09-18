	function dealCards() {
		if (deal.classList.contains('disabled')) {
			return;
		}
		if (firstClick) {
			firstClick = false;
			updateBalance(-betAmount)

			deck = getDeck();
			hand = new PokerHand();

			for (var i = 0; i < 5; i++) {
				let card = deck.shift();
				dealCard(card, i)
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

			deal.classList.add('disabled')

			let handValue = hand.evaluate()

			if (handValue > -1) {
				showResults(hands[handValue])
			}
			//replay.classlist.remove('hidden')
		}
	}