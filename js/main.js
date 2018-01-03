import Viewport from './modules/viewport';
import Reel from './modules/reel';
import Reels from './modules/reels';
import NudgeButtons from './modules/nudgeButtons';
import HoldButtons from './modules/holdButtons';
import Credits from './modules/credits';
import Win from './modules/win';
import Nudges from './modules/nudges';
// Sass
import '../scss/app.scss';

// const viewportContainer = document.getElementById('viewportContainer');
const viewport = Viewport();
// const spinButton = document.getElementById('spinButton');
const winContainer = document.getElementById('win');
const nudgesContainer = document.getElementById('nudges');
let playSection = document.getElementById('playSection');

let viewportContainer;
let nudgeButtonContainer;
let holdButtonContainer;
let winIndicatorLeft;
let winIndicatorRight;
let winIndicatorCentreLine;
let spinButton;
let reels;
let nudges;
let nudgeButtons;
let holdButtons;
let nudgeButtonList;
let holdButtonList;
let credits;
let win;
let gameLoop;
let nudgeChance = 2; // Chance of getting nudges after spin (1 in nudgeChance)
let holdChance = 2; // Chance of getting holds after spin (1 in holdChance)
let canSpin;
let canNudge;
let canHold;
let now; // Current time to compare against
let reelsRunning = []; // Keeps track of any reels with runtime left on them to estblish whether to reset/stop spin etc.
let spinType = 'spin'; // Keeps track of whether last spin was regular spin or nudge

const init = () => {

    renderViewportContainer();

    // Render viewport
    viewport.render();

    // Set up reels
    reels = Reels();
    reels.build();
    reels.render();

    let reelContainer;
    let reelContainerX;
    let reelContainerY;
    let reelContainerW;
    let reelContainerH;

    reels.reelList.forEach((reel) => {
        // Render outer container for each reel in the viewport container
        reelContainer = document.createElement('div');

        reelContainerX = reel.reelItems[0].x + VIEWPORT_CONTAINER_PADDING_X - REEL_CONTAINER_PADDING;

        reelContainerY = reel.reelItems[2].y + VIEWPORT_CONTAINER_PADDING_Y - REEL_CONTAINER_PADDING;

        reelContainerW = REEL_WIDTH + (REEL_CONTAINER_PADDING * 2);

        reelContainerH = VIEWPORT_HEIGHT + (REEL_CONTAINER_PADDING * 2);

        reelContainer.style.position = 'absolute';
        reelContainer.style.top = reelContainerY + 'px';
        reelContainer.style.left = reelContainerX + 'px';
        reelContainer.style.width = reelContainerW + 'px';
        reelContainer.style.height = reelContainerH + 'px';
        reelContainer.classList.add('reel-container');
        viewportContainer.appendChild(reelContainer);
    });

    renderWinIndicators();

    renderNudgeButtonContainer();

    // Set up nudge buttons
    nudgeButtons = NudgeButtons();
    nudgeButtons.build();
    nudgeButtons.render();

    nudgeButtonList = document.getElementsByClassName('nudge-button');

    for (let i = 0; i < nudgeButtonList.length; i++) {
        nudgeButtonList[i].addEventListener('click', () => {
            if (canSpin && canNudge && reels.reelList[i].canNudge === true && nudges.nudgesRemaining > 0) {
                spinType = 'nudge';
                nudges.nudgesRemaining -= 1;
                reels.reelList[i].isNudging = true;
                gameLoop = requestAnimationFrame(loop);
                gameStates.currentState = gameStates.nudge;
            }
        });
    }

    // Set up nudges
    nudges = Nudges();
    nudges.render();

    renderHoldButtonContainer();

    // Set up hold buttons
    holdButtons = HoldButtons();
    holdButtons.build();
    holdButtons.render();

    holdButtonList = document.getElementsByClassName('hold-button');

    for (let i = 0; i < holdButtonList.length; i++) {

        holdButtonList[i].addEventListener('click', (event) => {
            if (canSpin && canHold) {
                // Toggle
                if (reels.reelList[i].isHeld) {
                    // Take hold off
                    reels.reelList[i].isHeld = false;
                    reels.reelList[i].resetRuntime();
                    event.target.classList.add('active');
                    event.target.classList.remove('held');
                } else {
                    // Put hold on
                    reels.reelList[i].isHeld = true;
                    reels.reelList[i].runTime = 0;
                    event.target.classList.remove('active');
                    event.target.classList.add('held');
                }

            }
        });
    }

    // Set up credits
    credits = Credits();
    credits.reset();
    credits.render();

    // Set up win 
    win = Win();
    win.reset();
    win.render();

    renderSpinButton();

    canSpin = true;
    canNudge = false;
    canHold = false;

    enableSpin();

    spinButton.addEventListener('click', () => {
        if (canSpin) {
            credits.useCredit();
            credits.render();

            disableNudges();
            disableSpin();

            // Disable hold buttons that aren't held
            for (let i = 0; i < reels.reelList.length; i++) {
                if (!reels.reelList[i].isHeld) {
                    reels.reelList[i].canHold = false;
                    holdButtonList[i].classList.remove('active');
                }
            }

            spinType = 'spin';
            gameStates.currentState = gameStates.spin;
            gameLoop = requestAnimationFrame(loop);
            gameStates.currentState();
        }
    });
}

const renderNudgeButtonContainer = () => {
    nudgeButtonContainer = document.createElement('div');
    nudgeButtonContainer.id = 'nudgeButtons';
    playSection.appendChild(nudgeButtonContainer);
}

const renderHoldButtonContainer = () => {
    holdButtonContainer = document.createElement('div');
    holdButtonContainer.id = 'holdButtons';
    playSection.appendChild(holdButtonContainer);
}

const renderSpinButton = () => {
    spinButton = document.createElement('button');
    spinButton.id = 'spinButton';
    spinButton.classList.add('button');
    spinButton.innerHTML = 'SPIN';
    playSection.appendChild(spinButton);
}

const renderViewportContainer = () => {
    // Render viewport container
    viewportContainer = document.createElement('div');
    viewportContainer.id = 'viewportContainer';
    viewportContainer.style.paddingLeft = VIEWPORT_CONTAINER_PADDING_X + 'px';
    viewportContainer.style.paddingRight = VIEWPORT_CONTAINER_PADDING_X + 'px';
    viewportContainer.style.paddingTop = VIEWPORT_CONTAINER_PADDING_Y + 'px';
    viewportContainer.style.paddingBottom = VIEWPORT_CONTAINER_PADDING_Y + 'px';
    playSection.appendChild(viewportContainer);
}

const renderWinIndicators = () => {
    // Left indicator
    winIndicatorLeft = document.createElement('span');
    winIndicatorLeft.classList.add('win-indicator', 'left');
    viewportContainer.appendChild(winIndicatorLeft);
    // Right indicator
    winIndicatorRight = document.createElement('span');
    winIndicatorRight.classList.add('win-indicator', 'right');
    viewportContainer.appendChild(winIndicatorRight);
    // Centre line
    winIndicatorCentreLine = document.createElement('div');
    winIndicatorCentreLine.classList.add('win-indicator-centre-line');

    winIndicatorCentreLine.style.left = winIndicatorLeft.offsetWidth + 'px';

    winIndicatorCentreLine.style.width = viewportContainer.offsetWidth - winIndicatorLeft.offsetWidth - winIndicatorRight.offsetWidth + 'px';

    viewportContainer.appendChild(winIndicatorCentreLine);
}

const loop = (currentTime) => {
    gameLoop = requestAnimationFrame(loop); // Needs to go before line below to keep animationframeid up to date
    gameStates.currentState(currentTime);
};

const moveReels = () => {
    reels.move();
};

const render = () => {
    viewport.clear();
    reels.render();

    // Digits
    nudges.render();
    credits.render();
    win.render();
};

// Calculates win amount, if winning line
const checkWin = () => {
    let spinResult = []; // Array of reel results after spin (all three visible objects of each reel)
    let spinResultFiltered = []; // Array of results that don't match first reel
    let reelResult; // Individual reel result, made of three objects (visible)
    let compareItem; // Middle item on reel one to compare

    // Check for win
    reels.reelList.forEach((reel, index) => {
        reelResult = []; // Result of individual reel

        reelResult.push(reels.reelList[index].reelItems[0]);
        reelResult.push(reels.reelList[index].reelItems[1]);
        reelResult.push(reels.reelList[index].reelItems[2]);

        spinResult.push(reelResult);
    });

    // Take middle item on first reel
    compareItem = spinResult[0][1];

    // Filter out any items that don't match
    spinResultFiltered = spinResult.filter((reel) => {
        return reel[1].type !== compareItem.type;
    });

    // If spinResultFiltered is empty, all the items match (winning line)
    if (!spinResultFiltered.length) {
        return compareItem.winAmount; // Return winning amount
    } else {
        return false;
    }
}

// Randomly assign nudges
const assignNudges = () => {
    // Randomly assign nudges
    const nudgeRandom = Math.floor(Math.random() * nudgeChance + 1);

    // If random chance is met then assign nudges
    if (nudgeRandom === nudgeChance) {
        canNudge = true;
        enableNudges();
        nudges.nudgesRemaining = 5;
        nudges.render();

    } else if (nudges.nudgesRemaining < 1) { // If no nudges left in bank
        canNudge = false;
        disableNudges();
    }
}

// Randomly assign holds
const assignHolds = () => {
    const holdRandom = Math.floor(Math.random() * holdChance + 1);

    // Randomly assign holds (if no nudges left in bank)
    // Assign hold if random number met and last spin wasn't a win
    if (nudges.nudgesRemaining < 1) {
        if (holdRandom === holdChance) {
            // Can hold
            canHold = true;
            buttonStyles(holdButtonList, 'add', 'active');
        } else {
            canHold = false;
            buttonStyles(holdButtonList, 'remove', 'active');
            buttonStyles(holdButtonList, 'remove', 'held');
        }
    }
}

// Enable all nudges
const enableNudges = () => {
    reels.reelList.forEach((reel) => {
        // If the reel isn't held
        if (!reel.isHeld) {
            reel.canNudge = true;
        }
    });

    for (let i = 0; i < nudgeButtonList.length; i++) {
        // If the reel isn't held
        if (!reels.reelList[i].isHeld) {
            nudgeButtonList[i].classList.add('active');
        }
    }

    nudgesContainer.classList.add('active');
}

// Enbale all holds
const enableHolds = () => {
    reels.reelList.forEach((reel) => {
        reel.canHold = true;
    });

    for (let i = 0; i < holdButtonList.length; i++) {
        holdButtonList[i].classList.add('active');
    }

    canhold = true;
}

// Disable all nudges
const disableNudges = () => {
    reels.reelList.forEach((reel) => {
        reel.canNudge = false;
    });

    for (let i = 0; i < nudgeButtonList.length; i++) {
        nudgeButtonList[i].classList.remove('active');
    }

    nudges.reset();

    canNudge = false;

    nudgesContainer.classList.remove('active');
}

// Disable all holds
const disableHolds = () => {
    reels.reelList.forEach((reel) => {
        reel.canHold = false;
        reel.isHeld = false;
        if (reel.runTime < 1) {
            reel.resetRuntime();
        }
    });

    for (let i = 0; i < holdButtonList.length; i++) {
        holdButtonList[i].classList.remove('active', 'held');
    }

    canHold = false;
}

// Enable spin
const enableSpin = () => {
    spinButton.classList.add('active');
    canSpin = true;
}

// Disbale spin
const disableSpin = () => {
    spinButton.classList.remove('active');
    canSpin = false;
}

// Add or remove group button styles
const buttonStyles = (buttonList, addRemove, className) => {
    for (let i = 0; i < buttonList.length; i++) {
        if (addRemove === 'add') {
            buttonList[i].classList.add(className);
        } else if (addRemove === 'remove') {
            buttonList[i].classList.remove(className);
        }
    }
}


// Game state
const gameStates = {
    currentState: null,
    winAmount: 0,
    oldWinDisplay: 0, // When looping through win increment - this is the original figure
    currentWinDisplay: 0, // When looping through win amount - this is the new figure

    // Regular spin
    spin: function () {
        this.spinType = 'spin';
        disableSpin();
        moveReels();
        render();

        // Filter reel runtimes - if one is above zero then carry on
        reelsRunning = reels.reelList.filter((reel) => {
            return reel.runTime > 0;
        });

        if (!reelsRunning.length) {
            this.currentState = this.spinFinished;
        }
    },
    // Spin finished
    spinFinished: function (currentTime) {
        cancelAnimationFrame(gameLoop);

        if (nudges.nudgesRemaining < 1) {
            disableNudges();
            if (spinType !== 'nudge') {
                disableHolds();
            }
        }

        // Check for win
        const win = checkWin();

        // Win
        if (win) {
            // Reset nudges
            nudges.reset();
            canNudge = false;
            disableNudges();
            disableHolds();
            disableSpin();

            now = currentTime;
            this.winAmount = win;

            render();
            this.currentState = this.win; // Switch to win animation state
            gameLoop = requestAnimationFrame(loop);
        }
        // No win
        else {

            if (nudges.nudgesRemaining < 1 && spinType !== 'nudge' && credits.creditsRemaining > 0) {
                // If no winning line then assign holds and nudges
                assignHolds();
                assignNudges();
            }

            // Enable spin
            enableSpin();


            // Check credits
            if (credits.creditsRemaining === 0) {
                this.currentState = this.gameOver;
                this.currentState();
            }
        }

    },
    // Nudge
    nudge: function (currentTime) {
        let isNudging = [];
        // If nudging stopped, then change gamestate to spinfinished
        isNudging = reels.reelList.filter((reel) => {
            return reel.isNudging === true;
        });

        if (!isNudging.length) {
            cancelAnimationFrame(gameLoop);
            this.spinFinished(currentTime);
        }

        isNudging.forEach((reel) => {
            reel.nudge();
            render();
        });

    },
    // Win animation
    win: function (currentTime) {
        winIndicatorCentreLine.classList.add('active');
        winContainer.classList.add('active');


        disableSpin();
        disableHolds();

        if (currentTime - now > 50) {
            now = currentTime;
            this.currentWinDisplay += 1;
            win.currentWin = this.currentWinDisplay;
            win.render();

            if (this.currentWinDisplay - this.oldWinDisplay === this.winAmount) {
                // Finished looping
                this.oldWinDisplay = this.currentWinDisplay;
                cancelAnimationFrame(gameLoop);
                enableSpin();
                winContainer.classList.remove('active');
                viewportContainer.classList.remove('active');
                winIndicatorLeft.classList.remove('active');
                winIndicatorRight.classList.remove('active');
                winIndicatorCentreLine.classList.remove('active');

                // Check credits
                if (credits.creditsRemaining === 0) {
                    this.currentState = this.gameOver;
                    this.currentState();
                }
            }
        }
    },
    // Game over - credits ran out
    gameOver: function () {
        cancelAnimationFrame(gameLoop);
        disableSpin();

        setTimeout(() => {
            document.body.removeChild(playSection);

            disableNudges();
            disableHolds();

            renderGameOverSection();

            this.winAmount = 0;
            this.oldWinDisplay = 0;
            this.currentWinDisplay = 0;
        }, 1000);
    }
};

const renderGameOverSection = () => {
    const gameOverSection = document.createElement('div');
    gameOverSection.id = 'gameOverSection';

    gameOverSection.innerHTML = '<div>';
    gameOverSection.innerHTML += '<p>Game over</p>';
    gameOverSection.innerHTML += '<p>You won ' + win.currentWin + ' credits';
    gameOverSection.innerHTML += '<p>Press start to play again</p>'
    gameOverSection.innerHTML += '</div>';

    const startButton = document.createElement('button');
    startButton.id = 'startButton';
    startButton.classList.add('button');
    startButton.innerText = 'START';

    gameOverSection.appendChild(startButton);

    document.body.appendChild(gameOverSection);

    startButton.addEventListener('click', () => {
        document.body.removeChild(gameOverSection);

        playSection = document.createElement('div');
        playSection.id = 'playSection';
        document.body.appendChild(playSection);

        init();
    });
}


// Preload images then start game
var loaded = 0;
var imageList = [];
let img;

ITEM_INFO.forEach((item) => {
    img = new Image();
    img.src = './img/' + item.imageSrc;
    img.onload = () => {
        loaded++;
        if (loaded === ITEM_INFO.length) init();
    };
});
