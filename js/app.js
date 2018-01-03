/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const digits = () => {
    return {
        digitsString: null,
        container: null, // Container that holds digitContainers
        digitContainers: null, // List of digit containers that hold single digit each
        render: function () {
            // // Split number into seperate characters
            this.digitContainers = this.container.getElementsByClassName('digit-number'); 
            let digitIndex; // Which digit container to put number in

            // Wipe the digits
            for (let i = 0; i < this.digitContainers.length; i++) {
                this.digitContainers[i].classList.remove('active');
                this.digitContainers[i].innerHTML = '8';
            }

            // Populate the digits
            for (let i = 0; i < this.digitsString.length; i++) {
                digitIndex = (this.digitContainers.length) - (this.digitsString.length - i);
                this.digitContainers[digitIndex].classList.add('active');
                this.digitContainers[digitIndex].innerHTML = this.digitsString[i];
            }
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (digits);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reelItem__ = __webpack_require__(4);




const reel = (reelNo) => {
    let firstItem;
    let lastItem;
    let nudgeCallTimes;

    return {
        noOfItems: NO_ITEMS,
        itemList: ITEM_LIST,
        reelSpeed: REEL_SPEED,
        nudgeSpeed: 10,
        runTime: (REEL_SPEED * 10) + (20 * reelNo), // Arbitrary values for testing
        canHold: false,
        isHeld: false,
        canNudge: false,
        isNudging: false,
        nudgeFrames: ITEM_HEIGHT / NUDGE_SPEED,
        nudgeFrame: 0,
        reelItems: [],
        reelNo,
        build: function () {
            let itemNo = 0;
            let type;
            let instances;
            let imageSrc;
            let winAmount;
            let x;
            let y;
            let newReelItem;

            ITEM_INFO.forEach((item, index) => {
                type = item.type;
                instances = item.instances;
                imageSrc = item.imageSrc;
                winAmount = item.winAmount;

                // Add required no of instances of this item to the reelItems array
                for (let i = 0; i < instances; i++) {
                    x = VIEWPORT_X + (this.reelNo * REEL_WIDTH) + (this.reelNo * REEL_SPACING);

                    y = (VIEWPORT_Y - ITEM_HEIGHT) - (ITEM_HEIGHT * itemNo) - 100;

                    const img = new Image();
                    img.src = './img/' + item.imageSrc;

                    newReelItem = Object(__WEBPACK_IMPORTED_MODULE_0__reelItem__["a" /* default */])(type, itemNo, img, x, y, winAmount);
                    this.reelItems.push(newReelItem);
                    itemNo++;
                    // }
                }
            });

            this.shuffle();
            this.resetCoords();
        },
        shuffle: function () {
            let rnd;
            let temp;
            for (let i = this.reelItems.length - 1; i > 0; i--) {
                rnd = Math.floor(Math.random() * (i + 1));
                temp = this.reelItems[i];
                this.reelItems[i] = this.reelItems[rnd];
                this.reelItems[rnd] = temp;
            }
        },
        nudge: function () {
            this.reelItems.forEach((item) => {
                item.nudge();
            });

            this.shift();

            this.nudgeFrame++;

            if (this.nudgeFrame >= this.nudgeFrames) {
                this.isNudging = false;
                this.nudgeFrame = 0;
            }
        },
        resetCoords: function () {
            for (let i = 0; i < this.reelItems.length; i++) {
                this.reelItems[i].y = VIEWPORT_Y + VIEWPORT_HEIGHT - ITEM_HEIGHT - (ITEM_HEIGHT * i);
            }
        },
        resetRuntime: function () {
            if (!this.isHeld) {
                this.runTime = (REEL_SPEED * 10) + (20 * reelNo); // Arbitrary values for testing;
            }
        },
        shift: function () {
            // If bottom reel item gets below bottom of viewport then move it to beginning of array
            if (this.reelItems[0].y >= VIEWPORT_Y + VIEWPORT_HEIGHT) {
                firstItem = this.reelItems[0];
                lastItem = this.reelItems[this.reelItems.length - 1];

                // Rest y coords for item to shift to top of reel
                firstItem.y = lastItem.y - ITEM_HEIGHT;

                // Shift bottom item to top
                this.reelItems.push(this.reelItems.shift());
            }
        },
        move: function () {
            this.reelItems.forEach((reelItem) => {
                reelItem.move();
            });
            this.shift();
            // Reduce reel runtime
            this.runTime--;
        },
        render: function () {
            this.reelItems.forEach((reelItem) => {
                reelItem.render();
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (reel);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_viewport__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_reel__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_reels__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_nudgeButtons__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_holdButtons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_credits__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_win__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_nudges__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__scss_app_scss__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__scss_app_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__scss_app_scss__);








// Sass


// const viewportContainer = document.getElementById('viewportContainer');
const viewport = Object(__WEBPACK_IMPORTED_MODULE_0__modules_viewport__["a" /* default */])();
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
    reels = Object(__WEBPACK_IMPORTED_MODULE_2__modules_reels__["a" /* default */])();
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
    nudgeButtons = Object(__WEBPACK_IMPORTED_MODULE_3__modules_nudgeButtons__["a" /* default */])();
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
    nudges = Object(__WEBPACK_IMPORTED_MODULE_7__modules_nudges__["a" /* default */])();
    nudges.render();

    renderHoldButtonContainer();

    // Set up hold buttons
    holdButtons = Object(__WEBPACK_IMPORTED_MODULE_4__modules_holdButtons__["a" /* default */])();
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
    credits = Object(__WEBPACK_IMPORTED_MODULE_5__modules_credits__["a" /* default */])();
    credits.reset();
    credits.render();

    // Set up win 
    win = Object(__WEBPACK_IMPORTED_MODULE_6__modules_win__["a" /* default */])();
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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const viewport = () => {
    const newViewport = document.createElement('canvas');
    newViewport.width = VIEWPORT_WIDTH;
    newViewport.height = VIEWPORT_HEIGHT;
    newViewport.id = "viewport";

    return {
        viewport: newViewport,
        width: VIEWPORT_WIDTH,
        height: VIEWPORT_HEIGHT,
        ctx: newViewport.getContext('2d'),
        render: function () {
            const viewportContainer = document.getElementById('viewportContainer');
            viewportContainer.appendChild(this.viewport);
        },
        clear: function () {
            this.ctx.clearRect(0, 0, this.width, this.height)
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (viewport);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ctx__ = __webpack_require__(5);




const reelItem = (type, itemNo, img, x, y, winAmount) => {
    return {
        type,
        itemNo,
        img,
        x,
        y,
        winAmount,
        speed: REEL_SPEED,
        nudgeSpeed: NUDGE_SPEED,
        ctx: document.getElementById('viewport').getContext('2d'),
        move: function() {
            this.y += this.speed;
        },
        nudge: function() {
            this.y += this.nudgeSpeed;
        },
        render: function () {
            this.ctx.drawImage(this.img, 0, 0, ITEM_WIDTH, ITEM_HEIGHT, this.x, this.y, ITEM_WIDTH, ITEM_HEIGHT);
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (reelItem);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const ctx = () => {
    return document.querySelector('canvas').getContext('2d');
};

/* unused harmony default export */ var _unused_webpack_default_export = (ctx);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reel__ = __webpack_require__(1);




const reels = () => {
    let newReel;
    return {
        reelList: [],
        build: function () {
            for (let i = 0; i < NO_REELS; i++) {
                newReel = Object(__WEBPACK_IMPORTED_MODULE_0__reel__["a" /* default */])(i);
                newReel.build();
                this.reelList.push(newReel);
            }
        },
        move: function () {
            this.reelList.forEach((reel) => {
                if (reel.runTime > 0 && !reel.isHeld) {
                    reel.move();
                }
            });
        },
        resetRuntimes: function () {
            this.reelList.forEach((reel) => {
                reel.resetRuntime();
            });
        },
        render: function () {
            this.reelList.forEach((reel) => {
                reel.render();
            })
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (reels);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nudgeButton__ = __webpack_require__(8);




const nudgeButtons = () => {
    let newButton;

    return {
        buttonList: [],
        build: function() {
            for (let i = 0; i < NO_REELS; i++) {
                newButton = Object(__WEBPACK_IMPORTED_MODULE_0__nudgeButton__["a" /* default */])(i);
                this.buttonList.push(newButton);
            }
        },
        render: function() {
            this.buttonList.forEach((btn, index) => {
                btn.render(index);
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (nudgeButtons);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const nudgeButton = (index) => {
    let nudgeButton;
    let nudgeButtonContainer;

    return {
        container: document.getElementById('nudgeButtons'),
        reelNo: index,
        render: function () {
            nudgeButton = document.createElement('button');
            nudgeButton.innerHTML = 'NUDGE';
            nudgeButton.classList.add('nudge-button', 'button');
            nudgeButton.style.width = BUTTON_WIDTH + 'px';
            nudgeButton.style.marginLeft = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            nudgeButton.style.marginRight = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            this.container.appendChild(nudgeButton);
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (nudgeButton);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__holdButton__ = __webpack_require__(10);




const holdButtons = () => {
    let newButton;

    return {
        buttonList: [],
        build: function () {
            for (let i = 0; i < NO_REELS; i++) {
                newButton = Object(__WEBPACK_IMPORTED_MODULE_0__holdButton__["a" /* default */])(i);
                this.buttonList.push(newButton);
            }
        },
        render: function () {
            this.buttonList.forEach((btn, index) => {
                btn.render(index);
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (holdButtons);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const holdButton = (index) => {
    let holdButton;

    return {
        container: document.getElementById('holdButtons'),
        reelNo: index,
        render: function () {
            holdButton = document.createElement('button');
            holdButton.innerHTML = 'HOLD';
            holdButton.classList.add('hold-button', 'button');
            holdButton.style.width = BUTTON_WIDTH + 'px';
            holdButton.style.marginLeft = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            holdButton.style.marginRight = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            this.container.appendChild(holdButton);
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (holdButton);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__digits__ = __webpack_require__(0);




const credits = () => {
    return {
        creditsRemaining: CREDITS,
        digits: Object(__WEBPACK_IMPORTED_MODULE_0__digits__["a" /* default */])(),
        container: document.getElementById('credits'),
        useCredit: function () {
            this.creditsRemaining--;
        },
        reset: function () {
            this.creditsRemaining = CREDITS;
        },
        render: function () {
            this.digits.digitsString = this.creditsRemaining.toString();
            this.digits.container = this.container;
            this.digits.render();
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (credits);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__digits__ = __webpack_require__(0);




const win = () => {
    return {
        currentWin: 0,
        digits: Object(__WEBPACK_IMPORTED_MODULE_0__digits__["a" /* default */])(),
        container: document.getElementById('win'),
        addWin: function(winAmount) {
            this.currentWin += winAmount;
        },
        reset: function() {
            this.currentWin = 0;
        },
        render: function() {
            this.digits.digitsString = this.currentWin.toString();
            this.digits.container = this.container;
            this.digits.render();
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (win);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__digits__ = __webpack_require__(0);




const nudges = () => {
    return {
        nudgesRemaining: 0,
        digits: Object(__WEBPACK_IMPORTED_MODULE_0__digits__["a" /* default */])(),
        container: document.getElementById('nudges'),
        reset: function() {
            this.nudgesRemaining = 0;
            this.render();
        },
        render: function() {
            this.digits.digitsString = this.nudgesRemaining.toString();
            this.digits.container = this.container;
            this.digits.render();
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (nudges);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzA0ZGFjNTk3NTUwYzljYzEwYzYiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy9kaWdpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy9yZWVsLmpzIiwid2VicGFjazovLy8uL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy92aWV3cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9tb2R1bGVzL3JlZWxJdGVtLmpzIiwid2VicGFjazovLy8uL2pzL21vZHVsZXMvY3R4LmpzIiwid2VicGFjazovLy8uL2pzL21vZHVsZXMvcmVlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy9udWRnZUJ1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy9udWRnZUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9tb2R1bGVzL2hvbGRCdXR0b25zLmpzIiwid2VicGFjazovLy8uL2pzL21vZHVsZXMvaG9sZEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9tb2R1bGVzL2NyZWRpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy93aW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy9udWRnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDN0RBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUY7QUFDQSwyQkFBMkI7O0FBRTNCO0FBQ0EsMkJBQTJCLGlDQUFpQztBQUM1RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsOEJBQThCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFOzs7Ozs7OztBQzVCQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IsZUFBZTtBQUM5Qzs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELE9BQU87QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsMkJBQTJCLDJCQUEyQjtBQUN0RDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxpRUFBaUU7QUFDakU7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUEsK0Q7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixzQkFBc0I7QUFDdEIsc0JBQXNCOztBQUV0Qjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsNEJBQTRCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQiwyQkFBMkI7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkIsMkJBQTJCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QixnQ0FBZ0M7QUFDaEMsbUJBQW1CO0FBQ25CLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBLHdCQUF3Qjs7QUFFeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLHFDQUFxQztBQUNyQyxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLLHVDQUF1QztBQUM1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxtQkFBbUIsNEJBQTRCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsbUJBQW1CLDJCQUEyQjtBQUM5QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLG1CQUFtQiw0QkFBNEI7QUFDL0M7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLG1CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLHVCQUF1QjtBQUMxQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7QUM1bEJEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1FOzs7Ozs7OztBQ3ZCQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUU7Ozs7Ozs7QUMzQkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLCtFOzs7Ozs7OztBQ05BOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUEsZ0U7Ozs7Ozs7O0FDbkNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGNBQWM7QUFDekM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUEsdUU7Ozs7Ozs7QUN2QkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0U7Ozs7Ozs7O0FDckJBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGNBQWM7QUFDekM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUEsc0U7Ozs7Ozs7QUN2QkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFFOzs7Ozs7OztBQ3BCQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtFOzs7Ozs7OztBQ3ZCQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhEOzs7Ozs7OztBQ3ZCQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFOzs7Ozs7QUNyQkEseUMiLCJmaWxlIjoiLi9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3MDRkYWM1OTc1NTBjOWNjMTBjNiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IGRpZ2l0cyA9ICgpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGlnaXRzU3RyaW5nOiBudWxsLFxyXG4gICAgICAgIGNvbnRhaW5lcjogbnVsbCwgLy8gQ29udGFpbmVyIHRoYXQgaG9sZHMgZGlnaXRDb250YWluZXJzXHJcbiAgICAgICAgZGlnaXRDb250YWluZXJzOiBudWxsLCAvLyBMaXN0IG9mIGRpZ2l0IGNvbnRhaW5lcnMgdGhhdCBob2xkIHNpbmdsZSBkaWdpdCBlYWNoXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIC8vIFNwbGl0IG51bWJlciBpbnRvIHNlcGVyYXRlIGNoYXJhY3RlcnNcclxuICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnMgPSB0aGlzLmNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkaWdpdC1udW1iZXInKTsgXHJcbiAgICAgICAgICAgIGxldCBkaWdpdEluZGV4OyAvLyBXaGljaCBkaWdpdCBjb250YWluZXIgdG8gcHV0IG51bWJlciBpblxyXG5cclxuICAgICAgICAgICAgLy8gV2lwZSB0aGUgZGlnaXRzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kaWdpdENvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnNbaV0uaW5uZXJIVE1MID0gJzgnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBQb3B1bGF0ZSB0aGUgZGlnaXRzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kaWdpdHNTdHJpbmcubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGRpZ2l0SW5kZXggPSAodGhpcy5kaWdpdENvbnRhaW5lcnMubGVuZ3RoKSAtICh0aGlzLmRpZ2l0c1N0cmluZy5sZW5ndGggLSBpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2RpZ2l0SW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnNbZGlnaXRJbmRleF0uaW5uZXJIVE1MID0gdGhpcy5kaWdpdHNTdHJpbmdbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGlnaXRzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbW9kdWxlcy9kaWdpdHMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHJlZWxJdGVtIGZyb20gJy4vcmVlbEl0ZW0nO1xyXG5cclxuY29uc3QgcmVlbCA9IChyZWVsTm8pID0+IHtcclxuICAgIGxldCBmaXJzdEl0ZW07XHJcbiAgICBsZXQgbGFzdEl0ZW07XHJcbiAgICBsZXQgbnVkZ2VDYWxsVGltZXM7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBub09mSXRlbXM6IE5PX0lURU1TLFxyXG4gICAgICAgIGl0ZW1MaXN0OiBJVEVNX0xJU1QsXHJcbiAgICAgICAgcmVlbFNwZWVkOiBSRUVMX1NQRUVELFxyXG4gICAgICAgIG51ZGdlU3BlZWQ6IDEwLFxyXG4gICAgICAgIHJ1blRpbWU6IChSRUVMX1NQRUVEICogMTApICsgKDIwICogcmVlbE5vKSwgLy8gQXJiaXRyYXJ5IHZhbHVlcyBmb3IgdGVzdGluZ1xyXG4gICAgICAgIGNhbkhvbGQ6IGZhbHNlLFxyXG4gICAgICAgIGlzSGVsZDogZmFsc2UsXHJcbiAgICAgICAgY2FuTnVkZ2U6IGZhbHNlLFxyXG4gICAgICAgIGlzTnVkZ2luZzogZmFsc2UsXHJcbiAgICAgICAgbnVkZ2VGcmFtZXM6IElURU1fSEVJR0hUIC8gTlVER0VfU1BFRUQsXHJcbiAgICAgICAgbnVkZ2VGcmFtZTogMCxcclxuICAgICAgICByZWVsSXRlbXM6IFtdLFxyXG4gICAgICAgIHJlZWxObyxcclxuICAgICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbU5vID0gMDtcclxuICAgICAgICAgICAgbGV0IHR5cGU7XHJcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZXM7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZVNyYztcclxuICAgICAgICAgICAgbGV0IHdpbkFtb3VudDtcclxuICAgICAgICAgICAgbGV0IHg7XHJcbiAgICAgICAgICAgIGxldCB5O1xyXG4gICAgICAgICAgICBsZXQgbmV3UmVlbEl0ZW07XHJcblxyXG4gICAgICAgICAgICBJVEVNX0lORk8uZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBpdGVtLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZXMgPSBpdGVtLmluc3RhbmNlcztcclxuICAgICAgICAgICAgICAgIGltYWdlU3JjID0gaXRlbS5pbWFnZVNyYztcclxuICAgICAgICAgICAgICAgIHdpbkFtb3VudCA9IGl0ZW0ud2luQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCByZXF1aXJlZCBubyBvZiBpbnN0YW5jZXMgb2YgdGhpcyBpdGVtIHRvIHRoZSByZWVsSXRlbXMgYXJyYXlcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdGFuY2VzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB4ID0gVklFV1BPUlRfWCArICh0aGlzLnJlZWxObyAqIFJFRUxfV0lEVEgpICsgKHRoaXMucmVlbE5vICogUkVFTF9TUEFDSU5HKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgeSA9IChWSUVXUE9SVF9ZIC0gSVRFTV9IRUlHSFQpIC0gKElURU1fSEVJR0hUICogaXRlbU5vKSAtIDEwMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9ICcuL2ltZy8nICsgaXRlbS5pbWFnZVNyYztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UmVlbEl0ZW0gPSByZWVsSXRlbSh0eXBlLCBpdGVtTm8sIGltZywgeCwgeSwgd2luQW1vdW50KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZWxJdGVtcy5wdXNoKG5ld1JlZWxJdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtTm8rKztcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaHVmZmxlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRDb29yZHMoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNodWZmbGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHJuZDtcclxuICAgICAgICAgICAgbGV0IHRlbXA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnJlZWxJdGVtcy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBybmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcclxuICAgICAgICAgICAgICAgIHRlbXAgPSB0aGlzLnJlZWxJdGVtc1tpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVlbEl0ZW1zW2ldID0gdGhpcy5yZWVsSXRlbXNbcm5kXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVlbEl0ZW1zW3JuZF0gPSB0ZW1wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBudWRnZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm51ZGdlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaGlmdCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5udWRnZUZyYW1lKys7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5udWRnZUZyYW1lID49IHRoaXMubnVkZ2VGcmFtZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNOdWRnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm51ZGdlRnJhbWUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNldENvb3JkczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmVlbEl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZWxJdGVtc1tpXS55ID0gVklFV1BPUlRfWSArIFZJRVdQT1JUX0hFSUdIVCAtIElURU1fSEVJR0hUIC0gKElURU1fSEVJR0hUICogaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc2V0UnVudGltZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNIZWxkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1blRpbWUgPSAoUkVFTF9TUEVFRCAqIDEwKSArICgyMCAqIHJlZWxObyk7IC8vIEFyYml0cmFyeSB2YWx1ZXMgZm9yIHRlc3Rpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNoaWZ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIElmIGJvdHRvbSByZWVsIGl0ZW0gZ2V0cyBiZWxvdyBib3R0b20gb2Ygdmlld3BvcnQgdGhlbiBtb3ZlIGl0IHRvIGJlZ2lubmluZyBvZiBhcnJheVxyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWVsSXRlbXNbMF0ueSA+PSBWSUVXUE9SVF9ZICsgVklFV1BPUlRfSEVJR0hUKSB7XHJcbiAgICAgICAgICAgICAgICBmaXJzdEl0ZW0gPSB0aGlzLnJlZWxJdGVtc1swXTtcclxuICAgICAgICAgICAgICAgIGxhc3RJdGVtID0gdGhpcy5yZWVsSXRlbXNbdGhpcy5yZWVsSXRlbXMubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVzdCB5IGNvb3JkcyBmb3IgaXRlbSB0byBzaGlmdCB0byB0b3Agb2YgcmVlbFxyXG4gICAgICAgICAgICAgICAgZmlyc3RJdGVtLnkgPSBsYXN0SXRlbS55IC0gSVRFTV9IRUlHSFQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2hpZnQgYm90dG9tIGl0ZW0gdG8gdG9wXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZWxJdGVtcy5wdXNoKHRoaXMucmVlbEl0ZW1zLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVlbEl0ZW1zLmZvckVhY2goKHJlZWxJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWVsSXRlbS5tb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIC8vIFJlZHVjZSByZWVsIHJ1bnRpbWVcclxuICAgICAgICAgICAgdGhpcy5ydW5UaW1lLS07XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWVsSXRlbXMuZm9yRWFjaCgocmVlbEl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIHJlZWxJdGVtLnJlbmRlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVlbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21vZHVsZXMvcmVlbC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgVmlld3BvcnQgZnJvbSAnLi9tb2R1bGVzL3ZpZXdwb3J0JztcclxuaW1wb3J0IFJlZWwgZnJvbSAnLi9tb2R1bGVzL3JlZWwnO1xyXG5pbXBvcnQgUmVlbHMgZnJvbSAnLi9tb2R1bGVzL3JlZWxzJztcclxuaW1wb3J0IE51ZGdlQnV0dG9ucyBmcm9tICcuL21vZHVsZXMvbnVkZ2VCdXR0b25zJztcclxuaW1wb3J0IEhvbGRCdXR0b25zIGZyb20gJy4vbW9kdWxlcy9ob2xkQnV0dG9ucyc7XHJcbmltcG9ydCBDcmVkaXRzIGZyb20gJy4vbW9kdWxlcy9jcmVkaXRzJztcclxuaW1wb3J0IFdpbiBmcm9tICcuL21vZHVsZXMvd2luJztcclxuaW1wb3J0IE51ZGdlcyBmcm9tICcuL21vZHVsZXMvbnVkZ2VzJztcclxuLy8gU2Fzc1xyXG5pbXBvcnQgJy4uL3Njc3MvYXBwLnNjc3MnO1xyXG5cclxuLy8gY29uc3Qgdmlld3BvcnRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld3BvcnRDb250YWluZXInKTtcclxuY29uc3Qgdmlld3BvcnQgPSBWaWV3cG9ydCgpO1xyXG4vLyBjb25zdCBzcGluQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwaW5CdXR0b24nKTtcclxuY29uc3Qgd2luQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbicpO1xyXG5jb25zdCBudWRnZXNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbnVkZ2VzJyk7XHJcbmxldCBwbGF5U2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5U2VjdGlvbicpO1xyXG5cclxubGV0IHZpZXdwb3J0Q29udGFpbmVyO1xyXG5sZXQgbnVkZ2VCdXR0b25Db250YWluZXI7XHJcbmxldCBob2xkQnV0dG9uQ29udGFpbmVyO1xyXG5sZXQgd2luSW5kaWNhdG9yTGVmdDtcclxubGV0IHdpbkluZGljYXRvclJpZ2h0O1xyXG5sZXQgd2luSW5kaWNhdG9yQ2VudHJlTGluZTtcclxubGV0IHNwaW5CdXR0b247XHJcbmxldCByZWVscztcclxubGV0IG51ZGdlcztcclxubGV0IG51ZGdlQnV0dG9ucztcclxubGV0IGhvbGRCdXR0b25zO1xyXG5sZXQgbnVkZ2VCdXR0b25MaXN0O1xyXG5sZXQgaG9sZEJ1dHRvbkxpc3Q7XHJcbmxldCBjcmVkaXRzO1xyXG5sZXQgd2luO1xyXG5sZXQgZ2FtZUxvb3A7XHJcbmxldCBudWRnZUNoYW5jZSA9IDI7IC8vIENoYW5jZSBvZiBnZXR0aW5nIG51ZGdlcyBhZnRlciBzcGluICgxIGluIG51ZGdlQ2hhbmNlKVxyXG5sZXQgaG9sZENoYW5jZSA9IDI7IC8vIENoYW5jZSBvZiBnZXR0aW5nIGhvbGRzIGFmdGVyIHNwaW4gKDEgaW4gaG9sZENoYW5jZSlcclxubGV0IGNhblNwaW47XHJcbmxldCBjYW5OdWRnZTtcclxubGV0IGNhbkhvbGQ7XHJcbmxldCBub3c7IC8vIEN1cnJlbnQgdGltZSB0byBjb21wYXJlIGFnYWluc3RcclxubGV0IHJlZWxzUnVubmluZyA9IFtdOyAvLyBLZWVwcyB0cmFjayBvZiBhbnkgcmVlbHMgd2l0aCBydW50aW1lIGxlZnQgb24gdGhlbSB0byBlc3RibGlzaCB3aGV0aGVyIHRvIHJlc2V0L3N0b3Agc3BpbiBldGMuXHJcbmxldCBzcGluVHlwZSA9ICdzcGluJzsgLy8gS2VlcHMgdHJhY2sgb2Ygd2hldGhlciBsYXN0IHNwaW4gd2FzIHJlZ3VsYXIgc3BpbiBvciBudWRnZVxyXG5cclxuY29uc3QgaW5pdCA9ICgpID0+IHtcclxuXHJcbiAgICByZW5kZXJWaWV3cG9ydENvbnRhaW5lcigpO1xyXG5cclxuICAgIC8vIFJlbmRlciB2aWV3cG9ydFxyXG4gICAgdmlld3BvcnQucmVuZGVyKCk7XHJcblxyXG4gICAgLy8gU2V0IHVwIHJlZWxzXHJcbiAgICByZWVscyA9IFJlZWxzKCk7XHJcbiAgICByZWVscy5idWlsZCgpO1xyXG4gICAgcmVlbHMucmVuZGVyKCk7XHJcblxyXG4gICAgbGV0IHJlZWxDb250YWluZXI7XHJcbiAgICBsZXQgcmVlbENvbnRhaW5lclg7XHJcbiAgICBsZXQgcmVlbENvbnRhaW5lclk7XHJcbiAgICBsZXQgcmVlbENvbnRhaW5lclc7XHJcbiAgICBsZXQgcmVlbENvbnRhaW5lckg7XHJcblxyXG4gICAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xyXG4gICAgICAgIC8vIFJlbmRlciBvdXRlciBjb250YWluZXIgZm9yIGVhY2ggcmVlbCBpbiB0aGUgdmlld3BvcnQgY29udGFpbmVyXHJcbiAgICAgICAgcmVlbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICAgICByZWVsQ29udGFpbmVyWCA9IHJlZWwucmVlbEl0ZW1zWzBdLnggKyBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19YIC0gUkVFTF9DT05UQUlORVJfUEFERElORztcclxuXHJcbiAgICAgICAgcmVlbENvbnRhaW5lclkgPSByZWVsLnJlZWxJdGVtc1syXS55ICsgVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWSAtIFJFRUxfQ09OVEFJTkVSX1BBRERJTkc7XHJcblxyXG4gICAgICAgIHJlZWxDb250YWluZXJXID0gUkVFTF9XSURUSCArIChSRUVMX0NPTlRBSU5FUl9QQURESU5HICogMik7XHJcblxyXG4gICAgICAgIHJlZWxDb250YWluZXJIID0gVklFV1BPUlRfSEVJR0hUICsgKFJFRUxfQ09OVEFJTkVSX1BBRERJTkcgKiAyKTtcclxuXHJcbiAgICAgICAgcmVlbENvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgcmVlbENvbnRhaW5lci5zdHlsZS50b3AgPSByZWVsQ29udGFpbmVyWSArICdweCc7XHJcbiAgICAgICAgcmVlbENvbnRhaW5lci5zdHlsZS5sZWZ0ID0gcmVlbENvbnRhaW5lclggKyAncHgnO1xyXG4gICAgICAgIHJlZWxDb250YWluZXIuc3R5bGUud2lkdGggPSByZWVsQ29udGFpbmVyVyArICdweCc7XHJcbiAgICAgICAgcmVlbENvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSByZWVsQ29udGFpbmVySCArICdweCc7XHJcbiAgICAgICAgcmVlbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdyZWVsLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHJlZWxDb250YWluZXIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmVuZGVyV2luSW5kaWNhdG9ycygpO1xyXG5cclxuICAgIHJlbmRlck51ZGdlQnV0dG9uQ29udGFpbmVyKCk7XHJcblxyXG4gICAgLy8gU2V0IHVwIG51ZGdlIGJ1dHRvbnNcclxuICAgIG51ZGdlQnV0dG9ucyA9IE51ZGdlQnV0dG9ucygpO1xyXG4gICAgbnVkZ2VCdXR0b25zLmJ1aWxkKCk7XHJcbiAgICBudWRnZUJ1dHRvbnMucmVuZGVyKCk7XHJcblxyXG4gICAgbnVkZ2VCdXR0b25MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbnVkZ2UtYnV0dG9uJyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBudWRnZUJ1dHRvbkxpc3RbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYW5TcGluICYmIGNhbk51ZGdlICYmIHJlZWxzLnJlZWxMaXN0W2ldLmNhbk51ZGdlID09PSB0cnVlICYmIG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzcGluVHlwZSA9ICdudWRnZSc7XHJcbiAgICAgICAgICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nIC09IDE7XHJcbiAgICAgICAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc051ZGdpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZ2FtZUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZSA9IGdhbWVTdGF0ZXMubnVkZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgdXAgbnVkZ2VzXHJcbiAgICBudWRnZXMgPSBOdWRnZXMoKTtcclxuICAgIG51ZGdlcy5yZW5kZXIoKTtcclxuXHJcbiAgICByZW5kZXJIb2xkQnV0dG9uQ29udGFpbmVyKCk7XHJcblxyXG4gICAgLy8gU2V0IHVwIGhvbGQgYnV0dG9uc1xyXG4gICAgaG9sZEJ1dHRvbnMgPSBIb2xkQnV0dG9ucygpO1xyXG4gICAgaG9sZEJ1dHRvbnMuYnVpbGQoKTtcclxuICAgIGhvbGRCdXR0b25zLnJlbmRlcigpO1xyXG5cclxuICAgIGhvbGRCdXR0b25MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaG9sZC1idXR0b24nKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvbGRCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgIGhvbGRCdXR0b25MaXN0W2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYW5TcGluICYmIGNhbkhvbGQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRvZ2dsZVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRha2UgaG9sZCBvZmZcclxuICAgICAgICAgICAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5yZXNldFJ1bnRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hlbGQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHV0IGhvbGQgb25cclxuICAgICAgICAgICAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLnJ1blRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGVsZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCB1cCBjcmVkaXRzXHJcbiAgICBjcmVkaXRzID0gQ3JlZGl0cygpO1xyXG4gICAgY3JlZGl0cy5yZXNldCgpO1xyXG4gICAgY3JlZGl0cy5yZW5kZXIoKTtcclxuXHJcbiAgICAvLyBTZXQgdXAgd2luIFxyXG4gICAgd2luID0gV2luKCk7XHJcbiAgICB3aW4ucmVzZXQoKTtcclxuICAgIHdpbi5yZW5kZXIoKTtcclxuXHJcbiAgICByZW5kZXJTcGluQnV0dG9uKCk7XHJcblxyXG4gICAgY2FuU3BpbiA9IHRydWU7XHJcbiAgICBjYW5OdWRnZSA9IGZhbHNlO1xyXG4gICAgY2FuSG9sZCA9IGZhbHNlO1xyXG5cclxuICAgIGVuYWJsZVNwaW4oKTtcclxuXHJcbiAgICBzcGluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGlmIChjYW5TcGluKSB7XHJcbiAgICAgICAgICAgIGNyZWRpdHMudXNlQ3JlZGl0KCk7XHJcbiAgICAgICAgICAgIGNyZWRpdHMucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICBkaXNhYmxlTnVkZ2VzKCk7XHJcbiAgICAgICAgICAgIGRpc2FibGVTcGluKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGhvbGQgYnV0dG9ucyB0aGF0IGFyZW4ndCBoZWxkXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVlbHMucmVlbExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVlbHMucmVlbExpc3RbaV0uaXNIZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0uY2FuSG9sZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGhvbGRCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzcGluVHlwZSA9ICdzcGluJztcclxuICAgICAgICAgICAgZ2FtZVN0YXRlcy5jdXJyZW50U3RhdGUgPSBnYW1lU3RhdGVzLnNwaW47XHJcbiAgICAgICAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICAgICAgICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJOdWRnZUJ1dHRvbkNvbnRhaW5lciA9ICgpID0+IHtcclxuICAgIG51ZGdlQnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBudWRnZUJ1dHRvbkNvbnRhaW5lci5pZCA9ICdudWRnZUJ1dHRvbnMnO1xyXG4gICAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQobnVkZ2VCdXR0b25Db250YWluZXIpO1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJIb2xkQnV0dG9uQ29udGFpbmVyID0gKCkgPT4ge1xyXG4gICAgaG9sZEJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaG9sZEJ1dHRvbkNvbnRhaW5lci5pZCA9ICdob2xkQnV0dG9ucyc7XHJcbiAgICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZChob2xkQnV0dG9uQ29udGFpbmVyKTtcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU3BpbkJ1dHRvbiA9ICgpID0+IHtcclxuICAgIHNwaW5CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHNwaW5CdXR0b24uaWQgPSAnc3BpbkJ1dHRvbic7XHJcbiAgICBzcGluQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicpO1xyXG4gICAgc3BpbkJ1dHRvbi5pbm5lckhUTUwgPSAnU1BJTic7XHJcbiAgICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZChzcGluQnV0dG9uKTtcclxufVxyXG5cclxuY29uc3QgcmVuZGVyVmlld3BvcnRDb250YWluZXIgPSAoKSA9PiB7XHJcbiAgICAvLyBSZW5kZXIgdmlld3BvcnQgY29udGFpbmVyXHJcbiAgICB2aWV3cG9ydENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdmlld3BvcnRDb250YWluZXIuaWQgPSAndmlld3BvcnRDb250YWluZXInO1xyXG4gICAgdmlld3BvcnRDb250YWluZXIuc3R5bGUucGFkZGluZ0xlZnQgPSBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19YICsgJ3B4JztcclxuICAgIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdSaWdodCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1ggKyAncHgnO1xyXG4gICAgdmlld3BvcnRDb250YWluZXIuc3R5bGUucGFkZGluZ1RvcCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1kgKyAncHgnO1xyXG4gICAgdmlld3BvcnRDb250YWluZXIuc3R5bGUucGFkZGluZ0JvdHRvbSA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1kgKyAncHgnO1xyXG4gICAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQodmlld3BvcnRDb250YWluZXIpO1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJXaW5JbmRpY2F0b3JzID0gKCkgPT4ge1xyXG4gICAgLy8gTGVmdCBpbmRpY2F0b3JcclxuICAgIHdpbkluZGljYXRvckxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICB3aW5JbmRpY2F0b3JMZWZ0LmNsYXNzTGlzdC5hZGQoJ3dpbi1pbmRpY2F0b3InLCAnbGVmdCcpO1xyXG4gICAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yTGVmdCk7XHJcbiAgICAvLyBSaWdodCBpbmRpY2F0b3JcclxuICAgIHdpbkluZGljYXRvclJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgd2luSW5kaWNhdG9yUmlnaHQuY2xhc3NMaXN0LmFkZCgnd2luLWluZGljYXRvcicsICdyaWdodCcpO1xyXG4gICAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yUmlnaHQpO1xyXG4gICAgLy8gQ2VudHJlIGxpbmVcclxuICAgIHdpbkluZGljYXRvckNlbnRyZUxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHdpbkluZGljYXRvckNlbnRyZUxpbmUuY2xhc3NMaXN0LmFkZCgnd2luLWluZGljYXRvci1jZW50cmUtbGluZScpO1xyXG5cclxuICAgIHdpbkluZGljYXRvckNlbnRyZUxpbmUuc3R5bGUubGVmdCA9IHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggKyAncHgnO1xyXG5cclxuICAgIHdpbkluZGljYXRvckNlbnRyZUxpbmUuc3R5bGUud2lkdGggPSB2aWV3cG9ydENvbnRhaW5lci5vZmZzZXRXaWR0aCAtIHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggLSB3aW5JbmRpY2F0b3JSaWdodC5vZmZzZXRXaWR0aCArICdweCc7XHJcblxyXG4gICAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yQ2VudHJlTGluZSk7XHJcbn1cclxuXHJcbmNvbnN0IGxvb3AgPSAoY3VycmVudFRpbWUpID0+IHtcclxuICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApOyAvLyBOZWVkcyB0byBnbyBiZWZvcmUgbGluZSBiZWxvdyB0byBrZWVwIGFuaW1hdGlvbmZyYW1laWQgdXAgdG8gZGF0ZVxyXG4gICAgZ2FtZVN0YXRlcy5jdXJyZW50U3RhdGUoY3VycmVudFRpbWUpO1xyXG59O1xyXG5cclxuY29uc3QgbW92ZVJlZWxzID0gKCkgPT4ge1xyXG4gICAgcmVlbHMubW92ZSgpO1xyXG59O1xyXG5cclxuY29uc3QgcmVuZGVyID0gKCkgPT4ge1xyXG4gICAgdmlld3BvcnQuY2xlYXIoKTtcclxuICAgIHJlZWxzLnJlbmRlcigpO1xyXG5cclxuICAgIC8vIERpZ2l0c1xyXG4gICAgbnVkZ2VzLnJlbmRlcigpO1xyXG4gICAgY3JlZGl0cy5yZW5kZXIoKTtcclxuICAgIHdpbi5yZW5kZXIoKTtcclxufTtcclxuXHJcbi8vIENhbGN1bGF0ZXMgd2luIGFtb3VudCwgaWYgd2lubmluZyBsaW5lXHJcbmNvbnN0IGNoZWNrV2luID0gKCkgPT4ge1xyXG4gICAgbGV0IHNwaW5SZXN1bHQgPSBbXTsgLy8gQXJyYXkgb2YgcmVlbCByZXN1bHRzIGFmdGVyIHNwaW4gKGFsbCB0aHJlZSB2aXNpYmxlIG9iamVjdHMgb2YgZWFjaCByZWVsKVxyXG4gICAgbGV0IHNwaW5SZXN1bHRGaWx0ZXJlZCA9IFtdOyAvLyBBcnJheSBvZiByZXN1bHRzIHRoYXQgZG9uJ3QgbWF0Y2ggZmlyc3QgcmVlbFxyXG4gICAgbGV0IHJlZWxSZXN1bHQ7IC8vIEluZGl2aWR1YWwgcmVlbCByZXN1bHQsIG1hZGUgb2YgdGhyZWUgb2JqZWN0cyAodmlzaWJsZSlcclxuICAgIGxldCBjb21wYXJlSXRlbTsgLy8gTWlkZGxlIGl0ZW0gb24gcmVlbCBvbmUgdG8gY29tcGFyZVxyXG5cclxuICAgIC8vIENoZWNrIGZvciB3aW5cclxuICAgIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgcmVlbFJlc3VsdCA9IFtdOyAvLyBSZXN1bHQgb2YgaW5kaXZpZHVhbCByZWVsXHJcblxyXG4gICAgICAgIHJlZWxSZXN1bHQucHVzaChyZWVscy5yZWVsTGlzdFtpbmRleF0ucmVlbEl0ZW1zWzBdKTtcclxuICAgICAgICByZWVsUmVzdWx0LnB1c2gocmVlbHMucmVlbExpc3RbaW5kZXhdLnJlZWxJdGVtc1sxXSk7XHJcbiAgICAgICAgcmVlbFJlc3VsdC5wdXNoKHJlZWxzLnJlZWxMaXN0W2luZGV4XS5yZWVsSXRlbXNbMl0pO1xyXG5cclxuICAgICAgICBzcGluUmVzdWx0LnB1c2gocmVlbFJlc3VsdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBUYWtlIG1pZGRsZSBpdGVtIG9uIGZpcnN0IHJlZWxcclxuICAgIGNvbXBhcmVJdGVtID0gc3BpblJlc3VsdFswXVsxXTtcclxuXHJcbiAgICAvLyBGaWx0ZXIgb3V0IGFueSBpdGVtcyB0aGF0IGRvbid0IG1hdGNoXHJcbiAgICBzcGluUmVzdWx0RmlsdGVyZWQgPSBzcGluUmVzdWx0LmZpbHRlcigocmVlbCkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZWVsWzFdLnR5cGUgIT09IGNvbXBhcmVJdGVtLnR5cGU7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBJZiBzcGluUmVzdWx0RmlsdGVyZWQgaXMgZW1wdHksIGFsbCB0aGUgaXRlbXMgbWF0Y2ggKHdpbm5pbmcgbGluZSlcclxuICAgIGlmICghc3BpblJlc3VsdEZpbHRlcmVkLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBjb21wYXJlSXRlbS53aW5BbW91bnQ7IC8vIFJldHVybiB3aW5uaW5nIGFtb3VudFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFJhbmRvbWx5IGFzc2lnbiBudWRnZXNcclxuY29uc3QgYXNzaWduTnVkZ2VzID0gKCkgPT4ge1xyXG4gICAgLy8gUmFuZG9tbHkgYXNzaWduIG51ZGdlc1xyXG4gICAgY29uc3QgbnVkZ2VSYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBudWRnZUNoYW5jZSArIDEpO1xyXG5cclxuICAgIC8vIElmIHJhbmRvbSBjaGFuY2UgaXMgbWV0IHRoZW4gYXNzaWduIG51ZGdlc1xyXG4gICAgaWYgKG51ZGdlUmFuZG9tID09PSBudWRnZUNoYW5jZSkge1xyXG4gICAgICAgIGNhbk51ZGdlID0gdHJ1ZTtcclxuICAgICAgICBlbmFibGVOdWRnZXMoKTtcclxuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nID0gNTtcclxuICAgICAgICBudWRnZXMucmVuZGVyKCk7XHJcblxyXG4gICAgfSBlbHNlIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkgeyAvLyBJZiBubyBudWRnZXMgbGVmdCBpbiBiYW5rXHJcbiAgICAgICAgY2FuTnVkZ2UgPSBmYWxzZTtcclxuICAgICAgICBkaXNhYmxlTnVkZ2VzKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFJhbmRvbWx5IGFzc2lnbiBob2xkc1xyXG5jb25zdCBhc3NpZ25Ib2xkcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGhvbGRSYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBob2xkQ2hhbmNlICsgMSk7XHJcblxyXG4gICAgLy8gUmFuZG9tbHkgYXNzaWduIGhvbGRzIChpZiBubyBudWRnZXMgbGVmdCBpbiBiYW5rKVxyXG4gICAgLy8gQXNzaWduIGhvbGQgaWYgcmFuZG9tIG51bWJlciBtZXQgYW5kIGxhc3Qgc3BpbiB3YXNuJ3QgYSB3aW5cclxuICAgIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkge1xyXG4gICAgICAgIGlmIChob2xkUmFuZG9tID09PSBob2xkQ2hhbmNlKSB7XHJcbiAgICAgICAgICAgIC8vIENhbiBob2xkXHJcbiAgICAgICAgICAgIGNhbkhvbGQgPSB0cnVlO1xyXG4gICAgICAgICAgICBidXR0b25TdHlsZXMoaG9sZEJ1dHRvbkxpc3QsICdhZGQnLCAnYWN0aXZlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FuSG9sZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBidXR0b25TdHlsZXMoaG9sZEJ1dHRvbkxpc3QsICdyZW1vdmUnLCAnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGJ1dHRvblN0eWxlcyhob2xkQnV0dG9uTGlzdCwgJ3JlbW92ZScsICdoZWxkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBFbmFibGUgYWxsIG51ZGdlc1xyXG5jb25zdCBlbmFibGVOdWRnZXMgPSAoKSA9PiB7XHJcbiAgICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XHJcbiAgICAgICAgLy8gSWYgdGhlIHJlZWwgaXNuJ3QgaGVsZFxyXG4gICAgICAgIGlmICghcmVlbC5pc0hlbGQpIHtcclxuICAgICAgICAgICAgcmVlbC5jYW5OdWRnZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvLyBJZiB0aGUgcmVlbCBpc24ndCBoZWxkXHJcbiAgICAgICAgaWYgKCFyZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQpIHtcclxuICAgICAgICAgICAgbnVkZ2VCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBudWRnZXNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbn1cclxuXHJcbi8vIEVuYmFsZSBhbGwgaG9sZHNcclxuY29uc3QgZW5hYmxlSG9sZHMgPSAoKSA9PiB7XHJcbiAgICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XHJcbiAgICAgICAgcmVlbC5jYW5Ib2xkID0gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG9sZEJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBob2xkQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBjYW5ob2xkID0gdHJ1ZTtcclxufVxyXG5cclxuLy8gRGlzYWJsZSBhbGwgbnVkZ2VzXHJcbmNvbnN0IGRpc2FibGVOdWRnZXMgPSAoKSA9PiB7XHJcbiAgICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XHJcbiAgICAgICAgcmVlbC5jYW5OdWRnZSA9IGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBudWRnZUJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgbnVkZ2VzLnJlc2V0KCk7XHJcblxyXG4gICAgY2FuTnVkZ2UgPSBmYWxzZTtcclxuXHJcbiAgICBudWRnZXNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbn1cclxuXHJcbi8vIERpc2FibGUgYWxsIGhvbGRzXHJcbmNvbnN0IGRpc2FibGVIb2xkcyA9ICgpID0+IHtcclxuICAgIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcclxuICAgICAgICByZWVsLmNhbkhvbGQgPSBmYWxzZTtcclxuICAgICAgICByZWVsLmlzSGVsZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChyZWVsLnJ1blRpbWUgPCAxKSB7XHJcbiAgICAgICAgICAgIHJlZWwucmVzZXRSdW50aW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBob2xkQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGhvbGRCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScsICdoZWxkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuSG9sZCA9IGZhbHNlO1xyXG59XHJcblxyXG4vLyBFbmFibGUgc3BpblxyXG5jb25zdCBlbmFibGVTcGluID0gKCkgPT4ge1xyXG4gICAgc3BpbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIGNhblNwaW4gPSB0cnVlO1xyXG59XHJcblxyXG4vLyBEaXNiYWxlIHNwaW5cclxuY29uc3QgZGlzYWJsZVNwaW4gPSAoKSA9PiB7XHJcbiAgICBzcGluQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgY2FuU3BpbiA9IGZhbHNlO1xyXG59XHJcblxyXG4vLyBBZGQgb3IgcmVtb3ZlIGdyb3VwIGJ1dHRvbiBzdHlsZXNcclxuY29uc3QgYnV0dG9uU3R5bGVzID0gKGJ1dHRvbkxpc3QsIGFkZFJlbW92ZSwgY2xhc3NOYW1lKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYWRkUmVtb3ZlID09PSAnYWRkJykge1xyXG4gICAgICAgICAgICBidXR0b25MaXN0W2ldLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFkZFJlbW92ZSA9PT0gJ3JlbW92ZScpIHtcclxuICAgICAgICAgICAgYnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLy8gR2FtZSBzdGF0ZVxyXG5jb25zdCBnYW1lU3RhdGVzID0ge1xyXG4gICAgY3VycmVudFN0YXRlOiBudWxsLFxyXG4gICAgd2luQW1vdW50OiAwLFxyXG4gICAgb2xkV2luRGlzcGxheTogMCwgLy8gV2hlbiBsb29waW5nIHRocm91Z2ggd2luIGluY3JlbWVudCAtIHRoaXMgaXMgdGhlIG9yaWdpbmFsIGZpZ3VyZVxyXG4gICAgY3VycmVudFdpbkRpc3BsYXk6IDAsIC8vIFdoZW4gbG9vcGluZyB0aHJvdWdoIHdpbiBhbW91bnQgLSB0aGlzIGlzIHRoZSBuZXcgZmlndXJlXHJcblxyXG4gICAgLy8gUmVndWxhciBzcGluXHJcbiAgICBzcGluOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zcGluVHlwZSA9ICdzcGluJztcclxuICAgICAgICBkaXNhYmxlU3BpbigpO1xyXG4gICAgICAgIG1vdmVSZWVscygpO1xyXG4gICAgICAgIHJlbmRlcigpO1xyXG5cclxuICAgICAgICAvLyBGaWx0ZXIgcmVlbCBydW50aW1lcyAtIGlmIG9uZSBpcyBhYm92ZSB6ZXJvIHRoZW4gY2Fycnkgb25cclxuICAgICAgICByZWVsc1J1bm5pbmcgPSByZWVscy5yZWVsTGlzdC5maWx0ZXIoKHJlZWwpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlZWwucnVuVGltZSA+IDA7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghcmVlbHNSdW5uaW5nLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuc3BpbkZpbmlzaGVkO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBTcGluIGZpbmlzaGVkXHJcbiAgICBzcGluRmluaXNoZWQ6IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xyXG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcclxuXHJcbiAgICAgICAgaWYgKG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPCAxKSB7XHJcbiAgICAgICAgICAgIGRpc2FibGVOdWRnZXMoKTtcclxuICAgICAgICAgICAgaWYgKHNwaW5UeXBlICE9PSAnbnVkZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlSG9sZHMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHdpblxyXG4gICAgICAgIGNvbnN0IHdpbiA9IGNoZWNrV2luKCk7XHJcblxyXG4gICAgICAgIC8vIFdpblxyXG4gICAgICAgIGlmICh3aW4pIHtcclxuICAgICAgICAgICAgLy8gUmVzZXQgbnVkZ2VzXHJcbiAgICAgICAgICAgIG51ZGdlcy5yZXNldCgpO1xyXG4gICAgICAgICAgICBjYW5OdWRnZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBkaXNhYmxlTnVkZ2VzKCk7XHJcbiAgICAgICAgICAgIGRpc2FibGVIb2xkcygpO1xyXG4gICAgICAgICAgICBkaXNhYmxlU3BpbigpO1xyXG5cclxuICAgICAgICAgICAgbm93ID0gY3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMud2luQW1vdW50ID0gd2luO1xyXG5cclxuICAgICAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy53aW47IC8vIFN3aXRjaCB0byB3aW4gYW5pbWF0aW9uIHN0YXRlXHJcbiAgICAgICAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBObyB3aW5cclxuICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSAmJiBzcGluVHlwZSAhPT0gJ251ZGdlJyAmJiBjcmVkaXRzLmNyZWRpdHNSZW1haW5pbmcgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBubyB3aW5uaW5nIGxpbmUgdGhlbiBhc3NpZ24gaG9sZHMgYW5kIG51ZGdlc1xyXG4gICAgICAgICAgICAgICAgYXNzaWduSG9sZHMoKTtcclxuICAgICAgICAgICAgICAgIGFzc2lnbk51ZGdlcygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBFbmFibGUgc3BpblxyXG4gICAgICAgICAgICBlbmFibGVTcGluKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgY3JlZGl0c1xyXG4gICAgICAgICAgICBpZiAoY3JlZGl0cy5jcmVkaXRzUmVtYWluaW5nID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2FtZU92ZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICAvLyBOdWRnZVxyXG4gICAgbnVkZ2U6IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xyXG4gICAgICAgIGxldCBpc051ZGdpbmcgPSBbXTtcclxuICAgICAgICAvLyBJZiBudWRnaW5nIHN0b3BwZWQsIHRoZW4gY2hhbmdlIGdhbWVzdGF0ZSB0byBzcGluZmluaXNoZWRcclxuICAgICAgICBpc051ZGdpbmcgPSByZWVscy5yZWVsTGlzdC5maWx0ZXIoKHJlZWwpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlZWwuaXNOdWRnaW5nID09PSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIWlzTnVkZ2luZy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5GaW5pc2hlZChjdXJyZW50VGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc051ZGdpbmcuZm9yRWFjaCgocmVlbCkgPT4ge1xyXG4gICAgICAgICAgICByZWVsLm51ZGdlKCk7XHJcbiAgICAgICAgICAgIHJlbmRlcigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcbiAgICAvLyBXaW4gYW5pbWF0aW9uXHJcbiAgICB3aW46IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xyXG4gICAgICAgIHdpbkluZGljYXRvckNlbnRyZUxpbmUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgd2luQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuXHJcbiAgICAgICAgZGlzYWJsZVNwaW4oKTtcclxuICAgICAgICBkaXNhYmxlSG9sZHMoKTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lIC0gbm93ID4gNTApIHtcclxuICAgICAgICAgICAgbm93ID0gY3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFdpbkRpc3BsYXkgKz0gMTtcclxuICAgICAgICAgICAgd2luLmN1cnJlbnRXaW4gPSB0aGlzLmN1cnJlbnRXaW5EaXNwbGF5O1xyXG4gICAgICAgICAgICB3aW4ucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50V2luRGlzcGxheSAtIHRoaXMub2xkV2luRGlzcGxheSA9PT0gdGhpcy53aW5BbW91bnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIEZpbmlzaGVkIGxvb3BpbmdcclxuICAgICAgICAgICAgICAgIHRoaXMub2xkV2luRGlzcGxheSA9IHRoaXMuY3VycmVudFdpbkRpc3BsYXk7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVTcGluKCk7XHJcbiAgICAgICAgICAgICAgICB3aW5Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB2aWV3cG9ydENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHdpbkluZGljYXRvckxlZnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB3aW5JbmRpY2F0b3JSaWdodC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHdpbkluZGljYXRvckNlbnRyZUxpbmUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgY3JlZGl0c1xyXG4gICAgICAgICAgICAgICAgaWYgKGNyZWRpdHMuY3JlZGl0c1JlbWFpbmluZyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nYW1lT3ZlcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIEdhbWUgb3ZlciAtIGNyZWRpdHMgcmFuIG91dFxyXG4gICAgZ2FtZU92ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XHJcbiAgICAgICAgZGlzYWJsZVNwaW4oKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocGxheVNlY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgZGlzYWJsZU51ZGdlcygpO1xyXG4gICAgICAgICAgICBkaXNhYmxlSG9sZHMoKTtcclxuXHJcbiAgICAgICAgICAgIHJlbmRlckdhbWVPdmVyU2VjdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm9sZFdpbkRpc3BsYXkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW5EaXNwbGF5ID0gMDtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IHJlbmRlckdhbWVPdmVyU2VjdGlvbiA9ICgpID0+IHtcclxuICAgIGNvbnN0IGdhbWVPdmVyU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZ2FtZU92ZXJTZWN0aW9uLmlkID0gJ2dhbWVPdmVyU2VjdGlvbic7XHJcblxyXG4gICAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCA9ICc8ZGl2Pic7XHJcbiAgICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MICs9ICc8cD5HYW1lIG92ZXI8L3A+JztcclxuICAgIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gJzxwPllvdSB3b24gJyArIHdpbi5jdXJyZW50V2luICsgJyBjcmVkaXRzJztcclxuICAgIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gJzxwPlByZXNzIHN0YXJ0IHRvIHBsYXkgYWdhaW48L3A+J1xyXG4gICAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCArPSAnPC9kaXY+JztcclxuXHJcbiAgICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgc3RhcnRCdXR0b24uaWQgPSAnc3RhcnRCdXR0b24nO1xyXG4gICAgc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XHJcbiAgICBzdGFydEJ1dHRvbi5pbm5lclRleHQgPSAnU1RBUlQnO1xyXG5cclxuICAgIGdhbWVPdmVyU2VjdGlvbi5hcHBlbmRDaGlsZChzdGFydEJ1dHRvbik7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChnYW1lT3ZlclNlY3Rpb24pO1xyXG5cclxuICAgIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZ2FtZU92ZXJTZWN0aW9uKTtcclxuXHJcbiAgICAgICAgcGxheVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBwbGF5U2VjdGlvbi5pZCA9ICdwbGF5U2VjdGlvbic7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwbGF5U2VjdGlvbik7XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuLy8gUHJlbG9hZCBpbWFnZXMgdGhlbiBzdGFydCBnYW1lXHJcbnZhciBsb2FkZWQgPSAwO1xyXG52YXIgaW1hZ2VMaXN0ID0gW107XHJcbmxldCBpbWc7XHJcblxyXG5JVEVNX0lORk8uZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWcuc3JjID0gJy4vaW1nLycgKyBpdGVtLmltYWdlU3JjO1xyXG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICBsb2FkZWQrKztcclxuICAgICAgICBpZiAobG9hZGVkID09PSBJVEVNX0lORk8ubGVuZ3RoKSBpbml0KCk7XHJcbiAgICB9O1xyXG59KTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHZpZXdwb3J0ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbmV3Vmlld3BvcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgIG5ld1ZpZXdwb3J0LndpZHRoID0gVklFV1BPUlRfV0lEVEg7XHJcbiAgICBuZXdWaWV3cG9ydC5oZWlnaHQgPSBWSUVXUE9SVF9IRUlHSFQ7XHJcbiAgICBuZXdWaWV3cG9ydC5pZCA9IFwidmlld3BvcnRcIjtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHZpZXdwb3J0OiBuZXdWaWV3cG9ydCxcclxuICAgICAgICB3aWR0aDogVklFV1BPUlRfV0lEVEgsXHJcbiAgICAgICAgaGVpZ2h0OiBWSUVXUE9SVF9IRUlHSFQsXHJcbiAgICAgICAgY3R4OiBuZXdWaWV3cG9ydC5nZXRDb250ZXh0KCcyZCcpLFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3cG9ydENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3cG9ydENvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnZpZXdwb3J0KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdmlld3BvcnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9tb2R1bGVzL3ZpZXdwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBjdHggZnJvbSAnLi9jdHgnO1xyXG5cclxuY29uc3QgcmVlbEl0ZW0gPSAodHlwZSwgaXRlbU5vLCBpbWcsIHgsIHksIHdpbkFtb3VudCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlLFxyXG4gICAgICAgIGl0ZW1ObyxcclxuICAgICAgICBpbWcsXHJcbiAgICAgICAgeCxcclxuICAgICAgICB5LFxyXG4gICAgICAgIHdpbkFtb3VudCxcclxuICAgICAgICBzcGVlZDogUkVFTF9TUEVFRCxcclxuICAgICAgICBudWRnZVNwZWVkOiBOVURHRV9TUEVFRCxcclxuICAgICAgICBjdHg6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3cG9ydCcpLmdldENvbnRleHQoJzJkJyksXHJcbiAgICAgICAgbW92ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbnVkZ2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy5udWRnZVNwZWVkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmltZywgMCwgMCwgSVRFTV9XSURUSCwgSVRFTV9IRUlHSFQsIHRoaXMueCwgdGhpcy55LCBJVEVNX1dJRFRILCBJVEVNX0hFSUdIVCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlZWxJdGVtO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbW9kdWxlcy9yZWVsSXRlbS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBjdHggPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGN0eDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21vZHVsZXMvY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCByZWVsIGZyb20gJy4vcmVlbCc7XHJcblxyXG5jb25zdCByZWVscyA9ICgpID0+IHtcclxuICAgIGxldCBuZXdSZWVsO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZWVsTGlzdDogW10sXHJcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOT19SRUVMUzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdSZWVsID0gcmVlbChpKTtcclxuICAgICAgICAgICAgICAgIG5ld1JlZWwuYnVpbGQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVlbExpc3QucHVzaChuZXdSZWVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW92ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWVsLnJ1blRpbWUgPiAwICYmICFyZWVsLmlzSGVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZWwubW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc2V0UnVudGltZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWVsLnJlc2V0UnVudGltZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlZWwucmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlZWxzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbW9kdWxlcy9yZWVscy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgbnVkZ2VCdXR0b24gZnJvbSAnLi9udWRnZUJ1dHRvbic7XHJcblxyXG5jb25zdCBudWRnZUJ1dHRvbnMgPSAoKSA9PiB7XHJcbiAgICBsZXQgbmV3QnV0dG9uO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYnV0dG9uTGlzdDogW10sXHJcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5PX1JFRUxTOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG5ld0J1dHRvbiA9IG51ZGdlQnV0dG9uKGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LnB1c2gobmV3QnV0dG9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGJ0bi5yZW5kZXIoaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbnVkZ2VCdXR0b25zO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbW9kdWxlcy9udWRnZUJ1dHRvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgbnVkZ2VCdXR0b24gPSAoaW5kZXgpID0+IHtcclxuICAgIGxldCBudWRnZUJ1dHRvbjtcclxuICAgIGxldCBudWRnZUJ1dHRvbkNvbnRhaW5lcjtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ251ZGdlQnV0dG9ucycpLFxyXG4gICAgICAgIHJlZWxObzogaW5kZXgsXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLmlubmVySFRNTCA9ICdOVURHRSc7XHJcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ251ZGdlLWJ1dHRvbicsICdidXR0b24nKTtcclxuICAgICAgICAgICAgbnVkZ2VCdXR0b24uc3R5bGUud2lkdGggPSBCVVRUT05fV0lEVEggKyAncHgnO1xyXG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5zdHlsZS5tYXJnaW5MZWZ0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcclxuICAgICAgICAgICAgbnVkZ2VCdXR0b24uc3R5bGUubWFyZ2luUmlnaHQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChudWRnZUJ1dHRvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG51ZGdlQnV0dG9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbW9kdWxlcy9udWRnZUJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgaG9sZEJ1dHRvbiBmcm9tICcuL2hvbGRCdXR0b24nO1xyXG5cclxuY29uc3QgaG9sZEJ1dHRvbnMgPSAoKSA9PiB7XHJcbiAgICBsZXQgbmV3QnV0dG9uO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYnV0dG9uTGlzdDogW10sXHJcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOT19SRUVMUzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24gPSBob2xkQnV0dG9uKGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LnB1c2gobmV3QnV0dG9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uTGlzdC5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4ucmVuZGVyKGluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhvbGRCdXR0b25zO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbW9kdWxlcy9ob2xkQnV0dG9ucy5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBob2xkQnV0dG9uID0gKGluZGV4KSA9PiB7XHJcbiAgICBsZXQgaG9sZEJ1dHRvbjtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvbGRCdXR0b25zJyksXHJcbiAgICAgICAgcmVlbE5vOiBpbmRleCxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaG9sZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBob2xkQnV0dG9uLmlubmVySFRNTCA9ICdIT0xEJztcclxuICAgICAgICAgICAgaG9sZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdob2xkLWJ1dHRvbicsICdidXR0b24nKTtcclxuICAgICAgICAgICAgaG9sZEJ1dHRvbi5zdHlsZS53aWR0aCA9IEJVVFRPTl9XSURUSCArICdweCc7XHJcbiAgICAgICAgICAgIGhvbGRCdXR0b24uc3R5bGUubWFyZ2luTGVmdCA9IChSRUVMX1NQQUNJTkcgLyAyKSArICgoUkVFTF9XSURUSCAtIEJVVFRPTl9XSURUSCkgLyAyKSArICdweCc7XHJcbiAgICAgICAgICAgIGhvbGRCdXR0b24uc3R5bGUubWFyZ2luUmlnaHQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChob2xkQnV0dG9uKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaG9sZEJ1dHRvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21vZHVsZXMvaG9sZEJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IGRpZ2l0cyBmcm9tICcuL2RpZ2l0cyc7XHJcblxyXG5jb25zdCBjcmVkaXRzID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVkaXRzUmVtYWluaW5nOiBDUkVESVRTLFxyXG4gICAgICAgIGRpZ2l0czogZGlnaXRzKCksXHJcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlZGl0cycpLFxyXG4gICAgICAgIHVzZUNyZWRpdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWRpdHNSZW1haW5pbmctLTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlZGl0c1JlbWFpbmluZyA9IENSRURJVFM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5kaWdpdHMuZGlnaXRzU3RyaW5nID0gdGhpcy5jcmVkaXRzUmVtYWluaW5nLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xyXG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlZGl0cztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21vZHVsZXMvY3JlZGl0cy5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IGRpZ2l0cyBmcm9tICcuL2RpZ2l0cyc7XHJcblxyXG5jb25zdCB3aW4gPSAoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGN1cnJlbnRXaW46IDAsXHJcbiAgICAgICAgZGlnaXRzOiBkaWdpdHMoKSxcclxuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW4nKSxcclxuICAgICAgICBhZGRXaW46IGZ1bmN0aW9uKHdpbkFtb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW4gKz0gd2luQW1vdW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW4gPSAwO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5kaWdpdHMuZGlnaXRzU3RyaW5nID0gdGhpcy5jdXJyZW50V2luLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xyXG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2luO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbW9kdWxlcy93aW4uanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBkaWdpdHMgZnJvbSAnLi9kaWdpdHMnO1xyXG5cclxuY29uc3QgbnVkZ2VzID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBudWRnZXNSZW1haW5pbmc6IDAsXHJcbiAgICAgICAgZGlnaXRzOiBkaWdpdHMoKSxcclxuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudWRnZXMnKSxcclxuICAgICAgICByZXNldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMubnVkZ2VzUmVtYWluaW5nID0gMDtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmRpZ2l0c1N0cmluZyA9IHRoaXMubnVkZ2VzUmVtYWluaW5nLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xyXG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbnVkZ2VzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbW9kdWxlcy9udWRnZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zY3NzL2FwcC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9