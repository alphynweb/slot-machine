'use strict';

import nudgeButton from './nudgeButton';

const nudgeButtons = () => {
    let newButton;

    return {
        buttonList: [],
        build: function() {
            for (let i = 0; i < NO_REELS; i++) {
                newButton = nudgeButton(i);
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

export default nudgeButtons;