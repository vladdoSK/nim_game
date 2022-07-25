const block_matches = document.querySelector('.matches_block');
const block_score_player = document.querySelector('.score_player');
const block_score_computer = document.querySelector('.score_computer');
const modal = document.querySelector('.modal_window');
const modal_open = document.querySelector('.modal_open');
const warning = document.querySelector('.warning');
const left_move = document.querySelector('.left_move');

let score_player = 0,
    score_computer = 0;

let amount_player_step = 0;

function generate_matches_field() {
    for (let i = 0; i < 25; i++) {
        const new_match = document.createElement('div');
        new_match.setAttribute('class', 'block');
        new_match.innerHTML = `
                <div class="match" onclick="disappear(this)">
                    <div class="head_match"></div>
                    <div class="body_math"></div>
                </div>`;
        block_matches.append(new_match);
    }
}

generate_matches_field()

function isEndGame() {
    const match = document.getElementsByClassName('match');

    const winner = document.querySelector('.winner');

    if (match.length == 0) {
        if ((score_player % 2) == 0) {
            winner.innerHTML = `
                <img src="./image/power.png" class="power" alt="photo"/>
                <h1>Congratulations, you won!!!</h1>
                <img src="./image/power_rigth.png" class="power" alt="photo"/>
                `;
        }
        else {
            winner.innerHTML = `
                <img src="./image/lose.png" class="lose" alt="photo"/>
                <h1>Sorry, you lose</h1>
                <img src="./image/lose.png" class="lose" alt="photo"/>
                `;
        }
        modal.classList.add('active');
    }
}

function disappear(obj) {
    obj.classList.add('active');
    warning.classList.remove('active');
    score_player += 1;
    amount_player_step += 1;
    block_score_player.innerHTML = `Score: ${score_player}`;
    left_move.innerHTML = `Left move: ${3-amount_player_step}`;
    setTimeout(function () {
        obj.remove();

        isEndGame();

        if (amount_player_step == 3) {
            console.log(amount_player_step);
            console.log(amount_player_step);
            computer_step();
            amount_player_step = 0;
            left_move.innerHTML = `Left move: 3`;
        }

    }, 300);
}


function new_game() {
    amount_player_step = 0;
    left_move.innerHTML = `Left move: ${3-amount_player_step}`;
    modal_open.classList.add('active');
    const matches = document.querySelector('.matches_block');
    while (matches.firstChild) {
        matches.removeChild(matches.firstChild);
    }
    generate_matches_field();
    score_player = 0;
    score_computer = 0;
    block_score_player.innerHTML = `Score: ${score_player}`;
    block_score_computer.innerHTML = `Score: ${score_computer}`;

    modal.classList.remove('active');
}

function computer_first(){
    amount_player_step=1;
    computer_step();
}

function computer_step() {
    left_move.innerHTML = `Left move: 3`;
    modal_open.classList.add('active');

    if (amount_player_step == 0) {
        warning.classList.add('active');
    }
    else {
        amount_player_step = 0;
        const ai_step = document.querySelector('.computer_back');
        const p_step = document.querySelector('.player_back');

        p_step.classList.remove('active');
        ai_step.classList.add('active');

        setTimeout(function () {

            let amount_matches;
            const match = document.getElementsByClassName('match');
            let module = match.length % 4;
            if (match.length > 4) {
                if (module == 0) {
                    amount_matches = 3;
                }
                else if (module == 1) {
                    amount_matches = 1;
                }
                else if (module == 2) {
                    amount_matches = 1;
                }
                else if (module == 3) {
                    amount_matches = 3;
                }
            }
            else {
                if ((score_computer % 2) == 0) {
                    amount_matches = 2;
                }
                else if (match.length == 3) {
                    amount_matches = 3;
                }
                else {
                    amount_matches = 1;
                }
            }

            for (let i = 0; i < amount_matches; i++) {
                match[i].classList.add('active');
                score_computer += 1;
                block_score_computer.innerHTML = `Score: ${score_computer}`;
                slow_delete(match[i]);
            }

        }, 300);
        setTimeout(function () {
            ai_step.classList.remove('active');
            p_step.classList.add('active');
        }, 600);
    }
}

function slow_delete(match) {
    setTimeout(function () {
        match.remove();
        isEndGame();
    }, 300);
}