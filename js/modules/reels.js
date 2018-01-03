'use strict';

import reel from './reel';

const reels = () => {
    let newReel;
    return {
        reelList: [],
        build: function () {
            for (let i = 0; i < NO_REELS; i++) {
                newReel = reel(i);
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

export default reels;