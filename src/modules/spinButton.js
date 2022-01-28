'use strict';

const spinButton = () => {
    let spinButtonContainer
    let spinButton;
    let spinButtonActive;

    return {
        container: document.getElementById('spinButtonContainer'),
        render: function () {
            // Create nudge button
            spinButton = document.createElement('button');
            spinButton.innerHTML = 'SPIN';
            spinButton.classList.add('button');
            spinButton.style.width = BUTTON_WIDTH + 'px';

            // Create active nudge button (to get round animation synchronicity issue)
            spinButtonActive = spinButton.cloneNode(true);
            spinButtonActive.classList.add('active');

            // Create container for both nudge buttons
            spinButtonContainer = document.createElement('div');
            spinButtonContainer.classList.add('spin', 'button-container');
            spinButtonContainer.style.width = BUTTON_WIDTH + 'px';
            spinButtonContainer.style.marginLeft = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            spinButtonContainer.style.marginRight = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            
            // Add buttons to container
            spinButtonContainer.appendChild(spinButton);
            spinButtonContainer.appendChild(spinButtonActive);
            
            this.container.appendChild(spinButtonContainer);
        }
    };
};

export default spinButton;