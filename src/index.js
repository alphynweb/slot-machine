import Viewport from './modules/viewport';
import Reels from './modules/reels';
import BonusReel from './modules/bonusReel';
import GambleSection from './modules/gambleSection';
import NudgeButtons from './modules/nudgeButtons';
import HoldButtons from './modules/holdButtons';
import SpinButton from './modules/spinButton';
import Credits from './modules/credits';
import Win from './modules/win';
import Nudges from './modules/nudges';
import Preloader from './utils/Preloader';
import Sounds from './modules/Sounds';
import winlines from './modules/winlines';
import sleep from './utils/Sleep';

// Fonts
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/@fortawesome/fontawesome-free/js/all.js';


// Sounds (preloading)
import reelStoppedSoundMp3 from './assets/sounds/reel-stopped.mp3';
import reelStoppedSoundOgg from './assets/sounds/reel-stopped.ogg';
import spinSoundMp3 from './assets/sounds/spin-sound.mp3';
import spinSoundOgg from './assets/sounds/spin-sound.ogg';

// Scss
import "./scss/app.scss";
// import sounds from './modules/Sounds';

const viewport = Viewport();
const winContainer = document.getElementById('win');
const nudgesContainer = document.getElementById('nudges');

const gambleSection = GambleSection();

// const controlsSection = document.getElementById('controlsSection');
// const playSection = document.getElementById('playSection');
const gameSection = document.getElementById('gameSection');

let canvasViewport;
let canvasViewportW;
let canvasViewportH;
let viewportContainer;
let viewportContainerW;
let viewportContainerH;
let gambleSectionContainer;
let winCentreLine = document.getElementById('winCentreLine');
let spinButton;
let spinButtonContainer;
const spinSound = Sounds(spinSoundMp3, spinSoundOgg);
spinSound.loop = true;
spinSound.startTime = SOUNDS.spin.startTime;
spinSound.stopTime = SOUNDS.spin.stopTime;
const reelStoppedSound = Sounds(reelStoppedSoundMp3, reelStoppedSoundOgg);
const soundIcon = Sounds();
let reels;
let bonusReel;
let nudges;
let nudgeButtons;
let holdButtons;
let nudgeButtonList;
let holdButtonContainerList;
let nudgeButtonContainerList;
let credits;
let win;
let gameLoop;
let nudgeChance = NUDGE_CHANCE; // Chance of getting nudges after spin (1 in nudgeChance)
let holdChance = HOLD_CHANCE; // Chance of getting holds after spin (1 in holdChance)
let canSpin;
let canNudge;
let canHold;
let now; // Current time to compare against
let reelsRunning = []; // Keeps track of any reels with runtime left on them to estblish whether to reset/stop spin etc.
let spinType = 'spin'; // Keeps track of whether last spin was regular spin or nudge
let winLines;
let winAmount;
let winType;
let oldWinDisplay; // When looping through win increment - this is the original figure
let currentWinDisplay = 0; // When looping through win amount - this is the new figure
let isMuted = true;


// Preload images and sounds then init if all loaded successfully
const reelImagesToPreload = ITEM_INFO.map(item => {
    return './img/' + item.imageSrc;
});

const bonusImagesToPreload = BONUS_REEL_ITEM_INFO.map(item => {
    return './img/' + item.imageSrc;
});

const imagesToPreload = reelImagesToPreload.concat(bonusImagesToPreload);
const preloaderImages = Preloader(imagesToPreload, "image");
const loadImgFiles = preloaderImages.preloadFiles();

const soundsToPreload = [reelStoppedSoundMp3, reelStoppedSoundOgg, spinSoundMp3, spinSoundOgg];
const preloaderSounds = Preloader(soundsToPreload, "sound");
const loadSoundFiles = preloaderSounds.preloadFiles();

Promise.all([loadImgFiles, loadSoundFiles])
    .then(() => {
        init();
    }).catch();

// Initialise
const init = () => {
    // Render sound icon
    soundIcon.render(isMuted);

    soundToggle.addEventListener('click', () => {
        toggleMute();
    });

    // Render viewport
    viewport.render();

    // Set up spin sound


    // Set up reels
    reels = Reels();
    reels.build();
    reels.render();

    // Render gamble section
    gambleSection.render();

    // Set up bonus reel
    bonusReel = BonusReel();
    bonusReel.build();
    bonusReel.render();

    // Render Reel Containers
    let reelContainer;
    let reelContainerX;
    let reelContainerY;
    let reelContainerW;
    let reelContainerH;

    viewportContainer = document.getElementById('viewportContainer');
    viewportContainerW = viewportContainer.getBoundingClientRect().width;
    viewportContainerH = viewportContainer.getBoundingClientRect().height;

    canvasViewport = document.getElementById('viewport');
    canvasViewportW = canvasViewport.getBoundingClientRect().width;
    canvasViewportH = canvasViewport.getBoundingClientRect().height;

    reels.reelList.forEach((reel) => {
        // Render outer container for each reel in the viewport container
        reelContainer = document.createElement('div');
        reelContainerX = ((viewportContainerW - canvasViewportW) / 2) - VIEWPORT_CONTAINER_PADDING_X + reel.reelItems[2].x;
        reelContainerW = REEL_WIDTH + (REEL_CONTAINER_PADDING * 2);
        reelContainerH = VIEWPORT_HEIGHT + (REEL_CONTAINER_PADDING * 2);
        reelContainer.style.position = 'absolute';
        reelContainer.style.left = reelContainerX + 'px';
        reelContainer.style.width = reelContainerW + 'px';
        reelContainer.style.height = reelContainerH + 'px';
        reelContainer.classList.add('reel-container');
        viewportContainer.appendChild(reelContainer);
    });

    // Render bonus reel container
    const bonusReelContainer = document.getElementById('bonusReelContainer');

    reelContainer = document.createElement('div');
    reelContainerX = -REEL_CONTAINER_PADDING;
    reelContainerY = -REEL_CONTAINER_PADDING;
    reelContainerW = REEL_WIDTH + (REEL_CONTAINER_PADDING * 2);
    reelContainerH = VIEWPORT_HEIGHT + (REEL_CONTAINER_PADDING * 2);
    reelContainer.style.position = 'absolute';
    reelContainer.style.left = reelContainerX + 'px';
    reelContainer.style.top = reelContainerY + 'px';
    reelContainer.style.width = reelContainerW + 'px';
    reelContainer.style.height = reelContainerH + 'px';
    reelContainer.classList.add('reel-container');
    bonusReelContainer.appendChild(reelContainer);

    // Set up nudge buttons
    nudgeButtons = NudgeButtons();
    nudgeButtons.build();
    nudgeButtons.render();

    nudgeButtonContainerList = document.querySelectorAll('.nudge.button-container');

    for (let i = 0; i < nudgeButtonContainerList.length; i++) {
        nudgeButtonContainerList[i].addEventListener('click', (event) => {
            const nudgeButtonContainer = event.target.parentElement;

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

    // Set up hold buttons
    holdButtons = HoldButtons();
    holdButtons.build();
    holdButtons.render();

    holdButtonContainerList = document.querySelectorAll('.hold.button-container');

    for (let i = 0; i < holdButtonContainerList.length; i++) {
        holdButtonContainerList[i].addEventListener('click', (event) => {
            const holdButtonContainer = event.target.parentElement;

            if (canSpin && canHold) {
                // Toggle
                if (reels.reelList[i].isHeld) {
                    // Take hold off
                    reels.reelList[i].isHeld = false;
                    reels.reelList[i].resetRuntime();
                    holdButtonContainer.classList.add('active');
                    holdButtonContainer.classList.remove('lit');
                } else {
                    // Put hold on
                    reels.reelList[i].isHeld = true;
                    reels.reelList[i].runTime = 0;
                    holdButtonContainer.classList.remove('active');
                    holdButtonContainer.classList.add('lit');
                }

            }
        });
    }

    // Set up spin button
    spinButton = SpinButton();
    spinButton.render();

    // Assign spin button container
    spinButtonContainer = document.querySelector('.spin.button-container');

    // Set up credits
    credits = Credits();
    credits.reset();
    credits.render();

    // Set up win 
    win = Win();
    win.reset();
    win.render();

    // Set up winlines
    winLines = winlines();
    winLines.build();
    winLines.render();

    canSpin = true;
    canNudge = false;
    canHold = false;

    enableSpin();

    spinButtonContainer.addEventListener('click', () => {
        if (canSpin) {
            credits.useCredit();
            credits.render();

            disableNudges();
            disableSpin();

            // Disable hold buttons that aren't held
            for (let i = 0; i < reels.reelList.length; i++) {
                holdButtonContainerList[i].classList.remove('active');
                if (!reels.reelList[i].isHeld) {
                    reels.reelList[i].canHold = false;
                }
            }

            spinType = 'spin';

            // Start playing spin sound
            // spinSound.play(isMuted);

            gameStates.currentState = gameStates.spin;
            gameLoop = requestAnimationFrame(loop);
            gameStates.currentState();
        }
    });
}

// Reset 
const reset = () => {
    // Reset credits
    credits.reset();

    // Reset win amount
    win.reset();
    currentWinDisplay = 0;

    // Reset nudges
    nudges.reset();

    // Enable spin
    enableSpin();

    render();
};

// Loop
const loop = (currentTime) => {
    gameLoop = requestAnimationFrame(loop); // Needs to go before line below to keep animationframeid up to date
    gameStates.currentState(currentTime);
};

// Move reels
const moveReels = () => {
    reels.move(isMuted);
};

// Render
const render = () => {
    viewport.clear();
    reels.render();
    bonusReel.render();

    // Digits
    nudges.render();
    credits.render();
    win.render();
};

// Calculates win amount, if winning line
const checkWin = () => {
    let spinResult = getSpinResult(); // Array of reel results after spin (all three visible objects of each reel)
    let spinResultFiltered = []; // Array of results that don't match first reel
    let compareItem; // Middle item on reel one to compare

    // Take middle item on first reel
    compareItem = spinResult[0][1];

    // Filter out any items that don't match
    spinResultFiltered = spinResult.filter((reel) => {
        return reel[1].type !== compareItem.type;
    });

    // If spinResultFiltered is empty, all the items match (winning line) apart from bonus items
    if (!spinResultFiltered.length && compareItem.type !== 'Bonus') {
        return compareItem; // Return winning object
    } else {
        return false;
    }
};

// Check for bonus spin
const checkBonusSpin = () => {
    let isBonus = true;
    const spinResult = getSpinResult();

    spinResult.forEach((reelInfo, index) => {
        if (!reelInfo.some(reelItem => reelItem.type === 'Bonus')) {
            isBonus = false;
        }
    });

    return isBonus;
};

// Get spin result that is visible in viewport
const getSpinResult = () => {
    let spinResult = [];
    let reelResult;

    reels.reelList.forEach((reel, index) => {
        reelResult = []; // Result of individual reel

        reelResult.push(reels.reelList[index].reelItems[0]);
        reelResult.push(reels.reelList[index].reelItems[1]);
        reelResult.push(reels.reelList[index].reelItems[2]);

        spinResult.push(reelResult);
    });

    return spinResult;
};

// Randomly assign nudges
const assignNudges = (nudgesToAssign) => {
    // console.log("Assigning nudges. Spin type", spinType);
    // Randomly assign nudges
    const nudgeRandom = Math.floor(Math.random() * nudgeChance + 1);

    // If random chance is met then assign nudges
    if (nudgeRandom === nudgeChance) {
        canNudge = true;
        enableNudges();
        nudges.nudgesRemaining = nudgesToAssign;
        nudges.render();

    } else if (nudges.nudgesRemaining < 1) { // If no nudges left in bank
        canNudge = false;
        disableNudges();
    }
};

// Randomly assign holds
const assignHolds = () => {
    const holdRandom = Math.floor(Math.random() * holdChance + 1);

    // Randomly assign holds (if no nudges left in bank)
    // Assign hold if random number met and last spin wasn't a win
    if (nudges.nudgesRemaining < 1) {
        if (holdRandom === holdChance) {
            // Can hold
            canHold = true;
            // Remove styles first to ensure synchronicity
            buttonStyles(holdButtonContainerList, 'remove', 'active');
            buttonStyles(holdButtonContainerList, 'add', 'active');
        } else {
            canHold = false;
            buttonStyles(holdButtonContainerList, 'remove', 'active');
            buttonStyles(holdButtonContainerList, 'remove', 'is-holding');
        }
    }
};

// Enable all nudges
const enableNudges = () => {
    reels.reelList.forEach((reel) => {
        // If the reel isn't held
        if (!reel.isHeld) {
            reel.canNudge = true;
        }
    });

    nudgeButtonContainerList = document.querySelectorAll('.nudge.button-container');

    for (let i = 0; i < nudgeButtonContainerList.length; i++) {
        // If the reel isn't held
        if (!reels.reelList[i].isHeld) {
            nudgeButtonContainerList[i].classList.add('active');
        }
    }
};

// Enbale all holds
const enableHolds = () => {
    reels.reelList.forEach((reel) => {
        reel.canHold = true;
    });

    for (let i = 0; i < holdButtonContainerList.length; i++) {
        holdButtonContainerList[i].classList.add('active');
    }

    canhold = true;
};

// Disable all nudges
const disableNudges = () => {
    reels.reelList.forEach((reel) => {
        reel.canNudge = false;
    });

    nudgeButtonContainerList = document.querySelectorAll('.nudge.button-container');

    for (let i = 0; i < nudgeButtonContainerList.length; i++) {
        // If the reel isn't held
        nudgeButtonContainerList[i].classList.remove('active');
    }

    nudges.reset();

    canNudge = false;
};

// Disable all holds
const disableHolds = () => {
    reels.reelList.forEach((reel) => {
        reel.canHold = false;
        reel.isHeld = false;
        if (reel.runTime < 1) {
            reel.resetRuntime();
        }
    });

    for (let i = 0; i < holdButtonContainerList.length; i++) {
        holdButtonContainerList[i].classList.remove('active', 'lit');
    }

    canHold = false;
};

// Enable spin
const enableSpin = () => {
    spinButtonContainer.classList.add('active');
    canSpin = true;
    reels.resetRuntimes();
};

// Disbale spin
const disableSpin = () => {
    spinButtonContainer.classList.remove('active');
    canSpin = false;
};

// Add or remove group button styles
const buttonStyles = (buttonList, addRemove, className) => {
    for (let i = 0; i < buttonList.length; i++) {
        if (addRemove === 'add') {
            buttonList[i].classList.add(className);
        } else if (addRemove === 'remove') {
            buttonList[i].classList.remove(className);
        }
    }
};

// Handle win
const handleWin = (win, currentTime) => {
    // Reset nudges
    nudges.reset();
    canNudge = false;
    disableNudges();
    disableHolds();
    disableSpin();

    now = currentTime;
    winAmount = win.winAmount;
    winType = win.type;

    winLines.displayWin(winType);

    oldWinDisplay = currentWinDisplay;

    render();
    gameStates.currentState = gameStates.win; // Switch to win animation state
    gameLoop = requestAnimationFrame(loop);
};

// Handle bonus reel win (returns win object)
const handleBonusReelBonus = () => {
    const bonusReelItem = bonusReel.reelItems[1];
    const bonusType = bonusReelItem.type;

    switch (bonusType) {
        case "nudge":
            const nudgeBonus = bonusReelItem.bonus;
            // console.log(nudgeBonus, "Nudges awarded");
            assignNudges(nudgeBonus);
            break;
    };
}

// Handle no win
const handleNoWin = () => {
    if (nudges.nudgesRemaining < 1 && credits.creditsRemaining > 0) {
        switch (spinType) {
            case 'spin':
                assignHolds();
                assignNudges(NUDGE_ASSIGN_NO);
                break;
            case 'bonus':
                handleBonusReelBonus();
                break;
        }
    }

    // Enable spin
    enableSpin();

    // Check credits
    if (credits.creditsRemaining === 0) {
        gameStates.currentState = gameStates.gameOver;
        gameStates.currentState();
    }
}

// Render game over section
const renderGameOverSection = () => {
    gameOverSection.classList.remove('hide');

    const winDisplayAmount = document.getElementById('winDisplayAmount');

    winDisplayAmount.innerHTML = currentWinDisplay;

    startButton.addEventListener('click', startButtonAddEventListener);
}

// Add event listener to start button
const startButtonAddEventListener = () => {
    gameOverSection.classList.add('hide');
    gameSection.classList.remove('hide');
    startButton.removeEventListener('click', startButtonAddEventListener);
    reset();
}

const toggleMute = () => {
    isMuted = !isMuted;
    soundIcon.render(isMuted);
};

// Game state
const gameStates = {
    currentState: null,

    // Regular spin
    spin: function () {
        this.spinType = 'spin';
        disableSpin();
        disableNudges();
        moveReels();
        render();

        reelsRunning = reels.reelList.filter((reel) => {
            return !reel.isStopped;
        });

        if (!reelsRunning.length) {
            this.currentState = this.spinFinished;
        }
    },
    // Spin finished
    spinFinished: async function (currentTime) {
        // console.log("Spin finished");
        cancelAnimationFrame(gameLoop);

        // Stop reel spinning sound
        spinSound.pause();

        if (nudges.nudgesRemaining < 1) {
            disableNudges();
            if (spinType !== 'nudge') {
                disableHolds();
            }
        }

        // Check for bonus spin
        const bonusSpin = checkBonusSpin();
        // const bonusSpin = true;

        if (bonusSpin && spinType !== 'nudge') {
            spinType = 'bonus';
            // Temporarily disable holds and nudges and spin button
            disableHolds();
            disableNudges();
            disableSpin();

            const bonusReelSurround = document.getElementById('bonusReelContainer').querySelector('.reel-container');
            // Add active class to bonus reel container
            bonusReelSurround.classList.add('active');
            sleep(3000)
                .then(() => {
                    spinSound.play(isMuted);
                    this.currentState = this.bonusReelSpin;
                    gameLoop = requestAnimationFrame(loop);
                    this.currentState();
                });
        }

        else {
            // Check for win
            const win = checkWin();

            // Win
            if (win) {
                handleWin(win, currentTime);
            }
            // No win
            else {
                handleNoWin();
            } // End else
        } // End else
    },
    // Bonus reel spin finished
    bonusReelSpinFinished: async function () {
        cancelAnimationFrame(gameLoop);
        spinSound.pause();
        const bonusReelSurround = document.getElementById('bonusReelContainer').querySelector('.reel-container');
        const bonusReelCentreLine = document.getElementById('bonusCentreLine');
        // Remove active class from bonus reel container
        bonusReelSurround.classList.remove('active');
        // Add active class to bonus reel centre line
        bonusReelCentreLine.classList.add('active');

        await sleep(2000)
            .then(() => {
                // Remove active class from bonus reel centre line
                bonusReelCentreLine.classList.remove('active');
                // Check for win
                const win = checkWin();

                // Win
                if (win) {
                    handleWin(win);
                }

                // No win
                else {
                    handleNoWin();
                }

                enableSpin();
            });
    },
    // Bonus reel spin
    bonusReelSpin: function () {
        disableSpin();
        disableNudges();
        bonusReel.move(isMuted);
        render();

        if (bonusReel.isStopped) {
            this.currentState = this.bonusReelSpinFinished;
            bonusReel.resetRunTime();
        }
    },
    // Nudge
    nudge: function (currentTime) {
        let isNudging = [];
        // If nudging stopped, then change gamestate to spinfinished
        isNudging = reels.reelList.filter((reel, index) => {
            return reel.isNudging === true;
        });

        if (!isNudging.length) {
            // Play reel stopped sound
            reelStoppedSound.play(isMuted);
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
        winCentreLine.classList.add('active');
        winContainer.classList.add('active');

        disableSpin();
        disableHolds();

        if (currentTime - now > 50) {
            now = currentTime;
            currentWinDisplay += 1;
            win.currentWin = currentWinDisplay;
            win.render();

            if (currentWinDisplay - oldWinDisplay === winAmount) {
                // Finished looping
                oldWinDisplay = currentWinDisplay;
                cancelAnimationFrame(gameLoop);
                enableSpin();
                winContainer.classList.remove('active');
                viewportContainer.classList.remove('active');
                winCentreLine.classList.remove('active');
                winLines.removeWins();

                // Check credits
                if (credits.creditsRemaining === 0) {
                    this.currentState = this.gameOver;
                    this.currentState();
                } else {
                    enableSpin();
                }
            }
        }
    },
    // Game over - credits ran out
    gameOver: function () {
        cancelAnimationFrame(gameLoop);
        disableSpin();

        setTimeout(() => {
            gameSection.classList.add('hide');

            disableNudges();
            disableHolds();

            renderGameOverSection();

            this.winAmount = 0;
            this.oldWinDisplay = 0;
            this.currentWinDisplay = 0;
        }, 1000);
    }
};