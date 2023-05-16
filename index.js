window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    // const resetButton = document.getElementById('reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''] //tile history
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYER_X_WON = 'PLAYER_X_WON';
    const PLAYER_O_WON = 'PLAYER_O_WON';
    const TIE = 'TIE';




    // [0] [1] [2]
    // [3] [4] [5]
    // [6] [7] [8]





    // var a: -> declarate;
    // a = 10; -> allocate;

    //Hoisint is JS preallocate all memories space;






    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    const handleresultValidation = () => {
        let m_roundWon = false;


        for (let i = 0; i <= 7; i++) {
            const winningCondition = winningConditions[i]

            const a = board[winningCondition[0]];
            const b = board[winningCondition[1]];
            const c = board[winningCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a === b && b === c) {
                m_roundWon = true;
                break;
            }
        }

        if (m_roundWon) {
            announce(currentPlayer === 'X' ? PLAYER_X_WON : PLAYER_O_WON)
            isGameActive = false;

            return;
        }

        if (!board.includes('')) {
            announce(TIE);
        }
    }
    const announce = (type) => {
        switch (type) {
            case PLAYER_O_WON:
                // announcer.innerText = 'Player <span>O</span> is a WINNERRRR!!!';
                announcer.innerHTML = 'Player <span class="playerO">O</span> is a WINNERRRR!!!';
                break;
            case PLAYER_X_WON:
                // announcer.innerText = 'Player <span>X</span> is a WINNERRRR!!!';
                announcer.innerHTML = 'Player <span class="playerX">X</span> is a WINNERRRR!!!';
                break;
            case TIE:
                announcer.innerText = 'OMG it is TIEEEEEEE!!!!!!. PLay AGAIN!!!';
        }


        announcer.classList.remove('hide');
    };



    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }



    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }
        return true;
    };


    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleresultValidation();
            changePlayer();

        }
    }


    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add("hide");

        if (currentPlayer === 'O') {
            changePlayer();
        };

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove(`playerX`);
            tile.classList.remove(`playerO`);
        });
    };




    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index))
    })

    resetButton.addEventListener('click', resetBoard);




});

