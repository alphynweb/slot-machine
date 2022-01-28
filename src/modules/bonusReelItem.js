'use strict';

const bonusReelItem = (type, itemNo, img, x, y, bonus) => {
    return {
        type,
        itemNo,
        img,
        x,
        y,
        bonus,
        speed: REEL_SPEED,
        nudgeSpeed: NUDGE_SPEED,
        ctx: document.getElementById('bonusReel').getContext('2d'),
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

export default bonusReelItem;