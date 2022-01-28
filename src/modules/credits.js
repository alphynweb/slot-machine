'use strict';

import digits from './digits';

const credits = () => {
    return {
        creditsRemaining: CREDITS,
        digits: digits(),
        container: document.getElementById('credits'),
        useCredit: function () {
            this.creditsRemaining--;
        },
        reset: function () {
            this.creditsRemaining = CREDITS;
        },
        render: function () {
            this.digits.digitsString = this.creditsRemaining.toString();
            this.digits.container = this.container;
            this.digits.render();
        }
    };
};

export default credits;