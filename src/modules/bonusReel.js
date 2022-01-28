import bonusReelItem from './bonusReelItem';
import Sounds from './Sounds';
import ReelStoppedSoundMp3 from '../assets/sounds/reel-stopped.mp3';
import ReelStoppedSoundOgg from '../assets/sounds/reel-stopped.ogg';

const bonusReel = () => {
    let firstItem;
    let lastItem;
    // Sounds 
    const reelStoppedSound = Sounds(ReelStoppedSoundMp3, ReelStoppedSoundOgg);

    return {
        isStopped: false,
        noOfItems: BONUS_REEL_NO_ITEMS,
        itemList: ITEM_LIST,
        reelSpeed: REEL_SPEED,
        runTime: REEL_SPEED * 10, // Arbitrary values for testing
        reelItems: [],
        bonusReelContainerX: 0,
        bonusReelContinerY: 0,
        build: function () {
            let itemNo = 0;
            let type;
            let instances;
            let imageSrc;
            let bonus; // e.g. no of nudges awarded etc.
            let x;
            let y;
            let newReelItem;

            BONUS_REEL_ITEM_INFO.forEach(item => {
                type = item.type;
                instances = item.instances;
                imageSrc = item.imageSrc;
                // bonus = item.bonus;
                switch (item.type) {
                    case "nudge":
                        bonus = item.nudges;
                        break;
                }

                // Add required no of instances of this item to the reelItems array
                for (let i = 0; i < instances; i++) {
                    x = 0;

                    y = (this.bonusReelContainerY - ITEM_HEIGHT) - (ITEM_HEIGHT * itemNo) - 100;

                    const img = new Image();
                    img.src = './img/' + item.imageSrc;

                    newReelItem = bonusReelItem(type, itemNo, img, x, y, bonus);
                    this.reelItems.push(newReelItem);
                    itemNo++;
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
        resetCoords: function () {
            for (let i = 0; i < this.reelItems.length; i++) {
                this.reelItems[i].y = this.bonusReelContinerY + VIEWPORT_HEIGHT - ITEM_HEIGHT - (ITEM_HEIGHT * i);
            }
        },
        resetRunTime: function () {
            this.runTime = REEL_SPEED * 10; // Arbitrary values for testing;
            this.isStopped = false;
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
        move: function (isMuted) {
            this.reelItems.forEach((reelItem) => {
                reelItem.move();
            });
            this.shift();
            // Reduce reel runtime
            this.runTime--;
            if (this.runTime <= 0) {
                this.stop(isMuted);
            }
        },
        stop: function(isMuted) {
            // console.log("Stopping bonus ree. Is muted = ", isMuted);
            this.isStopped = true;
            reelStoppedSound.play(isMuted);
        },
        render: function () {
            this.reelItems.forEach((reelItem) => {
                reelItem.render();
            });
        }
    };
};

export default bonusReel 