const start_game = document.getElementById("start_game");
const game = document.getElementById("game");
const game_menu = document.getElementById("game_menu");
const game_board = document.getElementById('game_board');
const level_settings = {};
const settings = {
    "easy": {
        "card": 3,
        "line": 1
    },
    "middle": {
        "card": 6,
        "line": 2
    },
    "hard": {
        "card": 10,
        "line": 2
    }
};

function getSettingLevel() {
    return (
        settings[document.querySelector("input[name='level_group']:checked").value]
    );
}

function startGame() {
    const level_settings = getSettingLevel();

    spreadCards(level_settings.card, level_settings.line);
    game.classList.remove('hidden');
    game_menu.classList.add("hidden");
}

function RestartGame() {
    return function() {
        location.reload();
    };
}

function spreadCards(card, line) {
    let gameLine;
    let gameCard;
    let gameCardBack;
    let gameCardBackImg;
    let gameCardFront;
    let gameCardFrontImg;
    let cardBug = getRandomInt(0, card);
    let cardInLine = card / line

    gameLine = document.createElement('div');
    gameLine.classList.add('game__line');

    for (let c = 0; c <= card; c++) {
        gameCard = document.createElement('div');
        gameCard.classList.add('game__card');
        gameCard.classList.add('game__card_hov');
        gameCard.addEventListener("click", flipCard(gameCard), { once: true });

        /* Рубашка */
        gameCardBack = document.createElement('div');
        gameCardBack.classList.add('game__card_back');
        gameCardBackImg = document.createElement('img');
        gameCardBackImg.src = 'images/card_back_game.png';
        gameCardBackImg.alt = 'Рубашка';

        /* Лицо */
        gameCardFront = document.createElement('div');
        gameCardFront.classList.add('game__card_front');
        gameCardFrontImg = document.createElement('img');
        if (c === cardBug) {
            gameCardFrontImg.src = 'images/card_bug.png';
            gameCard.setAttribute('value', 1);
        } else {
            gameCardFrontImg.src = 'images/card_game_over.png';
        }
        gameCardFrontImg.alt = 'Лицо';

        // Собираем карту
        gameCardBack.appendChild(gameCardBackImg);
        gameCardFront.appendChild(gameCardFrontImg);
        gameCard.appendChild(gameCardBack);
        gameCard.appendChild(gameCardFront);

        if (c > 0 && c % cardInLine === 0) {
            game_board.appendChild(gameLine);
            gameLine = document.createElement('div');
            gameLine.classList.add('game__line');
        }

        gameLine.appendChild(gameCard);
    }
    console.log(game_board);
}

function flipCard(gameCard) {
    return function() {
        gameCard.classList.toggle("rotate");
        gameCard.classList.remove("game__card_hov");
        gameCard.addEventListener("click", RestartGame());
    };
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

start_game.addEventListener('click', () => startGame())