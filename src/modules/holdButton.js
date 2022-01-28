'use strict';

const holdButton = (index) => {
    let holdButtonContainer;
    let holdButton;
    let holdButtonActive;
    let holdButtonLit;

    return {
        container: document.getElementById('holdButtonsContainer'),
        reelNo: index,
        render: function () {
            // Create hold button
            holdButton = document.createElement('button');
            holdButton.innerHTML = 'HOLD';
            holdButton.classList.add('button');
            holdButton.style.width = BUTTON_WIDTH + 'px';

            // Create active hold button (to get round animation synchronicity issue)
            holdButtonActive = holdButton.cloneNode(true);
            holdButtonActive.classList.add('active');

            // Create lit hold button (to get round animation synchronicity issue)
            holdButtonLit = holdButton.cloneNode(true);
            holdButtonLit.classList.add('lit');

            // Create container for both hold buttons
            holdButtonContainer = document.createElement('div');
            holdButtonContainer.classList.add('hold', 'button-container');
            holdButtonContainer.style.width = BUTTON_WIDTH + 'px';
            holdButtonContainer.style.marginLeft = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            holdButtonContainer.style.marginRight = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            
            // Add buttons to container
            holdButtonContainer.appendChild(holdButton);
            holdButtonContainer.appendChild(holdButtonActive);
            holdButtonContainer.appendChild(holdButtonLit);
            
            
            this.container.appendChild(holdButtonContainer);
        }
    };
};

export default holdButton;