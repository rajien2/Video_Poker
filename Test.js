//CHECK FOR PAIR
function onePair() {
    if (valueCheck[0] == valueCheck[1] || valueCheck[1] == valueCheck[2] ||
        valueCheck[2] == valueCheck[3] || valueCheck[3] == valueCheck[4]);
    {
        isPair = true;
    }
}


//CHECK FOR TWO PAIR
function twoPair() {
    if (valueCheck[0] == valueCheck[1]  valueCheck[2] == valueCheck[3] ||
        valueCheck[0] == valueCheck[1]  valueCheck[3] == valueCheck[4] ||
            valueCheck[1] == valueCheck[2]  valueCheck[3] == valueCheck[4]);
    {
        isPair = false;
        isTwoPair = true;
    }
}

//CHECK FOR THREE OF A KIND
function threeOfaKind() {
    if (valueCheck[0] == valueCheck[1]  valueCheck[0] == valueCheck[2] ||
        valueCheck[1] == valueCheck[2]  valueCheck[1] == valueCheck[3] ||
            valueCheck[2] == valueCheck[3]  valueCheck[2] == valueCheck[4])
    {
        isPair = false;
        isThreeKind = true;
    }
}

//CHECK FOR STRAIGHT
function straight() {
    var cardOne = valueCheck[0];
    var cardTwo = valueCheck[1];
    var cardThree = valueCheck[2];
    var cardFour = valueCheck[3];
    var cardFive = valueCheck[4];

    if ((cardOne + 1) == cardTwo(cardTwo + 1) == cardThree
        (cardThree + 1) == cardFour(cardFour + 1) == cardFive) {
        isStraight = true;
    }
}

//CHECK FOR FLUSH
function flush() {
    if (suitCheck[0] == suitCheck[1]  suitCheck[0] == suitCheck[2]
    suitCheck[0] == suitCheck[3]  suitCheck[0] == suitCheck[4])
    {
        isFlush = true;
    }
}

//CHECK FOR FULL HOUSE
function fullHouse() {
    if (valueCheck[0] == valueCheck[1]  valueCheck[2] == valueCheck[3]  valueCheck[2] == valueCheck[4] ||
        valueCheck[0] == valueCheck[1]  valueCheck[0] == valueCheck[2]  valueCheck[3] == valueCheck[4])
    {
        isPair = false;
        isThreeKind = false;
        isFullHouse = true;
    }
}

//CHECK FOR FOUR OF A KIND
function fourOfaKind() {
    if (valueCheck[0] == valueCheck[1]  valueCheck[0] == valueCheck[2]  valueCheck[0] == valueCheck[3] ||
        valueCheck[1] == valueCheck[2]  valueCheck[1] == valueCheck[3]  valueCheck[1] == valueCheck[4])
    {
        isPair = false;
        isThreeKind = false;
        isFourKind = true;
    }
}
//CHECK FOR STRAIGHT FLUSH
function straightFlush() {
    if (isStraight  isFlush)
    {
        isStraight = false;
        isFlush = false;
        isStraightFlush = true;
    }
}

//CHECK FOR ROYAL FLUSH
function royalFlush() {
    if (isStraightFlush  valueCheck[4] == 14)
    {
        isStraight = false;
        isFlush = false;
        isStraightFlush = false;
        isRoyalFlush = true;
    }
}