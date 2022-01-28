'use strict';

const gambleSection = () => {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = REEL_WIDTH;
    newCanvas.height = VIEWPORT_HEIGHT;
    newCanvas.id = "bonusReel";

    return {
        gambleSection: newCanvas,
        width: VIEWPORT_WIDTH,
        height: VIEWPORT_HEIGHT,
        ctx: newCanvas.getContext('2d'),
        render: function () {
            const viewportContainer = document.getElementById('bonusReelContainer');
            viewportContainer.appendChild(this.gambleSection);
        },
        clear: function () {
            this.ctx.clearRect(0, 0, this.width, this.height)
        }
    };
};

export default gambleSection;