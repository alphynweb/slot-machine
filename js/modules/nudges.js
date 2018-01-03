'use strict';

import digits from './digits';

const nudges = () => {
    return {
        nudgesRemaining: 0,
        digits: digits(),
        container: document.getElementById('nudges'),
        reset: function() {
            this.nudgesRemaining = 0;
            this.render();
        },
        render: function() {
            this.digits.digitsString = this.nudgesRemaining.toString();
            this.digits.container = this.container;
            this.digits.render();
        }
    };
};

export default nudges;