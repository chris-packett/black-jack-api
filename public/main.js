let deck_identifier
let cards
let imagesOfAllCards = ``

const main = () => {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then((res) => res.json())
  .then((data) => {
    deck_identifier = data.deck_id
  })
}

const drawCards = (id, numOfCards) => {
  fetch('https://deckofcardsapi.com/api/deck/' + id + '/draw/?count=' + numOfCards)
  .then((res) => res.json())
  .then((data) => {
    cards = data.cards
    for (let i = 0; i < numOfCards; i++) {
      imagesOfAllCards += `<img src="` + cards[i].image + `">`
    }   
    document.querySelector('.output').innerHTML = imagesOfAllCards
  })
}

const makePlayerOnePile = (id) => {
  fetch('https://deckofcardsapi.com/api/deck/' + id + '/pile/player_one_hand/add/?cards=' + cards[0] + ',' + cards[1])
  .then((res) => res.json())
  .then((data) => {
    data.piles.player_one_hand = cards
    console.log(data.piles)
  })
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.draw-card-button').addEventListener('click', () => drawCards(deck_identifier, 20))
document.querySelector('.deal-card-button').addEventListener('click', () => makePlayerOnePile(deck_identifier))

