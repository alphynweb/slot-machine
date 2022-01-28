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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reelItem__ = __webpack_require__(6);




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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__winline__ = __webpack_require__(3);




const winlines = () => {
    return {
        winLinesList: [],
        itemInfoSorted: ITEM_INFO.sort((a, b) => {
            return a.winAmount < b.winAmount ? -1 : 1;
        }),
        build: function () {
            let newWinLine;
            this.itemInfoSorted.forEach((itemInfo) => {
                newWinLine = Object(__WEBPACK_IMPORTED_MODULE_0__winline__["a" /* default */])(itemInfo);
                newWinLine.build();
                this.winLinesList.push(newWinLine);
            });
        },
        displayWin: function(type) {
            // Find approprite win line out of winLinesList (that corresponds to type)
            const winningLine = this.winLinesList.find(winLine => winLine.type === type);
            winningLine.displayWin();
        },
        removeWins: function() {
            this.winLinesList.forEach(winLine => winLine.removeWin()); 
        },
        render: function () {
            this.winLinesList.forEach((winLine) => {
                winLine.render();
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (winlines);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const winline = (itemInfo) => {
    let imageSrc;
    let type;
    let winAmount;
    let winLineItem;
    let winLineWinAmount;
    let winLineAmountContent;
    return {
        container: document.getElementById('winLines'),
        winLine: null,
        build: function () {
            this.type = itemInfo.type;
            this.imageSrc = itemInfo.imageSrc;
            this.winAmount = itemInfo.winAmount;
        },
        displayWin: function() {
            this.winLine.classList.add('active');
        },
        removeWin: function() {
            this.winLine.classList.remove('active');
        },
        render: function () {
            this.winLine = document.createElement('div');
            this.winLine.classList.add('winline');

            // Build images
            for (let i = 0; i < NO_REELS; i++) {
                winLineItem = document.createElement('img');
                winLineItem.src = './img/' + this.imageSrc;
                this.winLine.appendChild(winLineItem);
            };

            // Build win amount
            winLineWinAmount = document.createElement('div');
            winLineWinAmount.classList.add('win-amount');

            winLineAmountContent = document.createElement('span');
            winLineAmountContent.innerHTML = this.winAmount;

            winLineWinAmount.appendChild(winLineAmountContent);
            this.winLine.appendChild(winLineWinAmount);


            this.container.appendChild(this.winLine);
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (winline);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_viewport__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_reel__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_reels__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_nudgeButtons__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_holdButtons__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_credits__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_win__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_nudges__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_winlines__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__scss_app_scss__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__scss_app_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__scss_app_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modules_winline__ = __webpack_require__(3);









// Sass




const viewport = Object(__WEBPACK_IMPORTED_MODULE_0__modules_viewport__["a" /* default */])();
const winContainer = document.getElementById('win');
const nudgesContainer = document.getElementById('nudges');
let playSection = document.getElementById('playSection');

let canvasViewport;
let canvasViewportW;
let canvasViewportH;
let viewportContainer;
let viewportContainerW;
let viewportContainerH;
let winCentreLine = document.getElementById('winCentreLine');
let spinButton = document.getElementById('spinButton');
let reels;
let nudges;
let nudgeButtons;
let holdButtons;
let nudgeButtonList;
let holdButtonContainerList;
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

const init = () => {

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

    viewportContainer = document.getElementById('viewportContainer');
    viewportContainerW = viewportContainer.getBoundingClientRect().width;
    viewportContainerH = viewportContainer.getBoundingClientRect().height;

    canvasViewport = document.getElementById('viewport');
    canvasViewportW = canvasViewport.getBoundingClientRect().width;
    canvasViewportH = canvasViewport.getBoundingClientRect().height;


    // Render Reel Containers
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

    // Set up hold buttons
    holdButtons = Object(__WEBPACK_IMPORTED_MODULE_4__modules_holdButtons__["a" /* default */])();
    holdButtons.build();
    holdButtons.render();

    holdButtonContainerList = document.querySelectorAll('.hold.button-container');

    for (let i = 0; i < holdButtonContainerList.length; i++) {

        holdButtonContainerList[i].addEventListener('click', (event) => {
            const holdButtonContainer = event.target.parentElement;
            // console.log("Hold button container clicked was", holdButtonContainer);

            if (canSpin && canHold) {
                // Toggle
                if (reels.reelList[i].isHeld) {
                    // Take hold off
                    reels.reelList[i].isHeld = false;
                    reels.reelList[i].resetRuntime();
                    holdButtonContainer.classList.add('active');
                    holdButtonContainer.classList.remove('is-holding');
                } else {
                    // Put hold on
                    reels.reelList[i].isHeld = true;
                    reels.reelList[i].runTime = 0;
                    // holdButtonContainer.classList.remove('active');
                    holdButtonContainer.classList.add('is-holding');
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

    // Set up winlines
    winLines = Object(__WEBPACK_IMPORTED_MODULE_8__modules_winlines__["a" /* default */])();
    winLines.build();
    winLines.render();

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
                holdButtonContainerList[i].classList.remove('active');
                if (!reels.reelList[i].isHeld) {
                    reels.reelList[i].canHold = false;
                }
            }

            spinType = 'spin';
            gameStates.currentState = gameStates.spin;
            gameLoop = requestAnimationFrame(loop);
            gameStates.currentState();
        }
    });
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
        return compareItem; // Return winning object
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
            // Remove styles first to ensure synchronicity
            buttonStyles(holdButtonContainerList, 'remove', 'active');
            // alert("Removed active");
            buttonStyles(holdButtonContainerList, 'add', 'active');
            // alert("Added active");
        } else {
            canHold = false;
            buttonStyles(holdButtonContainerList, 'remove', 'active');
            buttonStyles(holdButtonContainerList, 'remove', 'is-holding');
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

    for (let i = 0; i < holdButtonContainerList.length; i++) {
        holdButtonContainerList[i].classList.add('active');
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

    for (let i = 0; i < holdButtonContainerList.length; i++) {
        holdButtonContainerList[i].classList.remove('active', 'is-holding');
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
    winType: null,
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
            this.winAmount = win.winAmount;
            this.winType = win.type;

            winLines.displayWin(this.winType);

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
        winCentreLine.classList.add('active');
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
                // winIndicatorLeft.classList.remove('active');
                // winIndicatorRight.classList.remove('active');
                winCentreLine.classList.remove('active');

                // console.log("Winlines from main.js", winLines);
                winLines.removeWins();

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
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ctx__ = __webpack_require__(7);




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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const ctx = () => {
    return document.querySelector('canvas').getContext('2d');
};

/* unused harmony default export */ var _unused_webpack_default_export = (ctx);

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nudgeButton__ = __webpack_require__(10);




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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const nudgeButton = (index) => {
    let nudgeButton;
    let nudgeButtonContainer;

    return {
        container: document.getElementById('nudgeButtonsContainer'),
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__holdButton__ = __webpack_require__(12);




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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const holdButton = (index) => {
    let holdButton;
    let holdButtonContainer;
    let holdButtonHeld;

    return {
        container: document.getElementById('holdButtonsContainer'),
        reelNo: index,
        render: function () {
            // Create hold button
            holdButton = document.createElement('button');
            holdButton.innerHTML = 'HOLD';
            holdButton.classList.add('not-held', 'hold', 'button');
            holdButton.style.width = BUTTON_WIDTH + 'px';

            // Create held hold button (to get round animation problem)
            holdButtonHeld = holdButton.cloneNode(true);
            holdButtonHeld.classList.remove('not-held');
            holdButtonHeld.classList.add('held');

            // Create container for both hold buttons
            holdButtonContainer = document.createElement('div');
            holdButtonContainer.classList.add('hold', 'button-container');
            holdButtonContainer.style.width = BUTTON_WIDTH + 'px';
            holdButtonContainer.style.marginLeft = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            holdButtonContainer.style.marginRight = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            
            // Add buttons to container
            holdButtonContainer.appendChild(holdButton);
            holdButtonContainer.appendChild(holdButtonHeld);
            
            
            this.container.appendChild(holdButtonContainer);
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (holdButton);

/***/ }),
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2Q4ZjVjYjc1NzQ2ZTFiNWQ5MGUiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy9kaWdpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy9yZWVsLmpzIiwid2VicGFjazovLy8uL2pzL21vZHVsZXMvd2lubGluZXMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy93aW5saW5lLmpzIiwid2VicGFjazovLy8uL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy92aWV3cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9tb2R1bGVzL3JlZWxJdGVtLmpzIiwid2VicGFjazovLy8uL2pzL21vZHVsZXMvY3R4LmpzIiwid2VicGFjazovLy8uL2pzL21vZHVsZXMvcmVlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy9udWRnZUJ1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy9udWRnZUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9tb2R1bGVzL2hvbGRCdXR0b25zLmpzIiwid2VicGFjazovLy8uL2pzL21vZHVsZXMvaG9sZEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9tb2R1bGVzL2NyZWRpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy93aW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvbW9kdWxlcy9udWRnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtR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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7QUNyakJZOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLGlFQUFRLEU7Ozs7Ozs7QUN2QnZCO0FBQWE7O0FBRVc7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxpRUFBUSxFOzs7Ozs7O0FDM0JWOztBQUViO0FBQ0E7QUFDQTs7QUFFZSw2RUFBRyxFOzs7Ozs7O0FDTmxCO0FBQWE7O0FBRWE7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6QywwQkFBMEIsOERBQUk7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFZSw4REFBSyxFOzs7Ozs7O0FDbkNwQjtBQUFhOztBQUUyQjs7QUFFeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6Qyw0QkFBNEIscUVBQVc7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVlLHFFQUFZLEU7Ozs7Ozs7QUN2QmQ7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsb0VBQVcsRTs7Ozs7OztBQ3JCMUI7QUFBYTs7QUFFeUI7O0FBRXRDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGNBQWM7QUFDekMsNEJBQTRCLG9FQUFVO0FBQ3RDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFZSxvRUFBVyxFOzs7Ozs7O0FDdkJiOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxtRUFBVSxFOzs7Ozs7O0FDdkN6QjtBQUFhOztBQUVpQjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdFQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLGdFQUFPLEU7Ozs7Ozs7QUN2QnRCO0FBQWE7O0FBRWlCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsZ0VBQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsNERBQUcsRTs7Ozs7OztBQ3ZCbEI7QUFBYTs7QUFFaUI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixnRUFBTTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSwrREFBTSxFOzs7Ozs7QUNyQnJCLHlDIiwiZmlsZSI6Ii4vanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgY2Q4ZjVjYjc1NzQ2ZTFiNWQ5MGUiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBkaWdpdHMgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRpZ2l0c1N0cmluZzogbnVsbCxcclxuICAgICAgICBjb250YWluZXI6IG51bGwsIC8vIENvbnRhaW5lciB0aGF0IGhvbGRzIGRpZ2l0Q29udGFpbmVyc1xyXG4gICAgICAgIGRpZ2l0Q29udGFpbmVyczogbnVsbCwgLy8gTGlzdCBvZiBkaWdpdCBjb250YWluZXJzIHRoYXQgaG9sZCBzaW5nbGUgZGlnaXQgZWFjaFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyAvLyBTcGxpdCBudW1iZXIgaW50byBzZXBlcmF0ZSBjaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzID0gdGhpcy5jb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGlnaXQtbnVtYmVyJyk7IFxyXG4gICAgICAgICAgICBsZXQgZGlnaXRJbmRleDsgLy8gV2hpY2ggZGlnaXQgY29udGFpbmVyIHRvIHB1dCBudW1iZXIgaW5cclxuXHJcbiAgICAgICAgICAgIC8vIFdpcGUgdGhlIGRpZ2l0c1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGlnaXRDb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2ldLmlubmVySFRNTCA9ICc4JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUG9wdWxhdGUgdGhlIGRpZ2l0c1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGlnaXRzU3RyaW5nLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkaWdpdEluZGV4ID0gKHRoaXMuZGlnaXRDb250YWluZXJzLmxlbmd0aCkgLSAodGhpcy5kaWdpdHNTdHJpbmcubGVuZ3RoIC0gaSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tkaWdpdEluZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2RpZ2l0SW5kZXhdLmlubmVySFRNTCA9IHRoaXMuZGlnaXRzU3RyaW5nW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRpZ2l0cztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21vZHVsZXMvZGlnaXRzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCByZWVsSXRlbSBmcm9tICcuL3JlZWxJdGVtJztcclxuXHJcbmNvbnN0IHJlZWwgPSAocmVlbE5vKSA9PiB7XHJcbiAgICBsZXQgZmlyc3RJdGVtO1xyXG4gICAgbGV0IGxhc3RJdGVtO1xyXG4gICAgbGV0IG51ZGdlQ2FsbFRpbWVzO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbm9PZkl0ZW1zOiBOT19JVEVNUyxcclxuICAgICAgICBpdGVtTGlzdDogSVRFTV9MSVNULFxyXG4gICAgICAgIHJlZWxTcGVlZDogUkVFTF9TUEVFRCxcclxuICAgICAgICBudWRnZVNwZWVkOiAxMCxcclxuICAgICAgICBydW5UaW1lOiAoUkVFTF9TUEVFRCAqIDEwKSArICgyMCAqIHJlZWxObyksIC8vIEFyYml0cmFyeSB2YWx1ZXMgZm9yIHRlc3RpbmdcclxuICAgICAgICBjYW5Ib2xkOiBmYWxzZSxcclxuICAgICAgICBpc0hlbGQ6IGZhbHNlLFxyXG4gICAgICAgIGNhbk51ZGdlOiBmYWxzZSxcclxuICAgICAgICBpc051ZGdpbmc6IGZhbHNlLFxyXG4gICAgICAgIG51ZGdlRnJhbWVzOiBJVEVNX0hFSUdIVCAvIE5VREdFX1NQRUVELFxyXG4gICAgICAgIG51ZGdlRnJhbWU6IDAsXHJcbiAgICAgICAgcmVlbEl0ZW1zOiBbXSxcclxuICAgICAgICByZWVsTm8sXHJcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1ObyA9IDA7XHJcbiAgICAgICAgICAgIGxldCB0eXBlO1xyXG4gICAgICAgICAgICBsZXQgaW5zdGFuY2VzO1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2VTcmM7XHJcbiAgICAgICAgICAgIGxldCB3aW5BbW91bnQ7XHJcbiAgICAgICAgICAgIGxldCB4O1xyXG4gICAgICAgICAgICBsZXQgeTtcclxuICAgICAgICAgICAgbGV0IG5ld1JlZWxJdGVtO1xyXG5cclxuICAgICAgICAgICAgSVRFTV9JTkZPLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gaXRlbS50eXBlO1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VzID0gaXRlbS5pbnN0YW5jZXM7XHJcbiAgICAgICAgICAgICAgICBpbWFnZVNyYyA9IGl0ZW0uaW1hZ2VTcmM7XHJcbiAgICAgICAgICAgICAgICB3aW5BbW91bnQgPSBpdGVtLndpbkFtb3VudDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgcmVxdWlyZWQgbm8gb2YgaW5zdGFuY2VzIG9mIHRoaXMgaXRlbSB0byB0aGUgcmVlbEl0ZW1zIGFycmF5XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RhbmNlczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeCA9IFZJRVdQT1JUX1ggKyAodGhpcy5yZWVsTm8gKiBSRUVMX1dJRFRIKSArICh0aGlzLnJlZWxObyAqIFJFRUxfU1BBQ0lORyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHkgPSAoVklFV1BPUlRfWSAtIElURU1fSEVJR0hUKSAtIChJVEVNX0hFSUdIVCAqIGl0ZW1ObykgLSAxMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSAnLi9pbWcvJyArIGl0ZW0uaW1hZ2VTcmM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1JlZWxJdGVtID0gcmVlbEl0ZW0odHlwZSwgaXRlbU5vLCBpbWcsIHgsIHksIHdpbkFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWVsSXRlbXMucHVzaChuZXdSZWVsSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbU5vKys7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2h1ZmZsZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0Q29vcmRzKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaHVmZmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBybmQ7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5yZWVsSXRlbXMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgcm5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gdGhpcy5yZWVsSXRlbXNbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZWxJdGVtc1tpXSA9IHRoaXMucmVlbEl0ZW1zW3JuZF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZWxJdGVtc1tybmRdID0gdGVtcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbnVkZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWVsSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5udWRnZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hpZnQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubnVkZ2VGcmFtZSsrO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubnVkZ2VGcmFtZSA+PSB0aGlzLm51ZGdlRnJhbWVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzTnVkZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5udWRnZUZyYW1lID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzZXRDb29yZHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJlZWxJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWVsSXRlbXNbaV0ueSA9IFZJRVdQT1JUX1kgKyBWSUVXUE9SVF9IRUlHSFQgLSBJVEVNX0hFSUdIVCAtIChJVEVNX0hFSUdIVCAqIGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNldFJ1bnRpbWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzSGVsZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydW5UaW1lID0gKFJFRUxfU1BFRUQgKiAxMCkgKyAoMjAgKiByZWVsTm8pOyAvLyBBcmJpdHJhcnkgdmFsdWVzIGZvciB0ZXN0aW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaGlmdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBJZiBib3R0b20gcmVlbCBpdGVtIGdldHMgYmVsb3cgYm90dG9tIG9mIHZpZXdwb3J0IHRoZW4gbW92ZSBpdCB0byBiZWdpbm5pbmcgb2YgYXJyYXlcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVlbEl0ZW1zWzBdLnkgPj0gVklFV1BPUlRfWSArIFZJRVdQT1JUX0hFSUdIVCkge1xyXG4gICAgICAgICAgICAgICAgZmlyc3RJdGVtID0gdGhpcy5yZWVsSXRlbXNbMF07XHJcbiAgICAgICAgICAgICAgICBsYXN0SXRlbSA9IHRoaXMucmVlbEl0ZW1zW3RoaXMucmVlbEl0ZW1zLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlc3QgeSBjb29yZHMgZm9yIGl0ZW0gdG8gc2hpZnQgdG8gdG9wIG9mIHJlZWxcclxuICAgICAgICAgICAgICAgIGZpcnN0SXRlbS55ID0gbGFzdEl0ZW0ueSAtIElURU1fSEVJR0hUO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNoaWZ0IGJvdHRvbSBpdGVtIHRvIHRvcFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWVsSXRlbXMucHVzaCh0aGlzLnJlZWxJdGVtcy5zaGlmdCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW92ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxJdGVtcy5mb3JFYWNoKChyZWVsSXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVlbEl0ZW0ubW92ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zaGlmdCgpO1xyXG4gICAgICAgICAgICAvLyBSZWR1Y2UgcmVlbCBydW50aW1lXHJcbiAgICAgICAgICAgIHRoaXMucnVuVGltZS0tO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVlbEl0ZW1zLmZvckVhY2goKHJlZWxJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWVsSXRlbS5yZW5kZXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlZWw7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9tb2R1bGVzL3JlZWwuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHdpbmxpbmUgZnJvbSAnLi93aW5saW5lJztcclxuXHJcbmNvbnN0IHdpbmxpbmVzID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB3aW5MaW5lc0xpc3Q6IFtdLFxyXG4gICAgICAgIGl0ZW1JbmZvU29ydGVkOiBJVEVNX0lORk8uc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYS53aW5BbW91bnQgPCBiLndpbkFtb3VudCA/IC0xIDogMTtcclxuICAgICAgICB9KSxcclxuICAgICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgbmV3V2luTGluZTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtSW5mb1NvcnRlZC5mb3JFYWNoKChpdGVtSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV3V2luTGluZSA9IHdpbmxpbmUoaXRlbUluZm8pO1xyXG4gICAgICAgICAgICAgICAgbmV3V2luTGluZS5idWlsZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aW5MaW5lc0xpc3QucHVzaChuZXdXaW5MaW5lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaXNwbGF5V2luOiBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgICAgICAgIC8vIEZpbmQgYXBwcm9wcml0ZSB3aW4gbGluZSBvdXQgb2Ygd2luTGluZXNMaXN0ICh0aGF0IGNvcnJlc3BvbmRzIHRvIHR5cGUpXHJcbiAgICAgICAgICAgIGNvbnN0IHdpbm5pbmdMaW5lID0gdGhpcy53aW5MaW5lc0xpc3QuZmluZCh3aW5MaW5lID0+IHdpbkxpbmUudHlwZSA9PT0gdHlwZSk7XHJcbiAgICAgICAgICAgIHdpbm5pbmdMaW5lLmRpc3BsYXlXaW4oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZVdpbnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLndpbkxpbmVzTGlzdC5mb3JFYWNoKHdpbkxpbmUgPT4gd2luTGluZS5yZW1vdmVXaW4oKSk7IFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luTGluZXNMaXN0LmZvckVhY2goKHdpbkxpbmUpID0+IHtcclxuICAgICAgICAgICAgICAgIHdpbkxpbmUucmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aW5saW5lcztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21vZHVsZXMvd2lubGluZXMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3Qgd2lubGluZSA9IChpdGVtSW5mbykgPT4ge1xyXG4gICAgbGV0IGltYWdlU3JjO1xyXG4gICAgbGV0IHR5cGU7XHJcbiAgICBsZXQgd2luQW1vdW50O1xyXG4gICAgbGV0IHdpbkxpbmVJdGVtO1xyXG4gICAgbGV0IHdpbkxpbmVXaW5BbW91bnQ7XHJcbiAgICBsZXQgd2luTGluZUFtb3VudENvbnRlbnQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbkxpbmVzJyksXHJcbiAgICAgICAgd2luTGluZTogbnVsbCxcclxuICAgICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBpdGVtSW5mby50eXBlO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlU3JjID0gaXRlbUluZm8uaW1hZ2VTcmM7XHJcbiAgICAgICAgICAgIHRoaXMud2luQW1vdW50ID0gaXRlbUluZm8ud2luQW1vdW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlzcGxheVdpbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luTGluZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZVdpbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luTGluZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLndpbkxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGhpcy53aW5MaW5lLmNsYXNzTGlzdC5hZGQoJ3dpbmxpbmUnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJ1aWxkIGltYWdlc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5PX1JFRUxTOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHdpbkxpbmVJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgICAgICB3aW5MaW5lSXRlbS5zcmMgPSAnLi9pbWcvJyArIHRoaXMuaW1hZ2VTcmM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndpbkxpbmUuYXBwZW5kQ2hpbGQod2luTGluZUl0ZW0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gQnVpbGQgd2luIGFtb3VudFxyXG4gICAgICAgICAgICB3aW5MaW5lV2luQW1vdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHdpbkxpbmVXaW5BbW91bnQuY2xhc3NMaXN0LmFkZCgnd2luLWFtb3VudCcpO1xyXG5cclxuICAgICAgICAgICAgd2luTGluZUFtb3VudENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIHdpbkxpbmVBbW91bnRDb250ZW50LmlubmVySFRNTCA9IHRoaXMud2luQW1vdW50O1xyXG5cclxuICAgICAgICAgICAgd2luTGluZVdpbkFtb3VudC5hcHBlbmRDaGlsZCh3aW5MaW5lQW1vdW50Q29udGVudCk7XHJcbiAgICAgICAgICAgIHRoaXMud2luTGluZS5hcHBlbmRDaGlsZCh3aW5MaW5lV2luQW1vdW50KTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLndpbkxpbmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpbmxpbmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9tb2R1bGVzL3dpbmxpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFZpZXdwb3J0IGZyb20gJy4vbW9kdWxlcy92aWV3cG9ydCc7XHJcbmltcG9ydCBSZWVsIGZyb20gJy4vbW9kdWxlcy9yZWVsJztcclxuaW1wb3J0IFJlZWxzIGZyb20gJy4vbW9kdWxlcy9yZWVscyc7XHJcbmltcG9ydCBOdWRnZUJ1dHRvbnMgZnJvbSAnLi9tb2R1bGVzL251ZGdlQnV0dG9ucyc7XHJcbmltcG9ydCBIb2xkQnV0dG9ucyBmcm9tICcuL21vZHVsZXMvaG9sZEJ1dHRvbnMnO1xyXG5pbXBvcnQgQ3JlZGl0cyBmcm9tICcuL21vZHVsZXMvY3JlZGl0cyc7XHJcbmltcG9ydCBXaW4gZnJvbSAnLi9tb2R1bGVzL3dpbic7XHJcbmltcG9ydCBOdWRnZXMgZnJvbSAnLi9tb2R1bGVzL251ZGdlcyc7XHJcbmltcG9ydCBXaW5saW5lcyBmcm9tICcuL21vZHVsZXMvd2lubGluZXMnO1xyXG4vLyBTYXNzXHJcbmltcG9ydCAnLi4vc2Nzcy9hcHAuc2Nzcyc7XHJcbmltcG9ydCB3aW5saW5lcyBmcm9tICcuL21vZHVsZXMvd2lubGluZXMnO1xyXG5pbXBvcnQgd2lubGluZSBmcm9tICcuL21vZHVsZXMvd2lubGluZSc7XHJcblxyXG5jb25zdCB2aWV3cG9ydCA9IFZpZXdwb3J0KCk7XHJcbmNvbnN0IHdpbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW4nKTtcclxuY29uc3QgbnVkZ2VzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ251ZGdlcycpO1xyXG5sZXQgcGxheVNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheVNlY3Rpb24nKTtcclxuXHJcbmxldCBjYW52YXNWaWV3cG9ydDtcclxubGV0IGNhbnZhc1ZpZXdwb3J0VztcclxubGV0IGNhbnZhc1ZpZXdwb3J0SDtcclxubGV0IHZpZXdwb3J0Q29udGFpbmVyO1xyXG5sZXQgdmlld3BvcnRDb250YWluZXJXO1xyXG5sZXQgdmlld3BvcnRDb250YWluZXJIO1xyXG5sZXQgd2luQ2VudHJlTGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5DZW50cmVMaW5lJyk7XHJcbmxldCBzcGluQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwaW5CdXR0b24nKTtcclxubGV0IHJlZWxzO1xyXG5sZXQgbnVkZ2VzO1xyXG5sZXQgbnVkZ2VCdXR0b25zO1xyXG5sZXQgaG9sZEJ1dHRvbnM7XHJcbmxldCBudWRnZUJ1dHRvbkxpc3Q7XHJcbmxldCBob2xkQnV0dG9uQ29udGFpbmVyTGlzdDtcclxubGV0IGNyZWRpdHM7XHJcbmxldCB3aW47XHJcbmxldCBnYW1lTG9vcDtcclxubGV0IG51ZGdlQ2hhbmNlID0gTlVER0VfQ0hBTkNFOyAvLyBDaGFuY2Ugb2YgZ2V0dGluZyBudWRnZXMgYWZ0ZXIgc3BpbiAoMSBpbiBudWRnZUNoYW5jZSlcclxubGV0IGhvbGRDaGFuY2UgPSBIT0xEX0NIQU5DRTsgLy8gQ2hhbmNlIG9mIGdldHRpbmcgaG9sZHMgYWZ0ZXIgc3BpbiAoMSBpbiBob2xkQ2hhbmNlKVxyXG5sZXQgY2FuU3BpbjtcclxubGV0IGNhbk51ZGdlO1xyXG5sZXQgY2FuSG9sZDtcclxubGV0IG5vdzsgLy8gQ3VycmVudCB0aW1lIHRvIGNvbXBhcmUgYWdhaW5zdFxyXG5sZXQgcmVlbHNSdW5uaW5nID0gW107IC8vIEtlZXBzIHRyYWNrIG9mIGFueSByZWVscyB3aXRoIHJ1bnRpbWUgbGVmdCBvbiB0aGVtIHRvIGVzdGJsaXNoIHdoZXRoZXIgdG8gcmVzZXQvc3RvcCBzcGluIGV0Yy5cclxubGV0IHNwaW5UeXBlID0gJ3NwaW4nOyAvLyBLZWVwcyB0cmFjayBvZiB3aGV0aGVyIGxhc3Qgc3BpbiB3YXMgcmVndWxhciBzcGluIG9yIG51ZGdlXHJcbmxldCB3aW5MaW5lcztcclxuXHJcbmNvbnN0IGluaXQgPSAoKSA9PiB7XHJcblxyXG4gICAgLy8gUmVuZGVyIHZpZXdwb3J0XHJcbiAgICB2aWV3cG9ydC5yZW5kZXIoKTtcclxuXHJcbiAgICAvLyBTZXQgdXAgcmVlbHNcclxuICAgIHJlZWxzID0gUmVlbHMoKTtcclxuICAgIHJlZWxzLmJ1aWxkKCk7XHJcbiAgICByZWVscy5yZW5kZXIoKTtcclxuXHJcbiAgICBsZXQgcmVlbENvbnRhaW5lcjtcclxuICAgIGxldCByZWVsQ29udGFpbmVyWDtcclxuICAgIGxldCByZWVsQ29udGFpbmVyWTtcclxuICAgIGxldCByZWVsQ29udGFpbmVyVztcclxuICAgIGxldCByZWVsQ29udGFpbmVySDtcclxuXHJcbiAgICB2aWV3cG9ydENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3cG9ydENvbnRhaW5lcicpO1xyXG4gICAgdmlld3BvcnRDb250YWluZXJXID0gdmlld3BvcnRDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XHJcbiAgICB2aWV3cG9ydENvbnRhaW5lckggPSB2aWV3cG9ydENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XHJcblxyXG4gICAgY2FudmFzVmlld3BvcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld3BvcnQnKTtcclxuICAgIGNhbnZhc1ZpZXdwb3J0VyA9IGNhbnZhc1ZpZXdwb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gICAgY2FudmFzVmlld3BvcnRIID0gY2FudmFzVmlld3BvcnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG5cclxuXHJcbiAgICAvLyBSZW5kZXIgUmVlbCBDb250YWluZXJzXHJcbiAgICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XHJcbiAgICAgICAgLy8gUmVuZGVyIG91dGVyIGNvbnRhaW5lciBmb3IgZWFjaCByZWVsIGluIHRoZSB2aWV3cG9ydCBjb250YWluZXJcclxuICAgICAgICByZWVsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgcmVlbENvbnRhaW5lclggPSAoKHZpZXdwb3J0Q29udGFpbmVyVyAtIGNhbnZhc1ZpZXdwb3J0VykgLyAyKSAtIFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1ggKyByZWVsLnJlZWxJdGVtc1syXS54O1xyXG4gICAgICAgIHJlZWxDb250YWluZXJXID0gUkVFTF9XSURUSCArIChSRUVMX0NPTlRBSU5FUl9QQURESU5HICogMik7XHJcbiAgICAgICAgcmVlbENvbnRhaW5lckggPSBWSUVXUE9SVF9IRUlHSFQgKyAoUkVFTF9DT05UQUlORVJfUEFERElORyAqIDIpO1xyXG4gICAgICAgIHJlZWxDb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIHJlZWxDb250YWluZXIuc3R5bGUubGVmdCA9IHJlZWxDb250YWluZXJYICsgJ3B4JztcclxuICAgICAgICByZWVsQ29udGFpbmVyLnN0eWxlLndpZHRoID0gcmVlbENvbnRhaW5lclcgKyAncHgnO1xyXG4gICAgICAgIHJlZWxDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gcmVlbENvbnRhaW5lckggKyAncHgnO1xyXG4gICAgICAgIHJlZWxDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncmVlbC1jb250YWluZXInKTtcclxuICAgICAgICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZChyZWVsQ29udGFpbmVyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFNldCB1cCBudWRnZSBidXR0b25zXHJcbiAgICBudWRnZUJ1dHRvbnMgPSBOdWRnZUJ1dHRvbnMoKTtcclxuICAgIG51ZGdlQnV0dG9ucy5idWlsZCgpO1xyXG4gICAgbnVkZ2VCdXR0b25zLnJlbmRlcigpO1xyXG5cclxuICAgIG51ZGdlQnV0dG9uTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ251ZGdlLWJ1dHRvbicpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVkZ2VCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbnVkZ2VCdXR0b25MaXN0W2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FuU3BpbiAmJiBjYW5OdWRnZSAmJiByZWVscy5yZWVsTGlzdFtpXS5jYW5OdWRnZSA9PT0gdHJ1ZSAmJiBudWRnZXMubnVkZ2VzUmVtYWluaW5nID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc3BpblR5cGUgPSAnbnVkZ2UnO1xyXG4gICAgICAgICAgICAgICAgbnVkZ2VzLm51ZGdlc1JlbWFpbmluZyAtPSAxO1xyXG4gICAgICAgICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0uaXNOdWRnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICAgICAgICAgICAgZ2FtZVN0YXRlcy5jdXJyZW50U3RhdGUgPSBnYW1lU3RhdGVzLm51ZGdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0IHVwIG51ZGdlc1xyXG4gICAgbnVkZ2VzID0gTnVkZ2VzKCk7XHJcbiAgICBudWRnZXMucmVuZGVyKCk7XHJcblxyXG4gICAgLy8gU2V0IHVwIGhvbGQgYnV0dG9uc1xyXG4gICAgaG9sZEJ1dHRvbnMgPSBIb2xkQnV0dG9ucygpO1xyXG4gICAgaG9sZEJ1dHRvbnMuYnVpbGQoKTtcclxuICAgIGhvbGRCdXR0b25zLnJlbmRlcigpO1xyXG5cclxuICAgIGhvbGRCdXR0b25Db250YWluZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbGQuYnV0dG9uLWNvbnRhaW5lcicpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG9sZEJ1dHRvbkNvbnRhaW5lckxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgaG9sZEJ1dHRvbkNvbnRhaW5lckxpc3RbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaG9sZEJ1dHRvbkNvbnRhaW5lciA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhvbGQgYnV0dG9uIGNvbnRhaW5lciBjbGlja2VkIHdhc1wiLCBob2xkQnV0dG9uQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjYW5TcGluICYmIGNhbkhvbGQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRvZ2dsZVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRha2UgaG9sZCBvZmZcclxuICAgICAgICAgICAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5yZXNldFJ1bnRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICBob2xkQnV0dG9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhvbGRCdXR0b25Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaG9sZGluZycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBQdXQgaG9sZCBvblxyXG4gICAgICAgICAgICAgICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0ucnVuVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaG9sZEJ1dHRvbkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBob2xkQnV0dG9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2lzLWhvbGRpbmcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgdXAgY3JlZGl0c1xyXG4gICAgY3JlZGl0cyA9IENyZWRpdHMoKTtcclxuICAgIGNyZWRpdHMucmVzZXQoKTtcclxuICAgIGNyZWRpdHMucmVuZGVyKCk7XHJcblxyXG4gICAgLy8gU2V0IHVwIHdpbiBcclxuICAgIHdpbiA9IFdpbigpO1xyXG4gICAgd2luLnJlc2V0KCk7XHJcbiAgICB3aW4ucmVuZGVyKCk7XHJcblxyXG4gICAgLy8gU2V0IHVwIHdpbmxpbmVzXHJcbiAgICB3aW5MaW5lcyA9IHdpbmxpbmVzKCk7XHJcbiAgICB3aW5MaW5lcy5idWlsZCgpO1xyXG4gICAgd2luTGluZXMucmVuZGVyKCk7XHJcblxyXG4gICAgY2FuU3BpbiA9IHRydWU7XHJcbiAgICBjYW5OdWRnZSA9IGZhbHNlO1xyXG4gICAgY2FuSG9sZCA9IGZhbHNlO1xyXG5cclxuICAgIGVuYWJsZVNwaW4oKTtcclxuXHJcbiAgICBzcGluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGlmIChjYW5TcGluKSB7XHJcbiAgICAgICAgICAgIGNyZWRpdHMudXNlQ3JlZGl0KCk7XHJcbiAgICAgICAgICAgIGNyZWRpdHMucmVuZGVyKCk7XHJcblxyXG4gICAgICAgICAgICBkaXNhYmxlTnVkZ2VzKCk7XHJcbiAgICAgICAgICAgIGRpc2FibGVTcGluKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGhvbGQgYnV0dG9ucyB0aGF0IGFyZW4ndCBoZWxkXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVlbHMucmVlbExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGhvbGRCdXR0b25Db250YWluZXJMaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5jYW5Ib2xkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNwaW5UeXBlID0gJ3NwaW4nO1xyXG4gICAgICAgICAgICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZSA9IGdhbWVTdGF0ZXMuc3BpbjtcclxuICAgICAgICAgICAgZ2FtZUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgICAgICAgICAgIGdhbWVTdGF0ZXMuY3VycmVudFN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IGxvb3AgPSAoY3VycmVudFRpbWUpID0+IHtcclxuICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApOyAvLyBOZWVkcyB0byBnbyBiZWZvcmUgbGluZSBiZWxvdyB0byBrZWVwIGFuaW1hdGlvbmZyYW1laWQgdXAgdG8gZGF0ZVxyXG4gICAgZ2FtZVN0YXRlcy5jdXJyZW50U3RhdGUoY3VycmVudFRpbWUpO1xyXG59O1xyXG5cclxuY29uc3QgbW92ZVJlZWxzID0gKCkgPT4ge1xyXG4gICAgcmVlbHMubW92ZSgpO1xyXG59O1xyXG5cclxuY29uc3QgcmVuZGVyID0gKCkgPT4ge1xyXG4gICAgdmlld3BvcnQuY2xlYXIoKTtcclxuICAgIHJlZWxzLnJlbmRlcigpO1xyXG5cclxuICAgIC8vIERpZ2l0c1xyXG4gICAgbnVkZ2VzLnJlbmRlcigpO1xyXG4gICAgY3JlZGl0cy5yZW5kZXIoKTtcclxuICAgIHdpbi5yZW5kZXIoKTtcclxufTtcclxuXHJcbi8vIENhbGN1bGF0ZXMgd2luIGFtb3VudCwgaWYgd2lubmluZyBsaW5lXHJcbmNvbnN0IGNoZWNrV2luID0gKCkgPT4ge1xyXG4gICAgbGV0IHNwaW5SZXN1bHQgPSBbXTsgLy8gQXJyYXkgb2YgcmVlbCByZXN1bHRzIGFmdGVyIHNwaW4gKGFsbCB0aHJlZSB2aXNpYmxlIG9iamVjdHMgb2YgZWFjaCByZWVsKVxyXG4gICAgbGV0IHNwaW5SZXN1bHRGaWx0ZXJlZCA9IFtdOyAvLyBBcnJheSBvZiByZXN1bHRzIHRoYXQgZG9uJ3QgbWF0Y2ggZmlyc3QgcmVlbFxyXG4gICAgbGV0IHJlZWxSZXN1bHQ7IC8vIEluZGl2aWR1YWwgcmVlbCByZXN1bHQsIG1hZGUgb2YgdGhyZWUgb2JqZWN0cyAodmlzaWJsZSlcclxuICAgIGxldCBjb21wYXJlSXRlbTsgLy8gTWlkZGxlIGl0ZW0gb24gcmVlbCBvbmUgdG8gY29tcGFyZVxyXG5cclxuICAgIC8vIENoZWNrIGZvciB3aW5cclxuICAgIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgcmVlbFJlc3VsdCA9IFtdOyAvLyBSZXN1bHQgb2YgaW5kaXZpZHVhbCByZWVsXHJcblxyXG4gICAgICAgIHJlZWxSZXN1bHQucHVzaChyZWVscy5yZWVsTGlzdFtpbmRleF0ucmVlbEl0ZW1zWzBdKTtcclxuICAgICAgICByZWVsUmVzdWx0LnB1c2gocmVlbHMucmVlbExpc3RbaW5kZXhdLnJlZWxJdGVtc1sxXSk7XHJcbiAgICAgICAgcmVlbFJlc3VsdC5wdXNoKHJlZWxzLnJlZWxMaXN0W2luZGV4XS5yZWVsSXRlbXNbMl0pO1xyXG5cclxuICAgICAgICBzcGluUmVzdWx0LnB1c2gocmVlbFJlc3VsdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBUYWtlIG1pZGRsZSBpdGVtIG9uIGZpcnN0IHJlZWxcclxuICAgIGNvbXBhcmVJdGVtID0gc3BpblJlc3VsdFswXVsxXTtcclxuXHJcbiAgICAvLyBGaWx0ZXIgb3V0IGFueSBpdGVtcyB0aGF0IGRvbid0IG1hdGNoXHJcbiAgICBzcGluUmVzdWx0RmlsdGVyZWQgPSBzcGluUmVzdWx0LmZpbHRlcigocmVlbCkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZWVsWzFdLnR5cGUgIT09IGNvbXBhcmVJdGVtLnR5cGU7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBJZiBzcGluUmVzdWx0RmlsdGVyZWQgaXMgZW1wdHksIGFsbCB0aGUgaXRlbXMgbWF0Y2ggKHdpbm5pbmcgbGluZSlcclxuICAgIGlmICghc3BpblJlc3VsdEZpbHRlcmVkLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBjb21wYXJlSXRlbTsgLy8gUmV0dXJuIHdpbm5pbmcgb2JqZWN0XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gUmFuZG9tbHkgYXNzaWduIG51ZGdlc1xyXG5jb25zdCBhc3NpZ25OdWRnZXMgPSAoKSA9PiB7XHJcbiAgICAvLyBSYW5kb21seSBhc3NpZ24gbnVkZ2VzXHJcbiAgICBjb25zdCBudWRnZVJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51ZGdlQ2hhbmNlICsgMSk7XHJcblxyXG4gICAgLy8gSWYgcmFuZG9tIGNoYW5jZSBpcyBtZXQgdGhlbiBhc3NpZ24gbnVkZ2VzXHJcbiAgICBpZiAobnVkZ2VSYW5kb20gPT09IG51ZGdlQ2hhbmNlKSB7XHJcbiAgICAgICAgY2FuTnVkZ2UgPSB0cnVlO1xyXG4gICAgICAgIGVuYWJsZU51ZGdlcygpO1xyXG4gICAgICAgIG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPSA1O1xyXG4gICAgICAgIG51ZGdlcy5yZW5kZXIoKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPCAxKSB7IC8vIElmIG5vIG51ZGdlcyBsZWZ0IGluIGJhbmtcclxuICAgICAgICBjYW5OdWRnZSA9IGZhbHNlO1xyXG4gICAgICAgIGRpc2FibGVOdWRnZXMoKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gUmFuZG9tbHkgYXNzaWduIGhvbGRzXHJcbmNvbnN0IGFzc2lnbkhvbGRzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgaG9sZFJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGhvbGRDaGFuY2UgKyAxKTtcclxuXHJcbiAgICAvLyBSYW5kb21seSBhc3NpZ24gaG9sZHMgKGlmIG5vIG51ZGdlcyBsZWZ0IGluIGJhbmspXHJcbiAgICAvLyBBc3NpZ24gaG9sZCBpZiByYW5kb20gbnVtYmVyIG1ldCBhbmQgbGFzdCBzcGluIHdhc24ndCBhIHdpblxyXG4gICAgaWYgKG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPCAxKSB7XHJcbiAgICAgICAgaWYgKGhvbGRSYW5kb20gPT09IGhvbGRDaGFuY2UpIHtcclxuICAgICAgICAgICAgLy8gQ2FuIGhvbGRcclxuICAgICAgICAgICAgY2FuSG9sZCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBzdHlsZXMgZmlyc3QgdG8gZW5zdXJlIHN5bmNocm9uaWNpdHlcclxuICAgICAgICAgICAgYnV0dG9uU3R5bGVzKGhvbGRCdXR0b25Db250YWluZXJMaXN0LCAncmVtb3ZlJywgJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAvLyBhbGVydChcIlJlbW92ZWQgYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBidXR0b25TdHlsZXMoaG9sZEJ1dHRvbkNvbnRhaW5lckxpc3QsICdhZGQnLCAnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIC8vIGFsZXJ0KFwiQWRkZWQgYWN0aXZlXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbkhvbGQgPSBmYWxzZTtcclxuICAgICAgICAgICAgYnV0dG9uU3R5bGVzKGhvbGRCdXR0b25Db250YWluZXJMaXN0LCAncmVtb3ZlJywgJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBidXR0b25TdHlsZXMoaG9sZEJ1dHRvbkNvbnRhaW5lckxpc3QsICdyZW1vdmUnLCAnaXMtaG9sZGluZycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gRW5hYmxlIGFsbCBudWRnZXNcclxuY29uc3QgZW5hYmxlTnVkZ2VzID0gKCkgPT4ge1xyXG4gICAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xyXG4gICAgICAgIC8vIElmIHRoZSByZWVsIGlzbid0IGhlbGRcclxuICAgICAgICBpZiAoIXJlZWwuaXNIZWxkKSB7XHJcbiAgICAgICAgICAgIHJlZWwuY2FuTnVkZ2UgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVkZ2VCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gSWYgdGhlIHJlZWwgaXNuJ3QgaGVsZFxyXG4gICAgICAgIGlmICghcmVlbHMucmVlbExpc3RbaV0uaXNIZWxkKSB7XHJcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbnVkZ2VzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG59XHJcblxyXG4vLyBFbmJhbGUgYWxsIGhvbGRzXHJcbmNvbnN0IGVuYWJsZUhvbGRzID0gKCkgPT4ge1xyXG4gICAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xyXG4gICAgICAgIHJlZWwuY2FuSG9sZCA9IHRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvbGRCdXR0b25Db250YWluZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaG9sZEJ1dHRvbkNvbnRhaW5lckxpc3RbaV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuaG9sZCA9IHRydWU7XHJcbn1cclxuXHJcbi8vIERpc2FibGUgYWxsIG51ZGdlc1xyXG5jb25zdCBkaXNhYmxlTnVkZ2VzID0gKCkgPT4ge1xyXG4gICAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xyXG4gICAgICAgIHJlZWwuY2FuTnVkZ2UgPSBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVkZ2VCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbnVkZ2VCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIG51ZGdlcy5yZXNldCgpO1xyXG5cclxuICAgIGNhbk51ZGdlID0gZmFsc2U7XHJcblxyXG4gICAgbnVkZ2VzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG59XHJcblxyXG4vLyBEaXNhYmxlIGFsbCBob2xkc1xyXG5jb25zdCBkaXNhYmxlSG9sZHMgPSAoKSA9PiB7XHJcbiAgICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XHJcbiAgICAgICAgcmVlbC5jYW5Ib2xkID0gZmFsc2U7XHJcbiAgICAgICAgcmVlbC5pc0hlbGQgPSBmYWxzZTtcclxuICAgICAgICBpZiAocmVlbC5ydW5UaW1lIDwgMSkge1xyXG4gICAgICAgICAgICByZWVsLnJlc2V0UnVudGltZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG9sZEJ1dHRvbkNvbnRhaW5lckxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBob2xkQnV0dG9uQ29udGFpbmVyTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnLCAnaXMtaG9sZGluZycpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbkhvbGQgPSBmYWxzZTtcclxufVxyXG5cclxuLy8gRW5hYmxlIHNwaW5cclxuY29uc3QgZW5hYmxlU3BpbiA9ICgpID0+IHtcclxuICAgIHNwaW5CdXR0b24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICBjYW5TcGluID0gdHJ1ZTtcclxufVxyXG5cclxuLy8gRGlzYmFsZSBzcGluXHJcbmNvbnN0IGRpc2FibGVTcGluID0gKCkgPT4ge1xyXG4gICAgc3BpbkJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIGNhblNwaW4gPSBmYWxzZTtcclxufVxyXG5cclxuLy8gQWRkIG9yIHJlbW92ZSBncm91cCBidXR0b24gc3R5bGVzXHJcbmNvbnN0IGJ1dHRvblN0eWxlcyA9IChidXR0b25MaXN0LCBhZGRSZW1vdmUsIGNsYXNzTmFtZSkgPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFkZFJlbW92ZSA9PT0gJ2FkZCcpIHtcclxuICAgICAgICAgICAgYnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhZGRSZW1vdmUgPT09ICdyZW1vdmUnKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gR2FtZSBzdGF0ZVxyXG5jb25zdCBnYW1lU3RhdGVzID0ge1xyXG4gICAgY3VycmVudFN0YXRlOiBudWxsLFxyXG4gICAgd2luQW1vdW50OiAwLFxyXG4gICAgd2luVHlwZTogbnVsbCxcclxuICAgIG9sZFdpbkRpc3BsYXk6IDAsIC8vIFdoZW4gbG9vcGluZyB0aHJvdWdoIHdpbiBpbmNyZW1lbnQgLSB0aGlzIGlzIHRoZSBvcmlnaW5hbCBmaWd1cmVcclxuICAgIGN1cnJlbnRXaW5EaXNwbGF5OiAwLCAvLyBXaGVuIGxvb3BpbmcgdGhyb3VnaCB3aW4gYW1vdW50IC0gdGhpcyBpcyB0aGUgbmV3IGZpZ3VyZVxyXG5cclxuICAgIC8vIFJlZ3VsYXIgc3BpblxyXG4gICAgc3BpbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc3BpblR5cGUgPSAnc3Bpbic7XHJcbiAgICAgICAgZGlzYWJsZVNwaW4oKTtcclxuICAgICAgICBtb3ZlUmVlbHMoKTtcclxuICAgICAgICByZW5kZXIoKTtcclxuXHJcbiAgICAgICAgLy8gRmlsdGVyIHJlZWwgcnVudGltZXMgLSBpZiBvbmUgaXMgYWJvdmUgemVybyB0aGVuIGNhcnJ5IG9uXHJcbiAgICAgICAgcmVlbHNSdW5uaW5nID0gcmVlbHMucmVlbExpc3QuZmlsdGVyKChyZWVsKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWVsLnJ1blRpbWUgPiAwO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXJlZWxzUnVubmluZy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLnNwaW5GaW5pc2hlZDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gU3BpbiBmaW5pc2hlZFxyXG4gICAgc3BpbkZpbmlzaGVkOiBmdW5jdGlvbiAoY3VycmVudFRpbWUpIHtcclxuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XHJcblxyXG4gICAgICAgIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkge1xyXG4gICAgICAgICAgICBkaXNhYmxlTnVkZ2VzKCk7XHJcbiAgICAgICAgICAgIGlmIChzcGluVHlwZSAhPT0gJ251ZGdlJykge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZUhvbGRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciB3aW5cclxuICAgICAgICBjb25zdCB3aW4gPSBjaGVja1dpbigpO1xyXG5cclxuICAgICAgICAvLyBXaW5cclxuICAgICAgICBpZiAod2luKSB7XHJcbiAgICAgICAgICAgIC8vIFJlc2V0IG51ZGdlc1xyXG4gICAgICAgICAgICBudWRnZXMucmVzZXQoKTtcclxuICAgICAgICAgICAgY2FuTnVkZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgZGlzYWJsZU51ZGdlcygpO1xyXG4gICAgICAgICAgICBkaXNhYmxlSG9sZHMoKTtcclxuICAgICAgICAgICAgZGlzYWJsZVNwaW4oKTtcclxuXHJcbiAgICAgICAgICAgIG5vdyA9IGN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLndpbkFtb3VudCA9IHdpbi53aW5BbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMud2luVHlwZSA9IHdpbi50eXBlO1xyXG5cclxuICAgICAgICAgICAgd2luTGluZXMuZGlzcGxheVdpbih0aGlzLndpblR5cGUpO1xyXG5cclxuICAgICAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy53aW47IC8vIFN3aXRjaCB0byB3aW4gYW5pbWF0aW9uIHN0YXRlXHJcbiAgICAgICAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBObyB3aW5cclxuICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSAmJiBzcGluVHlwZSAhPT0gJ251ZGdlJyAmJiBjcmVkaXRzLmNyZWRpdHNSZW1haW5pbmcgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBubyB3aW5uaW5nIGxpbmUgdGhlbiBhc3NpZ24gaG9sZHMgYW5kIG51ZGdlc1xyXG4gICAgICAgICAgICAgICAgYXNzaWduSG9sZHMoKTtcclxuICAgICAgICAgICAgICAgIGFzc2lnbk51ZGdlcygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBFbmFibGUgc3BpblxyXG4gICAgICAgICAgICBlbmFibGVTcGluKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgY3JlZGl0c1xyXG4gICAgICAgICAgICBpZiAoY3JlZGl0cy5jcmVkaXRzUmVtYWluaW5nID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2FtZU92ZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICAvLyBOdWRnZVxyXG4gICAgbnVkZ2U6IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xyXG4gICAgICAgIGxldCBpc051ZGdpbmcgPSBbXTtcclxuICAgICAgICAvLyBJZiBudWRnaW5nIHN0b3BwZWQsIHRoZW4gY2hhbmdlIGdhbWVzdGF0ZSB0byBzcGluZmluaXNoZWRcclxuICAgICAgICBpc051ZGdpbmcgPSByZWVscy5yZWVsTGlzdC5maWx0ZXIoKHJlZWwpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlZWwuaXNOdWRnaW5nID09PSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIWlzTnVkZ2luZy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5GaW5pc2hlZChjdXJyZW50VGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpc051ZGdpbmcuZm9yRWFjaCgocmVlbCkgPT4ge1xyXG4gICAgICAgICAgICByZWVsLm51ZGdlKCk7XHJcbiAgICAgICAgICAgIHJlbmRlcigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcbiAgICAvLyBXaW4gYW5pbWF0aW9uXHJcbiAgICB3aW46IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xyXG4gICAgICAgIHdpbkNlbnRyZUxpbmUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgd2luQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICBkaXNhYmxlU3BpbigpO1xyXG4gICAgICAgIGRpc2FibGVIb2xkcygpO1xyXG5cclxuICAgICAgICBpZiAoY3VycmVudFRpbWUgLSBub3cgPiA1MCkge1xyXG4gICAgICAgICAgICBub3cgPSBjdXJyZW50VGltZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50V2luRGlzcGxheSArPSAxO1xyXG4gICAgICAgICAgICB3aW4uY3VycmVudFdpbiA9IHRoaXMuY3VycmVudFdpbkRpc3BsYXk7XHJcbiAgICAgICAgICAgIHdpbi5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRXaW5EaXNwbGF5IC0gdGhpcy5vbGRXaW5EaXNwbGF5ID09PSB0aGlzLndpbkFtb3VudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRmluaXNoZWQgbG9vcGluZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbGRXaW5EaXNwbGF5ID0gdGhpcy5jdXJyZW50V2luRGlzcGxheTtcclxuICAgICAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcclxuICAgICAgICAgICAgICAgIGVuYWJsZVNwaW4oKTtcclxuICAgICAgICAgICAgICAgIHdpbkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHZpZXdwb3J0Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgLy8gd2luSW5kaWNhdG9yTGVmdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIC8vIHdpbkluZGljYXRvclJpZ2h0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgd2luQ2VudHJlTGluZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldpbmxpbmVzIGZyb20gbWFpbi5qc1wiLCB3aW5MaW5lcyk7XHJcbiAgICAgICAgICAgICAgICB3aW5MaW5lcy5yZW1vdmVXaW5zKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgY3JlZGl0c1xyXG4gICAgICAgICAgICAgICAgaWYgKGNyZWRpdHMuY3JlZGl0c1JlbWFpbmluZyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nYW1lT3ZlcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIEdhbWUgb3ZlciAtIGNyZWRpdHMgcmFuIG91dFxyXG4gICAgZ2FtZU92ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XHJcbiAgICAgICAgZGlzYWJsZVNwaW4oKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocGxheVNlY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgZGlzYWJsZU51ZGdlcygpO1xyXG4gICAgICAgICAgICBkaXNhYmxlSG9sZHMoKTtcclxuXHJcbiAgICAgICAgICAgIHJlbmRlckdhbWVPdmVyU2VjdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy53aW5BbW91bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm9sZFdpbkRpc3BsYXkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW5EaXNwbGF5ID0gMDtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IHJlbmRlckdhbWVPdmVyU2VjdGlvbiA9ICgpID0+IHtcclxuICAgIGNvbnN0IGdhbWVPdmVyU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZ2FtZU92ZXJTZWN0aW9uLmlkID0gJ2dhbWVPdmVyU2VjdGlvbic7XHJcblxyXG4gICAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCA9ICc8ZGl2Pic7XHJcbiAgICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MICs9ICc8cD5HYW1lIG92ZXI8L3A+JztcclxuICAgIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gJzxwPllvdSB3b24gJyArIHdpbi5jdXJyZW50V2luICsgJyBjcmVkaXRzJztcclxuICAgIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gJzxwPlByZXNzIHN0YXJ0IHRvIHBsYXkgYWdhaW48L3A+J1xyXG4gICAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCArPSAnPC9kaXY+JztcclxuXHJcbiAgICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgc3RhcnRCdXR0b24uaWQgPSAnc3RhcnRCdXR0b24nO1xyXG4gICAgc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJyk7XHJcbiAgICBzdGFydEJ1dHRvbi5pbm5lclRleHQgPSAnU1RBUlQnO1xyXG5cclxuICAgIGdhbWVPdmVyU2VjdGlvbi5hcHBlbmRDaGlsZChzdGFydEJ1dHRvbik7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChnYW1lT3ZlclNlY3Rpb24pO1xyXG5cclxuICAgIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZ2FtZU92ZXJTZWN0aW9uKTtcclxuXHJcbiAgICAgICAgcGxheVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBwbGF5U2VjdGlvbi5pZCA9ICdwbGF5U2VjdGlvbic7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwbGF5U2VjdGlvbik7XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBQcmVsb2FkIGltYWdlcyB0aGVuIHN0YXJ0IGdhbWVcclxudmFyIGxvYWRlZCA9IDA7XHJcbnZhciBpbWFnZUxpc3QgPSBbXTtcclxubGV0IGltZztcclxuXHJcbklURU1fSU5GTy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltZy5zcmMgPSAnLi9pbWcvJyArIGl0ZW0uaW1hZ2VTcmM7XHJcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIGxvYWRlZCsrO1xyXG4gICAgICAgIGlmIChsb2FkZWQgPT09IElURU1fSU5GTy5sZW5ndGgpIGluaXQoKTtcclxuICAgIH07XHJcbn0pO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3Qgdmlld3BvcnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBuZXdWaWV3cG9ydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgbmV3Vmlld3BvcnQud2lkdGggPSBWSUVXUE9SVF9XSURUSDtcclxuICAgIG5ld1ZpZXdwb3J0LmhlaWdodCA9IFZJRVdQT1JUX0hFSUdIVDtcclxuICAgIG5ld1ZpZXdwb3J0LmlkID0gXCJ2aWV3cG9ydFwiO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdmlld3BvcnQ6IG5ld1ZpZXdwb3J0LFxyXG4gICAgICAgIHdpZHRoOiBWSUVXUE9SVF9XSURUSCxcclxuICAgICAgICBoZWlnaHQ6IFZJRVdQT1JUX0hFSUdIVCxcclxuICAgICAgICBjdHg6IG5ld1ZpZXdwb3J0LmdldENvbnRleHQoJzJkJyksXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpZXdwb3J0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdwb3J0Q29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMudmlld3BvcnQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB2aWV3cG9ydDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21vZHVsZXMvdmlld3BvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IGN0eCBmcm9tICcuL2N0eCc7XHJcblxyXG5jb25zdCByZWVsSXRlbSA9ICh0eXBlLCBpdGVtTm8sIGltZywgeCwgeSwgd2luQW1vdW50KSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGUsXHJcbiAgICAgICAgaXRlbU5vLFxyXG4gICAgICAgIGltZyxcclxuICAgICAgICB4LFxyXG4gICAgICAgIHksXHJcbiAgICAgICAgd2luQW1vdW50LFxyXG4gICAgICAgIHNwZWVkOiBSRUVMX1NQRUVELFxyXG4gICAgICAgIG51ZGdlU3BlZWQ6IE5VREdFX1NQRUVELFxyXG4gICAgICAgIGN0eDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdwb3J0JykuZ2V0Q29udGV4dCgnMmQnKSxcclxuICAgICAgICBtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBudWRnZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLm51ZGdlU3BlZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1nLCAwLCAwLCBJVEVNX1dJRFRILCBJVEVNX0hFSUdIVCwgdGhpcy54LCB0aGlzLnksIElURU1fV0lEVEgsIElURU1fSEVJR0hUKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVlbEl0ZW07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9tb2R1bGVzL3JlZWxJdGVtLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IGN0eCA9ICgpID0+IHtcclxuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3R4O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbW9kdWxlcy9jdHguanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHJlZWwgZnJvbSAnLi9yZWVsJztcclxuXHJcbmNvbnN0IHJlZWxzID0gKCkgPT4ge1xyXG4gICAgbGV0IG5ld1JlZWw7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlZWxMaXN0OiBbXSxcclxuICAgICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5PX1JFRUxTOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG5ld1JlZWwgPSByZWVsKGkpO1xyXG4gICAgICAgICAgICAgICAgbmV3UmVlbC5idWlsZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWVsTGlzdC5wdXNoKG5ld1JlZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlZWwucnVuVGltZSA+IDAgJiYgIXJlZWwuaXNIZWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVlbC5tb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzZXRSdW50aW1lczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlZWwucmVzZXRSdW50aW1lKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVlbC5yZW5kZXIoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVlbHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9tb2R1bGVzL3JlZWxzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBudWRnZUJ1dHRvbiBmcm9tICcuL251ZGdlQnV0dG9uJztcclxuXHJcbmNvbnN0IG51ZGdlQnV0dG9ucyA9ICgpID0+IHtcclxuICAgIGxldCBuZXdCdXR0b247XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBidXR0b25MaXN0OiBbXSxcclxuICAgICAgICBidWlsZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTk9fUkVFTFM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbmV3QnV0dG9uID0gbnVkZ2VCdXR0b24oaSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3QucHVzaChuZXdCdXR0b24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3QuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYnRuLnJlbmRlcihpbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBudWRnZUJ1dHRvbnM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9tb2R1bGVzL251ZGdlQnV0dG9ucy5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBudWRnZUJ1dHRvbiA9IChpbmRleCkgPT4ge1xyXG4gICAgbGV0IG51ZGdlQnV0dG9uO1xyXG4gICAgbGV0IG51ZGdlQnV0dG9uQ29udGFpbmVyO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbnVkZ2VCdXR0b25zQ29udGFpbmVyJyksXHJcbiAgICAgICAgcmVlbE5vOiBpbmRleCxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbnVkZ2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgbnVkZ2VCdXR0b24uaW5uZXJIVE1MID0gJ05VREdFJztcclxuICAgICAgICAgICAgbnVkZ2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnbnVkZ2UtYnV0dG9uJywgJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5zdHlsZS53aWR0aCA9IEJVVFRPTl9XSURUSCArICdweCc7XHJcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLnN0eWxlLm1hcmdpbkxlZnQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xyXG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5zdHlsZS5tYXJnaW5SaWdodCA9IChSRUVMX1NQQUNJTkcgLyAyKSArICgoUkVFTF9XSURUSCAtIEJVVFRPTl9XSURUSCkgLyAyKSArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKG51ZGdlQnV0dG9uKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbnVkZ2VCdXR0b247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9tb2R1bGVzL251ZGdlQnV0dG9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgaG9sZEJ1dHRvbiBmcm9tICcuL2hvbGRCdXR0b24nO1xyXG5cclxuY29uc3QgaG9sZEJ1dHRvbnMgPSAoKSA9PiB7XHJcbiAgICBsZXQgbmV3QnV0dG9uO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYnV0dG9uTGlzdDogW10sXHJcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOT19SRUVMUzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24gPSBob2xkQnV0dG9uKGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LnB1c2gobmV3QnV0dG9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uTGlzdC5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4ucmVuZGVyKGluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhvbGRCdXR0b25zO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbW9kdWxlcy9ob2xkQnV0dG9ucy5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgaG9sZEJ1dHRvbiA9IChpbmRleCkgPT4ge1xyXG4gICAgbGV0IGhvbGRCdXR0b247XHJcbiAgICBsZXQgaG9sZEJ1dHRvbkNvbnRhaW5lcjtcclxuICAgIGxldCBob2xkQnV0dG9uSGVsZDtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvbGRCdXR0b25zQ29udGFpbmVyJyksXHJcbiAgICAgICAgcmVlbE5vOiBpbmRleCxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGhvbGQgYnV0dG9uXHJcbiAgICAgICAgICAgIGhvbGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgaG9sZEJ1dHRvbi5pbm5lckhUTUwgPSAnSE9MRCc7XHJcbiAgICAgICAgICAgIGhvbGRCdXR0b24uY2xhc3NMaXN0LmFkZCgnbm90LWhlbGQnLCAnaG9sZCcsICdidXR0b24nKTtcclxuICAgICAgICAgICAgaG9sZEJ1dHRvbi5zdHlsZS53aWR0aCA9IEJVVFRPTl9XSURUSCArICdweCc7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgaGVsZCBob2xkIGJ1dHRvbiAodG8gZ2V0IHJvdW5kIGFuaW1hdGlvbiBwcm9ibGVtKVxyXG4gICAgICAgICAgICBob2xkQnV0dG9uSGVsZCA9IGhvbGRCdXR0b24uY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICBob2xkQnV0dG9uSGVsZC5jbGFzc0xpc3QucmVtb3ZlKCdub3QtaGVsZCcpO1xyXG4gICAgICAgICAgICBob2xkQnV0dG9uSGVsZC5jbGFzc0xpc3QuYWRkKCdoZWxkJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgY29udGFpbmVyIGZvciBib3RoIGhvbGQgYnV0dG9uc1xyXG4gICAgICAgICAgICBob2xkQnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGhvbGRCdXR0b25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnaG9sZCcsICdidXR0b24tY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIGhvbGRCdXR0b25Db250YWluZXIuc3R5bGUud2lkdGggPSBCVVRUT05fV0lEVEggKyAncHgnO1xyXG4gICAgICAgICAgICBob2xkQnV0dG9uQ29udGFpbmVyLnN0eWxlLm1hcmdpbkxlZnQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xyXG4gICAgICAgICAgICBob2xkQnV0dG9uQ29udGFpbmVyLnN0eWxlLm1hcmdpblJpZ2h0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEFkZCBidXR0b25zIHRvIGNvbnRhaW5lclxyXG4gICAgICAgICAgICBob2xkQnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGhvbGRCdXR0b24pO1xyXG4gICAgICAgICAgICBob2xkQnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGhvbGRCdXR0b25IZWxkKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChob2xkQnV0dG9uQ29udGFpbmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaG9sZEJ1dHRvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21vZHVsZXMvaG9sZEJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IGRpZ2l0cyBmcm9tICcuL2RpZ2l0cyc7XHJcblxyXG5jb25zdCBjcmVkaXRzID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVkaXRzUmVtYWluaW5nOiBDUkVESVRTLFxyXG4gICAgICAgIGRpZ2l0czogZGlnaXRzKCksXHJcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlZGl0cycpLFxyXG4gICAgICAgIHVzZUNyZWRpdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWRpdHNSZW1haW5pbmctLTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlZGl0c1JlbWFpbmluZyA9IENSRURJVFM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5kaWdpdHMuZGlnaXRzU3RyaW5nID0gdGhpcy5jcmVkaXRzUmVtYWluaW5nLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xyXG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlZGl0cztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21vZHVsZXMvY3JlZGl0cy5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IGRpZ2l0cyBmcm9tICcuL2RpZ2l0cyc7XHJcblxyXG5jb25zdCB3aW4gPSAoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGN1cnJlbnRXaW46IDAsXHJcbiAgICAgICAgZGlnaXRzOiBkaWdpdHMoKSxcclxuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW4nKSxcclxuICAgICAgICBhZGRXaW46IGZ1bmN0aW9uKHdpbkFtb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW4gKz0gd2luQW1vdW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW4gPSAwO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5kaWdpdHMuZGlnaXRzU3RyaW5nID0gdGhpcy5jdXJyZW50V2luLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xyXG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2luO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbW9kdWxlcy93aW4uanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBkaWdpdHMgZnJvbSAnLi9kaWdpdHMnO1xyXG5cclxuY29uc3QgbnVkZ2VzID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBudWRnZXNSZW1haW5pbmc6IDAsXHJcbiAgICAgICAgZGlnaXRzOiBkaWdpdHMoKSxcclxuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudWRnZXMnKSxcclxuICAgICAgICByZXNldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMubnVkZ2VzUmVtYWluaW5nID0gMDtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmRpZ2l0c1N0cmluZyA9IHRoaXMubnVkZ2VzUmVtYWluaW5nLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xyXG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbnVkZ2VzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbW9kdWxlcy9udWRnZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zY3NzL2FwcC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9