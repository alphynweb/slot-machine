'use strict';

import winline from './winline';

const winlines = () => {
    return {
        winLinesList: [],
        itemInfoSorted: ITEM_INFO
        .filter(item => item.type !== 'Bonus')
        .sort((a, b) => {
            return a.winAmount < b.winAmount ? -1 : 1;
        }),
        build: function () {
            let newWinLine;
            this.itemInfoSorted.forEach((itemInfo) => {
                newWinLine = winline(itemInfo);
                newWinLine.build();
                this.winLinesList.push(newWinLine);
            });
        },
        displayWin: function(type) {
            // Find approprite win line out of winLinesList (that corresponds to type)
            const winningLine = this.winLinesList.find(winLine => winLine.type === type);
            winningLine.displayWin();
        },
        removeWins: function() {
            this.winLinesList.forEach(winLine => winLine.removeWin()); 
        },
        render: function () {
            this.winLinesList.forEach((winLine) => {
                winLine.render();
            });
        }
    };
};

export default winlines;