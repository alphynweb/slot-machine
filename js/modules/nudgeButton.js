'use strict';

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

export default nudgeButton;