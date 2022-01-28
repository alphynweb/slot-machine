'use strict';

const nudgeButton = (index) => {
    let nudgeButtonContainer;
    let nudgeButton;
    let nudgeButtonActive;

    return {
        container: document.getElementById('nudgeButtonsContainer'),
        reelNo: index,
        render: function () {
            // Create nudge button
            nudgeButton = document.createElement('button');
            nudgeButton.innerHTML = 'NUDGE';
            nudgeButton.classList.add('nudge-button', 'button');
            nudgeButton.style.width = BUTTON_WIDTH + 'px';

            // Create active nudge button (to get round animation synchronicity issue)
            nudgeButtonActive = nudgeButton.cloneNode(true);
            nudgeButtonActive.classList.add('active');

            // Create container for both nudge buttons
            nudgeButtonContainer = document.createElement('div');
            nudgeButtonContainer.classList.add('nudge', 'button-container');
            nudgeButtonContainer.style.width = BUTTON_WIDTH + 'px';
            nudgeButtonContainer.style.marginLeft = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            nudgeButtonContainer.style.marginRight = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            
            // Add buttons to container
            nudgeButtonContainer.appendChild(nudgeButton);
            nudgeButtonContainer.appendChild(nudgeButtonActive);
            
            this.container.appendChild(nudgeButtonContainer);
        }
    };
};

export default nudgeButton;