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
        move: function (isMuted) {
            this.reelList.forEach((reel) => {
                if (reel.runTime > 0 && !reel.isHeld) {
                    reel.move();
                } else if (!reel.isStopped) {
                    if (reel.isHeld) {
                        reel.stop(true);
                    } else {
                        reel.stop(isMuted);
                    }
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