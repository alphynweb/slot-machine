'use strict';

import digits from './digits';

const win = () => {
    return {
        currentWin: 0,
        digits: digits(),
        container: document.getElementById('win'),
        addWin: function(winAmount) {
            this.currentWin += winAmount;
        },
        reset: function() {
            this.currentWin = 0;
        },
        render: function() {
            this.digits.digitsString = this.currentWin.toString();
            this.digits.container = this.container;
            this.digits.render();
        }
    };
};

export default win;